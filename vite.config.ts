import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Default ist "./" (RELATIVE Pfade) → ein versehentlicher Build ohne BASE_PATH
// erzeugt damit eine Netcup-taugliche Seite statt einer kaputten mit absoluten
// Pfaden. GitHub Pages setzt BASE_PATH=/rokko-web/ explizit in der CI.
const basePath = process.env.BASE_PATH ?? "./";

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
  },
});
