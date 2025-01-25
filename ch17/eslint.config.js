import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import googleConfig from "eslint-config-google";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["ex01/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Google スタイルのルールを適用（valid-jsdocとrequire-jsdocはFlat Configモードだとエラーが出てしまうため除外）
      ...Object.fromEntries(
        Object.entries(googleConfig.rules).filter(
          ([key]) => key !== "require-jsdoc" && key !== "valid-jsdoc"
        )
      ),
    },
    ignores: ["ex01/format_sample.js", "ex02"],
  },
];
