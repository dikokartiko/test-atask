import { GitHubRepo, GitHubUserSearchResponse } from "@/services/git/types";

/**
 * Git context type definition
 */
export interface GitContextType {
  /** GitHub search results data */
  searchUserData: GitHubUserSearchResponse | null;
  /** Setter for search data */
  setSearchUserData: (data: GitHubUserSearchResponse | null) => void;
  /** Loading state for search operations */
  userLoading: boolean;
  /** Setter for loading state */
  setUserLoading: (loading: boolean) => void;
  /** Error state for search operations */
  searchError: Error | null;
  /** Setter for error state */
  setSearchError: (error: Error | null) => void;
  /** Current username being searched */
  initialUsername: string;
  /** Function to set the current username */
  setInitialUsername: (username: string) => void;
  /** Function to get username from URL */
  getInitialUsername: () => string | null;
  /** GitHub repositories for a user */
  repositories: GitHubRepo[] | null;
  /** Setter for repositories */
  setRepositories: (repos: GitHubRepo[] | null) => void;
  /** Loading state for repository operations */
  isLoadingRepos: boolean;
  /** Setter for loading state of repositories */
  setIsLoadingRepos: (loading: boolean) => void;
  /** Error state for repository operations */
  repoError: Error | null;
  /** Setter for repository error state */
  setRepoError: (error: Error | null) => void;
  /** Indicates if a repository is selected */
  isRepoSelected: boolean;
  /** Setter for repository selection state */
  setIsRepoSelected: (selected: boolean) => void;
}
