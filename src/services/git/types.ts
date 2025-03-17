/**
 * GitHub user search response interface
 * @interface GitHubUserSearchResponse
 * @property {number} total_count - The total number of users found
 * @property {boolean} incomplete_results - Whether the results are incomplete
 * @property {GitHubUser[]} items - Array of GitHub users matching the search criteria
 */
export interface GitHubUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

/**
 * GitHub user interface
 * @interface GitHubUser
 * @property {string} login - The username of the GitHub user
 * @property {number} id - The unique identifier for the user
 * @property {string} node_id - The node ID of the user
 * @property {string} avatar_url - URL to the user's avatar image
 * @property {string} gravatar_id - The gravatar ID for the user
 * @property {string} url - The API URL for this user
 * @property {string} html_url - The GitHub profile URL for this user
 * @property {string} followers_url - API URL to get user's followers
 * @property {string} following_url - API URL to get users this user is following
 * @property {string} gists_url - API URL to get user's gists
 * @property {string} starred_url - API URL to get repositories starred by user
 * @property {string} subscriptions_url - API URL to get repositories user is subscribed to
 * @property {string} organizations_url - API URL to get user's organizations
 * @property {string} repos_url - API URL to get user's repositories
 * @property {string} events_url - API URL to get events for this user
 * @property {string} received_events_url - API URL to get events received by this user
 * @property {string} type - The type of GitHub account
 * @property {string} user_view_type - The view type for the user
 * @property {boolean} site_admin - Whether the user is a GitHub site admin
 * @property {number} score - The search score for this user
 */
export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  score: number;
}

/**
 * GitHub repository interface
 * @interface GitHubRepo
 * @property {number} id - The unique identifier for the repository
 * @property {string} node_id - The node ID of the repository
 * @property {string} name - The name of the repository
 * @property {string} full_name - The full name of the repository (owner/name)
 * @property {GitHubUser} owner - The owner of the repository
 * @property {boolean} private - Whether the repository is private
 * @property {string} html_url - The GitHub URL for this repository
 * @property {string} description - The description of the repository
 * @property {boolean} fork - Whether the repository is a fork
 * @property {string} url - The API URL for this repository
 * @property {string} created_at - When the repository was created
 * @property {string} updated_at - When the repository was last updated
 * @property {string} pushed_at - When the repository was last pushed to
 * @property {string} git_url - The Git URL for this repository
 * @property {string} ssh_url - The SSH URL for this repository
 * @property {string} clone_url - The URL to clone this repository via HTTPS
 * @property {string} homepage - The homepage URL for this repository
 * @property {number} stargazers_count - The number of stars on this repository
 * @property {number} watchers_count - The number of watchers on this repository
 * @property {string} language - The primary language of the repository
 * @property {boolean} has_issues - Whether issues are enabled for this repository
 * @property {boolean} has_projects - Whether projects are enabled for this repository
 * @property {boolean} has_downloads - Whether downloads are enabled for this repository
 * @property {boolean} has_wiki - Whether the wiki is enabled for this repository
 * @property {boolean} has_pages - Whether GitHub Pages is enabled for this repository
 * @property {number} forks_count - The number of forks of this repository
 * @property {boolean} archived - Whether the repository is archived
 * @property {boolean} disabled - Whether the repository is disabled
 * @property {number} open_issues_count - The number of open issues in this repository
 * @property {object} license - The license information for this repository
 * @property {boolean} allow_forking - Whether forking is allowed
 * @property {boolean} is_template - Whether this is a template repository
 * @property {string} visibility - The visibility of the repository (public, private, internal)
 * @property {number} forks - The number of forks
 * @property {number} open_issues - The number of open issues
 * @property {number} watchers - The number of watchers
 * @property {string} default_branch - The default branch of the repository
 */
export interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: GitHubUser;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  } | null;
  allow_forking: boolean;
  is_template: boolean;
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}
