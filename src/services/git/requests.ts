import { api } from "../api-request";
import { GitHubEndpoints } from "./endpoints";
import { GitHubRepo, GitHubUserSearchResponse } from "./types";

/**
 * Function to search GitHub users
 * @param query - The search query
 * @returns Promise with the search results
 */
export function searchGitHubUsers(query: string) {
  if (!query.trim()) {
    return Promise.resolve(null);
  }

  return api.get<GitHubUserSearchResponse>(GitHubEndpoints.SEARCH_USERS, {
    params: { q: query },
  });
}

/**
 * Function to get GitHub repositories for a user
 * @param username - GitHub username
 * @param options - Optional parameters for the request
 * @returns Promise with the repositories
 */
export function getUserRepositories(
  username: string,
  options?: {
    type?: "all" | "owner" | "member";
    sort?: "created" | "updated" | "pushed" | "full_name";
    direction?: "asc" | "desc";
    per_page?: number;
    page?: number;
  }
) {
  if (!username.trim()) {
    return Promise.resolve(null);
  }

  const endpoint = GitHubEndpoints.USER_REPOS.replace("{username}", username);

  return api.get<GitHubRepo[]>(endpoint, {
    params: options,
  });
}
