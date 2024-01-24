import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
