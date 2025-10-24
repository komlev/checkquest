import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { analyzer } from "vite-bundle-analyzer";
import react from "@vitejs/plugin-react";
import pack from "./package.json";

const hasAnalyzer = process.env.ANALYZE;

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html: string) {
      return html.replace(/APP_VERSION/, pack.version);
    },
  };
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    htmlPlugin(),
    analyzer({
      analyzerMode: "static",
      openAnalyzer: true,
      enabled: !!hasAnalyzer,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
