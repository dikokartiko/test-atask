import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render as renderWithProviders } from "../test-utils/test-providers";
import App from "../App";
import { searchGitHubUsers } from "@/services/git/requests";

// Create default mock context values
const defaultMockContext = {
  searchUserData: null,
  setSearchUserData: jest.fn(),
  userLoading: false,
  setUserLoading: jest.fn(),
  searchError: null,
  setSearchError: jest.fn(),
  initialUsername: "",
  setInitialUsername: jest.fn(),
  getInitialUsername: jest.fn().mockReturnValue(""),
  isRepoSelected: false,
  setIsRepoSelected: jest.fn(),
};

// Mock React's use function and lazy loading
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    use: jest.fn().mockImplementation(() => defaultMockContext),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    lazy: (_importFn: () => Promise<any>) => {
      const Component = (props: Record<string, unknown>) => {
        const GithubAccordion = () => (
          <div data-testid="git-accordion">Mock GitAccordion</div>
        );
        return <GithubAccordion {...props} />;
      };
      return Component;
    },
  };
});

// Mock the GitContext
jest.mock("@/contexts", () => ({
  GitContext: {},
}));

// Mock the searchGitHubUsers function
jest.mock("@/services/git/requests", () => ({
  searchGitHubUsers: jest.fn(),
}));

// Mock lazy-loaded components
jest.mock("@/components/ui/git-accordion", () => ({
  GitAccordion: () => <div data-testid="git-accordion">Mock GitAccordion</div>,
}));

// Mock the LoadingFallback component
jest.mock("@/components", () => ({
  LoadingFallback: () => <div data-testid="loading-fallback">Loading...</div>,
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock the useUrlParam hook
jest.mock("@/hooks", () => ({
  useUrlParam: () => ({
    setParam: jest.fn(),
    getParam: jest.fn(),
  }),
}));

describe("App Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset the use mock to default values
    (React.use as jest.Mock).mockImplementation(() => defaultMockContext);
  });

  it("renders the form correctly", () => {
    renderWithProviders(<App />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows validation error when submitting empty username", async () => {
    renderWithProviders(<App />);

    // Submit the form without a username
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Check if validation error message appears
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    });
  });

  it("calls searchUsers when form is submitted with a valid username", async () => {
    // Mock the successful search result
    const mockSearchResult = { items: [{ id: 1, login: "testuser" }] };
    (searchGitHubUsers as jest.Mock).mockResolvedValue(mockSearchResult);

    // Create a mock context with updated values
    const mockContext = {
      ...defaultMockContext,
      searchUserData: mockSearchResult,
      initialUsername: "testuser",
    };

    // Update the use mock to return our context
    (React.use as jest.Mock).mockImplementation(() => mockContext);

    renderWithProviders(<App />);

    // Fill in the username
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Verify searchGitHubUsers was called with the correct username
    await waitFor(() => {
      expect(searchGitHubUsers).toHaveBeenCalledWith("testuser");
    });
  });

  it("shows loading state while fetching data", async () => {
    // Mock a context with loading state
    const mockContext = {
      ...defaultMockContext,
      userLoading: true,
    };

    // Update the use mock to return our context
    (React.use as jest.Mock).mockImplementation(() => mockContext);

    renderWithProviders(<App />);

    // Check if loading state is shown
    expect(screen.getByTestId("loading-fallback")).toBeInTheDocument();
  });

  it("shows error message when search fails", async () => {
    // Mock a context with error state
    const mockContext = {
      ...defaultMockContext,
      searchError: new Error("Failed to fetch users"),
      initialUsername: "testuser",
      getInitialUsername: jest.fn().mockReturnValue("testuser"),
    };

    // Update the use mock to return our context
    (React.use as jest.Mock).mockImplementation(() => mockContext);

    renderWithProviders(<App />);

    // Check if error message is shown
    expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
  });

  it("shows search results when data is available", async () => {
    // Mock a context with search results
    const mockContext = {
      ...defaultMockContext,
      searchUserData: { items: [{ id: 1, login: "testuser" }] },
      initialUsername: "testuser",
      getInitialUsername: jest.fn().mockReturnValue("testuser"),
    };

    // Update the use mock to return our context
    (React.use as jest.Mock).mockImplementation(() => mockContext);

    renderWithProviders(<App />);

    // Check if the search info text is shown
    expect(
      screen.getByText(/showing users for "testuser"/i)
    ).toBeInTheDocument();

    // Check if the GitAccordion component is rendered
    expect(screen.getByTestId("git-accordion")).toBeInTheDocument();
  });
});
