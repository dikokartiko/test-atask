/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: false,
        tsconfig: "tsconfig.test.json",
      },
    ],
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // The root directory that Jest should scan for tests and modules
  rootDir: ".",

  // A list of paths to directories that Jest should use to search for files in
  roots: ["<rootDir>/src"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],

  // Module name mapper to handle module aliases
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Setup files to run before each test
  setupFilesAfterEnv: ["<rootDir>/src/test-utils/setup-tests.ts"],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // A list of paths to modules that run some code to configure or set up the testing environment
  setupFiles: [],

  // Ignore specific directories for transforms
  transformIgnorePatterns: [
    "/node_modules/(?!(@chakra-ui|@emotion|react-icons)/)",
  ],
};

module.exports = config;
