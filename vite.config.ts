// vite.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      "STALE_TIME",
      "CACHE_TIME",
      "LOCAL_STORAGE_EDIT_SETTINGS_PREFIX",
      "SESSION_STORAGE_SCROLL_POSITION_KEY",
    ]),
  ],
});
