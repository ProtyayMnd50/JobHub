// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   build: {
//     sourcemap: false, // Disable source map generation in production
//   },
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path, { dirname } from "node:path"; // Correct import

// Use import.meta.url to resolve the directory
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    sourcemap: false, // Disable source map generation in production
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Correct alias path
    },
  },
});
