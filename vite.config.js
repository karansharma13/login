import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "localhost",
    port: 5173,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      // server: {
      //   proxy: {
      //     "/api": "https://dummyjson.com",
      //   },
      // },
    },
  },
  base: "/",
});
