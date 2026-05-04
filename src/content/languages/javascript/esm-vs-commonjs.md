---
title: "ESM vs. CommonJS"
description: "Mastering the complexities of modern and legacy module resolution systems"
---

## The Module War

For years, JavaScript had no native module system. The community created **CommonJS** (used by Node.js). Eventually, the official standard **ECMAScript Modules (ESM)** was released. Today, we live in a "dual-module" world where understanding the differences is critical for build systems and library authors.

## 1. CommonJS (CJS)

CommonJS is the legacy system designed for servers. It is **Synchronous** and uses `require()` and `module.exports`.

```javascript
const fs = require('fs'); // Synchronous import
module.exports = { data: 123 };
```

- **Runtime Binding**: Modules are evaluated the moment they are required.
- **Top-level await**: Not supported.
- **Strict Mode**: Not enforced by default.

## 2. ECMAScript Modules (ESM)

ESM is the official standard for both browsers and modern Node.js. It is **Asynchronous** and uses `import` and `export`.

```javascript
import { data } from './module.js';
export const value = 456;
```

- **Static Analysis**: The engine knows the dependencies **before** running the code. This enables **Tree Shaking** (removing unused code).
- **Live Bindings**: If an exported value changes in the module, it changes for all importers.
- **Top-level await**: Supported!
- **Strict Mode**: Always enforced.

## 3. Comparison Table

| Feature | CommonJS (`require`) | ESM (`import`) |
| :--- | :--- | :--- |
| **Resolution** | Synchronous | Asynchronous |
| **Loading** | Dynamic (at runtime) | Static (pre-parsing) |
| **Tree Shaking** | Very difficult | Native support |
| **File Extension** | `.js` or `.cjs` | `.js` or `.mjs` |
| **Node.js Default** | Yes | No (requires `"type": "module"`) |

## 4. The "Interop" Problem

- **ESM can `import` CJS**: Usually works, but you often lose named exports and get a `default` object.
- **CJS cannot `require` ESM**: Because ESM is asynchronous and `require` is synchronous. To load ESM from CJS, you must use dynamic `import()`.

```javascript
// Inside a CommonJS file
async function loadESM() {
    const { someFunc } = await import('./modern-lib.mjs');
}
```

## 5. Modern Best Practice

Use **ESM** for all new projects. It is the standard, it's faster for browsers, and it results in smaller bundle sizes due to tree shaking.

## Summary Checklist
- [x] CommonJS is synchronous and uses `require`.
- [x] ESM is static, asynchronous, and uses `import`.
- [x] ESM enables **Tree Shaking**.
- [x] Use `.mjs` or `"type": "module"` in `package.json` for ESM.
- [x] Use dynamic `import()` for lazy loading or CJS interop.
- [x] ESM is the future of the JavaScript ecosystem.
---
