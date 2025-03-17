import { Box, Center, Spinner } from "@chakra-ui/react";

export const LoadingFallback = () => (
  <Box p={4} textAlign="center">
    <Center>
      <Spinner size="lg" color="teal.500" />
    </Center>
  </Box>
);
