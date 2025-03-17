import { Box, Text, Accordion, Span } from "@chakra-ui/react";
import { use, useCallback, useState, lazy, Suspense } from "react";
import { GitContext } from "@/contexts/git/git-context";
import { GitContextType } from "@/contexts/git/types";
import { getUserRepositories } from "@/services/git/requests";
import { LoadingFallback, ErrorBoundary } from "@/components";

// Lazy load the RepositoryVirtual component
const RepositoryVirtual = lazy(() =>
  import("./repository-virtual").then((module) => ({
    default: module.RepositoryVirtual,
  }))
);

export function GitAccordion() {
  const context = use(GitContext) as GitContextType;
  const {
    searchUserData,
    repositories,
    setRepositories,
    isLoadingRepos,
    setIsLoadingRepos,
    repoError,
    setRepoError,
    setIsRepoSelected,
  } = context;
  const users = searchUserData?.items || [];
  const [visibleRepos, setVisibleRepos] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchUserRepositories = useCallback(
    async (username: string) => {
      setRepositories(null);
      setIsLoadingRepos(true);
      setRepoError(null);
      setVisibleRepos(10);
      setIsLoadingMore(false);
      setIsRepoSelected(true);

      try {
        const results = await getUserRepositories(username, {
          per_page: 100,
          sort: "updated",
          direction: "desc",
        });
        if (results) {
          setRepositories(results);
        }
        return results;
      } catch (err) {
        const errorObj =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setRepoError(errorObj);
        throw errorObj;
      } finally {
        setIsLoadingRepos(false);
      }
    },
    [setRepositories, setIsLoadingRepos, setRepoError, setIsRepoSelected]
  );

  const loadMore = useCallback(() => {
    if (repositories && visibleRepos < repositories.length && !isLoadingMore) {
      setIsLoadingMore(true);
      // Use setTimeout to simulate network delay and prevent UI jumps
      setTimeout(() => {
        setVisibleRepos((prev) => prev + 10);
        setIsLoadingMore(false);
      }, 300);
    }
  }, [repositories, visibleRepos, isLoadingMore]);

  return (
    <Box mt={4} textAlign="left" width="100%">
      <Box mt={2}>
        <Accordion.Root collapsible>
          {users?.slice(0, 5).map((user) => (
            <Accordion.Item key={user.id} value={user.login}>
              <Accordion.ItemTrigger
                cursor="pointer"
                onClick={() => fetchUserRepositories(user.login)}>
                <Span flex="1">{user.login}</Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  {isLoadingRepos ? (
                    <Text>Loading repositories...</Text>
                  ) : repoError ? (
                    <Text color="red.500">
                      Error loading repositories: {repoError.message}
                    </Text>
                  ) : repositories ? (
                    repositories.length === 0 ? (
                      <Text>No repositories found</Text>
                    ) : (
                      <Box>
                        <ErrorBoundary>
                          <Suspense fallback={<LoadingFallback />}>
                            <RepositoryVirtual
                              repositories={repositories}
                              visibleRepos={visibleRepos}
                              isLoadingMore={isLoadingMore}
                              loadMore={loadMore}
                            />
                          </Suspense>
                        </ErrorBoundary>
                      </Box>
                    )
                  ) : (
                    <Text>Click to load repositories</Text>
                  )}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </Box>
  );
}
