/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useState, useCallback } from "react";
import { GitHubUserSearchResponse, GitHubRepo } from "@/services/git/types";
import { GitContextType } from "./types";
import { useUrlParam } from "@/hooks/use-urlparam";

// Create context with a default value
export const GitContext = createContext<GitContextType | undefined>(undefined);

// Props for the provider component
interface GitProviderProps {
  children: ReactNode;
}

// Provider component
export const GitProvider = ({ children }: GitProviderProps) => {
  const [searchUserData, setSearchUserData] =
    useState<GitHubUserSearchResponse | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [initialUsername, setInitialUsername] = useState<string>("");

  // New state for repositories
  const [repositories, setRepositories] = useState<GitHubRepo[] | null>(null);
  const [isLoadingRepos, setIsLoadingRepos] = useState<boolean>(false);
  const [repoError, setRepoError] = useState<Error | null>(null);
  const [isRepoSelected, setIsRepoSelected] = useState<boolean>(false);

  // Use the custom hook for URL parameters
  const { getParam } = useUrlParam("username");

  // Get username from URL params if it exists
  const getInitialUsername = useCallback(() => {
    return getParam();
  }, [getParam]);

  // Removed fetchUserRepositories function

  const value = {
    searchUserData,
    setSearchUserData,
    userLoading,
    setUserLoading,
    searchError,
    setSearchError,
    initialUsername,
    setInitialUsername,
    repositories,
    setRepositories,
    isLoadingRepos,
    setIsLoadingRepos,
    repoError,
    setRepoError,
    isRepoSelected,
    setIsRepoSelected,
    getInitialUsername,
  };

  return <GitContext.Provider value={value}>{children}</GitContext.Provider>;
};
