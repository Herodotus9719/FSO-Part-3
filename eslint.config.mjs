import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
    {
        // ...
        plugins: {
            "@stylistic/js": stylisticJs,
        },
        rules: {
            // "@stylistic/js/indent": ["error", 2],
            "@stylistic/js/indent": ["error", 4],
            "@stylistic/js/linebreak-style": ["error", "unix"],
            // "@stylistic/js/quotes": ["error", "single"],
            "@stylistic/js/quotes": ["error", "double"],
            // "@stylistic/js/semi": ["error", "never"],
            eqeqeq: "error",
            "no-trailing-spaces": "error",
            "object-curly-spacing": ["error", "always"],
            "arrow-spacing": ["error", { before: true, after: true }],
            "no-console": "off",
        },
    },
    {
        ignores: ["dist/**", "build/**"],
    },
];
