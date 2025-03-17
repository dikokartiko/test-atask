import { useCallback } from "react";

/**
 * Custom hook for handling URL parameters
 * @param param The URL parameter name
 * @returns Object with functions to get and set the parameter
 */
export function useUrlParam(param: string) {
  const getParam = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "";
  }, [param]);

  const setParam = useCallback(
    (value: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set(param, value);
      window.history.pushState({}, "", url);
    },
    [param]
  );

  return { getParam, setParam };
}
