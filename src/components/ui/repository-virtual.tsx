import { Box, Text, Spinner, Flex, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import { FaStar } from "react-icons/fa";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
}

interface RepositoryVirtualProps {
  repositories: Repository[];
  visibleRepos: number;
  isLoadingMore: boolean;
  loadMore: () => void;
}

export function RepositoryVirtual({
  repositories,
  visibleRepos,
  isLoadingMore,
  loadMore,
}: RepositoryVirtualProps) {
  const virtuosoRef = useRef(null);

  return (
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
              {repo.description || "No description available"}
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
  );
}
