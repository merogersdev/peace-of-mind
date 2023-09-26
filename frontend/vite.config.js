import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir: "./build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./__tests__/setup.js",
    testMatch: "./__tests__/**/*.test.js",
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
