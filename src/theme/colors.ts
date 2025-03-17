export const colors = {
  // Standard blue color palette from Chakra UI
  blue: {
    50: { value: "#ebf8ff" },
    100: { value: "#bee3f8" },
    200: { value: "#90cdf4" },
    300: { value: "#63b3ed" },
    400: { value: "#4299e1" },
    500: { value: "#3182ce" },
    600: { value: "#2b6cb0" },
    700: { value: "#1e4e8c" },
    800: { value: "#153e75" },
    900: { value: "#1a365d" },
    950: { value: "#0f2942" },
  },
  // Grey color palette
  grey: {
    50: { value: "#f2f2f2" },
    100: { value: "#e0e0e0" },
    200: { value: "#c8c8c8" },
    300: { value: "#a8a8a8" },
    400: { value: "#888888" },
    500: { value: "#6c6c6c" },
    600: { value: "#525252" },
    700: { value: "#3d3d3d" },
    800: { value: "#2a2a2a" },
    900: { value: "#1a1a1a" },
    950: { value: "#0f0f0f" },
  },
};

// Semantic tokens for the primary color to ensure it works with colorPalette
export const semanticTokens = {
  colors: {
    primary: {
      solid: { value: "{colors.blue.500}" },
      contrast: { value: "{colors.blue.50}" },
      fg: { value: "{colors.blue.700}" },
      muted: { value: "{colors.blue.100}" },
      subtle: { value: "{colors.blue.200}" },
      emphasized: { value: "{colors.blue.300}" },
      focusRing: { value: "{colors.blue.500}" },
    },
    secondary: {
      solid: { value: "{colors.grey.500}" },
      contrast: { value: "{colors.grey.50}" },
      fg: { value: "{colors.grey.700}" },
      muted: { value: "{colors.grey.100}" },
      subtle: { value: "{colors.grey.200}" },
      emphasized: { value: "{colors.grey.300}" },
      focusRing: { value: "{colors.grey.500}" },
    },
  },
};
