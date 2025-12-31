import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/worker",
    target: "es2020",
    lib: {
      entry: path.resolve(__dirname, "src/worker/index.ts"),
      formats: ["es"],
      fileName: () => "index",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: "index.js",
        chunkFileNames: "index.js",
      },
    },
    chunkSizeWarningLimit: 2000,
    sourcemap: false,
    minify: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["hono", "hono/cors"],
  },
});
