import "@testing-library/jest-dom";
import "@emotion/jest";
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder and TextDecoder if they don’t exist
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

// Mock window.scrollTo globally
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

// Mock IntersectionObserver globally
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: jest.fn().mockImplementation((callback) => {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      takeRecords: jest.fn(),
      root: null,
      rootMargin: "",
      thresholds: [],
    };
  }),
});
