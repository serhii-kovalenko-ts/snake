import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    rollupOptions: {
      input: {
        main: "index.html"
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
