import { renderHook, act } from "@testing-library/react";
import { useUrlParam } from "@/hooks/use-urlparam";

describe("useUrlParam hook", () => {
  // Backup original window.location and window.history objects
  const originalLocation = window.location;
  const originalHistory = window.history;

  // Mock setup before all tests
  beforeAll(() => {
    // Mock window.location
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...originalLocation,
        search: "?existingParam=existingValue",
        href: "http://localhost/?existingParam=existingValue",
      },
      writable: true,
    });

    // Mock window.history.pushState
    window.history.pushState = jest.fn();
  });

  // Restore original objects after all tests
  afterAll(() => {
    window.location = originalLocation;
    window.history = originalHistory;
  });

  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
    window.location.search = "?existingParam=existingValue";
    window.location.href = "http://localhost/?existingParam=existingValue";
  });

  it("should get an existing URL parameter", () => {
    const { result } = renderHook(() => useUrlParam("existingParam"));

    expect(result.current.getParam()).toBe("existingValue");
  });

  it("should return empty string for a non-existent parameter", () => {
    const { result } = renderHook(() => useUrlParam("nonExistentParam"));

    expect(result.current.getParam()).toBe("");
  });

  it("should set a URL parameter and update browser history", () => {
    const { result } = renderHook(() => useUrlParam("testParam"));

    act(() => {
      result.current.setParam("newValue");
    });

    // Verify history.pushState was called
    expect(window.history.pushState).toHaveBeenCalled();

    // Access the arguments directly and convert to string if needed
    const mockCall = (window.history.pushState as jest.Mock).mock.calls[0];
    const urlString = String(mockCall[2]);

    // Verify parameters individually
    expect(urlString.indexOf("testParam=newValue")).toBeGreaterThan(-1);
  });

  it("should update an existing URL parameter", () => {
    const { result } = renderHook(() => useUrlParam("existingParam"));

    act(() => {
      result.current.setParam("updatedValue");
    });

    // Verify history.pushState was called
    expect(window.history.pushState).toHaveBeenCalled();

    // Access the arguments directly and convert to string
    const mockCall = (window.history.pushState as jest.Mock).mock.calls[0];
    const urlString = String(mockCall[2]);

    // Verify the updated parameter exists
    expect(urlString.indexOf("existingParam=updatedValue")).toBeGreaterThan(-1);

    // Verify the old value is gone
    expect(urlString.indexOf("existingParam=existingValue")).toBe(-1);
  });

  it("should handle empty string values", () => {
    const { result } = renderHook(() => useUrlParam("emptyParam"));

    act(() => {
      result.current.setParam("");
    });

    // Verify history.pushState was called
    expect(window.history.pushState).toHaveBeenCalled();

    // Access the arguments directly and convert to string
    const mockCall = (window.history.pushState as jest.Mock).mock.calls[0];
    const urlString = String(mockCall[2]);

    // Verify the empty parameter exists
    expect(urlString.indexOf("emptyParam=")).toBeGreaterThan(-1);
  });

  it("should maintain other existing URL parameters when setting a new one", () => {
    const { result } = renderHook(() => useUrlParam("newParam"));

    act(() => {
      result.current.setParam("newValue");
    });

    // Access the arguments directly and convert to string
    const mockCall = (window.history.pushState as jest.Mock).mock.calls[0];
    const urlString = String(mockCall[2]);

    // Check individual parameters
    expect(urlString.indexOf("existingParam=existingValue")).toBeGreaterThan(
      -1
    );
    expect(urlString.indexOf("newParam=newValue")).toBeGreaterThan(-1);

    // Ensure URL starts correctly
    expect(urlString.startsWith("http://localhost/?")).toBe(true);
  });
});
