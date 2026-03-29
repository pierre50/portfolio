import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { writeFileSync } from "fs";

export default defineConfig({
  plugins: [
    vue(),
    {
      name: "generate-nojekyll",
      closeBundle() {
        writeFileSync("dist/.nojekyll", "");
      },
    },
  ],
  base: "/",
  define: {
    "process.env": {},
  },
});