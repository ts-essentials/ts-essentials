import expectType from "eslint-plugin-expect-type/configs/recommended";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  {
    ...expectType,
    files: ["test/**/*.display.ts"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
