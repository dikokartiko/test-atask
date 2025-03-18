/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import { GitProvider } from "@/contexts/git";
import { system } from "@/theme"; // Import custom theme system

// Add any providers that are required for testing components
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider value={system}>
      <GitProvider>{children}</GitProvider>
    </ChakraProvider>
  );
};

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from "@testing-library/react";

// Override render method
export { customRender as render };
