import baseConfig from "@acme/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  {
    files: ["prisma/**"],
    rules: {
      // Package: prisma-kysely is generating code that doesn't follow our conventions
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },
];
