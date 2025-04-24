import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  server: {
    // open: true,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5173,
    https:false,
    proxy: {
      "/api": "http://127.0.0.1:8001",
    },
  },
}));
