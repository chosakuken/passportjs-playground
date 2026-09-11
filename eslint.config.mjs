import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    extends: [
      ...tseslint.configs.strict,
      ...tseslint.configs.strictTypeChecked
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: globals.node,
    },
  },
]);
