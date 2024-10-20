import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Vitestの設定をここに記述
    include: [
      "**/unit/*.{test,spec}.?(c|m)[jt]s?(x)",
      "**/integration/**/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
});
