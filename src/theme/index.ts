import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { colors, semanticTokens } from "./colors";

// Define our custom config with the primary blue color
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors,
    },
    semanticTokens,
  },
  // Set primary as the default color palette globally and ensure light mode
  globalCss: {
    html: {
      colorPalette: "primary",
      colorScheme: "light",
    },
    body: {
      bg: "white",
      color: "black",
    },
  },
});

// Create the system by merging the default config with our custom config
export const system = createSystem(defaultConfig, customConfig);
