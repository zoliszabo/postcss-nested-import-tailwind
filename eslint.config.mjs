import loguxConfig from "@logux/eslint-config";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  ...loguxConfig,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error",
      "security/detect-non-literal-require": "off",
      "node/global-require": "off",
      "consistent-return": "off",
      "perfectionist/sort-objects": "off"
    }
  }
];
