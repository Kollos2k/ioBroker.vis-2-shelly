import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    // 1. Hauptprojekt (Backend & Frontend src/)
    {
        files: ["src/**/*.ts", "src/**/*.tsx", "admin/**/*.ts", "admin/**/*.tsx", "main.ts"],
        plugins: {
            react: reactPlugin,
            import: importPlugin,
        },
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            "indent": ["error", "tab", { "SwitchCase": 1 }],
            "no-console": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "no-var": "error",
            "prefer-const": "error",
            "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
            "semi": ["error", "always"],
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
        },
    },
    // 2. Widget-Projekt (src-widgets/) mit eigener tsconfig.json
    {
        files: ["src-widgets/src/**/*.ts", "src-widgets/src/**/*.tsx"],
        plugins: {
            react: reactPlugin,
            import: importPlugin,
        },
        languageOptions: {
            parserOptions: {
                project: "./src-widgets/tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
            "no-console": "off",
        },
    },
    // 3. Build-Skripte und Tests (JavaScript mit CommonJS / Mocha)
    {
        files: ["tasks.js", "test/**/*.js", "*.js", "*.mjs"],
        languageOptions: {
            globals: {
                node: true,
                es6: true,
                mocha: true,
                describe: "readonly",
                it: "readonly",
                before: "readonly",
                after: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
            },
        },
        rules: {
            "@typescript-eslint/no-require-imports": "off",
            "no-undef": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
    // 4. Ignorierte Ordner
    {
        ignores: [
            "node_modules/",
            "build/",
            "admin/build/",
            "widgets/",
            "src-widgets/build/",
            "src-widgets/node_modules/",
            "main/",
            ".dev-server/",
        ],
    },
];