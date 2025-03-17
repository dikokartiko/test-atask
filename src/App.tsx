import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Stack,
  Input,
  Field,
  Alert,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, lazy, Suspense, useRef, useCallback, use } from "react";
import { GitContext } from "@/contexts";
import type { GitContextType } from "@/contexts";
import { useUrlParam } from "@/hooks";
import { LoadingFallback, ErrorBoundary } from "@/components";
import { searchGitHubUsers } from "@/services/git/requests";

// Lazy load the GitAccordion component
const GitAccordion = lazy(() =>
  import("@/components/ui/git-accordion").then((module) => ({
    default: module.GitAccordion,
  }))
);

// Define the validation schema with zod
const formSchema = z.object({
  username: z.string().min(1, "Username is required").trim(),
});

// Infer the type from the schema
type FormValues = z.infer<typeof formSchema>;

function App() {
  // Keep track of whether initial search has been performed
  const initialSearchPerformed = useRef(false);

  // Use the Git context for state and operations
  const {
    searchUserData,
    setSearchUserData,
    userLoading,
    setUserLoading,
    searchError,
    setSearchError,
    initialUsername,
    setInitialUsername,
    getInitialUsername,
  } = use(GitContext) as GitContextType;

  // Use the custom hook for URL parameters
  const { setParam } = useUrlParam("username");

  // Search users function moved from git context
  const searchUsers = useCallback(
    async (username: string) => {
      // Update URL with username parameter
      setParam(username);

      // Update initialUsername when searching
      setInitialUsername(username);

      // Clear previous search results and set loading state
      setSearchUserData(null);
      setUserLoading(true);
      setSearchError(null);

      try {
        const results = await searchGitHubUsers(username);
        if (results) {
          setSearchUserData(results);
        }
        return results;
      } catch (err) {
        const errorObj =
          err instanceof Error ? err : new Error("An unknown error occurred");
        setSearchError(errorObj);
        throw errorObj;
      } finally {
        setUserLoading(false);
      }
    },
    [
      setParam,
      setInitialUsername,
      setSearchUserData,
      setUserLoading,
      setSearchError,
    ]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      username: initialUsername,
    },
    resolver: zodResolver(formSchema),
  });

  // Handle initial search if username is in URL
  useEffect(() => {
    if (initialSearchPerformed.current) return;

    const usernameFromUrl = getInitialUsername();
    if (!usernameFromUrl) return;

    initialSearchPerformed.current = true;
    setInitialUsername(usernameFromUrl);
    searchUsers(usernameFromUrl).catch((error) => {
      console.error("Error during initial search:", error);
    });
  }, [getInitialUsername, setInitialUsername, searchUsers]);

  // Update form value when initialUsername changes
  useEffect(() => {
    if (initialUsername) {
      setValue("username", initialUsername);
    }
  }, [initialUsername, setValue]);

  const onSubmit = async (data: FormValues) => {
    // Update URL
    setParam(data.username);
    await searchUsers(data.username);
  };

  return (
    <Box maxW="1280px" mx="auto" p="2rem" textAlign="center">
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        gap={4}
        align="center"
        mt={4}
        width="100%">
        {searchError && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>
                <HStack gap={2} align="center">
                  {searchError.message}
                </HStack>
              </Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )}
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input
            bg="secondary.contrast"
            borderColor="secondary.emphasized"
            placeholder="Enter username"
            {...register("username")}
            size={{ base: "md", lg: "lg" }}
            width="100%"
          />
          {errors.username && (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Stack width="100%" gap={1}>
          <Button
            type="submit"
            size={{ base: "md", lg: "lg" }}
            disabled={userLoading}>
            {userLoading ? "Loading..." : "Submit"}
          </Button>
          {searchUserData && !searchError && initialUsername && (
            <Text mt={2} fontSize="sm" color="gray.500" textAlign="left">
              Showing Users for "{initialUsername}"
            </Text>
          )}
        </Stack>

        {userLoading ? (
          <LoadingFallback />
        ) : (
          searchUserData &&
          !searchError && (
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <GitAccordion />
              </Suspense>
            </ErrorBoundary>
          )
        )}
      </Stack>
    </Box>
  );
}

export default App;
