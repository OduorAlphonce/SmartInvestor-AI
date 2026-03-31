import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint Configuration
 * --------------------
 * - Core Web Vitals rules from Next.js
 * - TypeScript support
 * - Global ignores (overriding default ignores)
 */
const eslintConfig = defineConfig([
  // Next.js recommended rules for Core Web Vitals
  ...nextVitals,

  // TypeScript support
  ...nextTs,

  // Override default global ignores
  globalIgnores([
    ".next/**",          // Next.js build output
    "out/**",            // Static export output
    "build/**",          // Legacy build folder
    "next-env.d.ts",     // Generated Next.js type definitions
  ]),
]);

export default eslintConfig;