// Import Jest DOM extensions
import "@testing-library/jest-dom";

// Polyfill for structuredClone (required for Chakra UI)
if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = function structuredClone<T>(obj: T): T {
    if (obj === null || obj === undefined) return obj;
    try {
      // Handle most common cases
      return JSON.parse(JSON.stringify(obj));
    } catch {
      // Fallback for more complex cases (like circular references)
      const seen = new WeakMap();
      return cloneDeep(obj, seen);
    }
  };
}

// Helper function for deep cloning with circular reference handling
function cloneDeep<T>(obj: T, seen = new WeakMap<object, unknown>()): T {
  // Handle primitive types
  if (obj === null || typeof obj !== "object") return obj;

  // Handle Date objects
  if (obj instanceof Date) return new Date(obj) as unknown as T;

  // Handle RegExp objects
  if (obj instanceof RegExp) return new RegExp(obj) as unknown as T;

  // Handle circular references
  if (seen.has(obj as object)) return seen.get(obj as object) as T;

  // Handle Arrays
  if (Array.isArray(obj)) {
    const copy: unknown[] = [];
    seen.set(obj as object, copy);
    copy.push(...obj.map((item) => cloneDeep(item, seen)));
    return copy as unknown as T;
  }

  // Handle Objects
  const copy: Record<string, unknown> = {};
  seen.set(obj as object, copy);

  Object.keys(obj as object).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = cloneDeep((obj as Record<string, unknown>)[key], seen);
    }
  });

  return copy as unknown as T;
}

// This file will be run in a Jest environment where these globals are available
// We're using TypeScript ignore comments to bypass type checking for Jest globals
// In a real project, you would add proper typings via jest.config.js and jest setup files

// Mock for global fetch API
global.fetch = function mockFetch() {
  return Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
    ok: true,
  } as Response);
};

// Mock for ResizeObserver which is not available in JSDOM
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock for global objects not available in test environment
global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Silent console errors/warnings during tests
// Uncomment if needed for cleaner test output
// jest.spyOn(console, 'error').mockImplementation(() => {});
// jest.spyOn(console, 'warn').mockImplementation(() => {});

// Removed global declarations since we are using @types/jest

// Clean up mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock for URL manipulations in tests
Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost/",
    search: "",
    pathname: "/",
    hash: "",
  },
  writable: true,
});

// Mock for localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
