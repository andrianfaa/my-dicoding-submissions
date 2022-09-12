/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/App": path.resolve(`${process.cwd()}/src/App.jsx`),
      "@/app": path.resolve(`${process.cwd()}/src/app`),
      "@/pages": path.resolve(`${process.cwd()}/src/pages`),
      "@/components": path.resolve(`${process.cwd()}/src/components`),
      "@/utils": path.resolve(`${process.cwd()}/src/utils`),
      "@/hooks": path.resolve(`${process.cwd()}/src/hooks`),
      "@/styles": path.resolve(`${process.cwd()}/src/styles`),
    },
  },
});
