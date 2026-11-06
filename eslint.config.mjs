import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            react: reactPlugin,
            import: importPlugin,
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.json",
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                node: true,
                es6: true,
                mocha: true,
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "indent": ["error", "tab", { "SwitchCase": 1 }],
            "no-console": "off",
            "no-unused-vars": "off",
            "no-var": "error",
            "no-empty": "off",
            "no-trailing-spaces": "error",
            "prefer-const": "error",
            "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
            "semi": ["error", "always"],
            "react/react-in-jsx-scope": "off",
            "import/prefer-default-export": "warn",
            "react/prop-types": "off",
        },
    },
    {
        ignores: [
            "node_modules/",
            "build/",
            "admin/build/",
            "widgets/",
            "src-widgets/build/",
            "main/",
            ".prettierrc.js",
        ],
    },
];