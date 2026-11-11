import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Session-25 (S25-18c), the documented posture: this config runs with
// most of the correctness-oriented base rules OFF (see the list below)
// — the type gate (`tsc --strict` + the build-as-type-gate) and the
// census/source-pin batteries own correctness for this repo; lint owns
// the Next-specific core-web-vitals family. "lint 0/0" therefore means
// the Next rules pass, not a full correctness sweep.

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // TypeScript rules
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/no-unused-disable-directive": "off",
    
    // React rules
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/purity": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-compiler/react-compiler": "off",
    
    // Next.js rules
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    
    // General JavaScript rules
    "prefer-const": "off",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-empty": "off",
    "no-irregular-whitespace": "off",
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-redeclare": "off",
    "no-undef": "off",
    "no-unreachable": "off",
    "no-useless-escape": "off",
  },
}, {
  // Session-21 (S21-16): the scaffold-family phantom ignores pruned
  // (examples/ delivery/ research/ tool-results/ mini-services/ .zscripts/
  // out/ build/ never existed here); skills stays — the doctrine.
  ignores: ["node_modules/**", ".next/**", "next-env.d.ts", "skills"]
}];

export default eslintConfig;
