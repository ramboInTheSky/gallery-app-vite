const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Simulate a browser environment
  setupFilesAfterEnv: ["<rootDir>/setupTest.ts"], // Path to the setup file for global configurations
  snapshotSerializers: ["@emotion/jest/serializer"], // Serialize Emotion's CSS
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for transforming TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // File extensions to be considered
  testMatch: ["**/*.test.(ts|tsx)"], // Match test files
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS imports
  },
};

export default config;
