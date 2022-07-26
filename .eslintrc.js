module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    // "prettier",
    // "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["prettier", "react", "@typescript-eslint"],
  root: true,
  rules: {
    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/quotes": "off",
    // "@typescript-eslint/semi": ['warn', 'always'],
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
