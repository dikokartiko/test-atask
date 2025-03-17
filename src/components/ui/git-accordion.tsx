import {
  Box,
  Text,
  Accordion,
  Span,
  Spinner,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { use, useCallback, useState, useRef } from "react";
import { GitContext } from "@/contexts/git/git-context";
import { GitContextType } from "@/contexts/git/types";
import { getUserRepositories } from "@/services/git/requests";
import { Virtuoso } from "react-virtuoso";
import { FaStar } from "react-icons/fa";

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
  } = context;
  const users = searchUserData?.items || [];
  const [visibleRepos, setVisibleRepos] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const virtuosoRef = useRef(null);

  const fetchUserRepositories = useCallback(
    async (username: string) => {
      setRepositories(null);
      setIsLoadingRepos(true);
      setRepoError(null);
      setVisibleRepos(10);
      setIsLoadingMore(false);

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
    [setRepositories, setIsLoadingRepos, setRepoError]
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
                        <Box height="300px">
                          <Virtuoso
                            ref={virtuosoRef}
                            style={{ height: "100%" }}
                            data={repositories.slice(0, visibleRepos)}
                            endReached={loadMore}
                            overscan={20}
                            increaseViewportBy={200}
                            itemContent={(_, repo) => (
                              <Box key={repo.id} p={3} bg={"gray.100"} mb={2}>
                                <Flex justify="space-between" align="center">
                                  <Text fontWeight="bold">{repo.name}</Text>
                                  <Flex align="center" gap="1.5">
                                    <Text fontSize="sm" color="gray.500">
                                      {repo.stargazers_count || 0}
                                    </Text>
                                    <Icon as={FaStar} color="black" mr={1} />
                                  </Flex>
                                </Flex>
                                <Text
                                  fontSize="sm"
                                  color="gray.600"
                                  mt={1}
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  maxW="100%"
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                  }}>
                                  {repo.description ||
                                    "No description available"}
                                </Text>
                              </Box>
                            )}
                            components={{
                              Footer: () =>
                                isLoadingMore &&
                                repositories &&
                                visibleRepos < repositories.length ? (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    p={4}>
                                    <Spinner size="sm" mr={2} />
                                    <Text fontSize="sm">Loading more...</Text>
                                  </Box>
                                ) : null,
                            }}
                          />
                        </Box>
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
