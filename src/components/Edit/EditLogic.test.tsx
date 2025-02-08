import {
  saveToLocalStorage,
  loadFromLocalStorage,
  ImageSettings,
  LOCAL_STORAGE_PREFIX,
} from "./EditLogic";

describe("EditLogic", () => {
  const originalError = console.error;

  beforeAll(() => {
    console.error = jest.fn(); // Suppress console.error
  });

  afterAll(() => {
    console.error = originalError; // Restore console.error
  });
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe("saveToLocalStorage", () => {
    it("saves image settings to localStorage with the correct key and value", () => {
      const key = "image1";
      const value: ImageSettings = {
        width: 300,
        height: 400,
        grayscale: true,
        blur: 5,
      };

      saveToLocalStorage(key, value);

      const storedValue = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
      expect(storedValue).toBe(JSON.stringify(value));
    });

    it("overwrites existing data in localStorage with the same key", () => {
      const key = "image1";
      const initialValue: ImageSettings = {
        width: 300,
        height: 400,
        grayscale: true,
        blur: 5,
      };

      const updatedValue: ImageSettings = {
        width: 600,
        height: 800,
        grayscale: false,
        blur: 2,
      };

      saveToLocalStorage(key, initialValue);
      saveToLocalStorage(key, updatedValue);

      const storedValue = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
      expect(storedValue).toBe(JSON.stringify(updatedValue));
    });
  });

  describe("loadFromLocalStorage", () => {
    it("loads image settings from localStorage if the key exists", () => {
      const key = "image1";
      const value: ImageSettings = {
        width: 300,
        height: 400,
        grayscale: true,
        blur: 5,
      };

      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(value));

      const loadedValue = loadFromLocalStorage(key);
      expect(loadedValue).toEqual(value);
    });

    it("returns null if the key does not exist in localStorage", () => {
      const key = "nonexistent_key";

      const loadedValue = loadFromLocalStorage(key);
      expect(loadedValue).toBeNull();
    });

    it("handles invalid JSON data gracefully", () => {
      const key = "invalid_json";
      localStorage.setItem(LOCAL_STORAGE_PREFIX + key, "{invalid-json");

      const loadedValue = loadFromLocalStorage(key);
      expect(loadedValue).toBeNull();
    });
  });
});
