---
title: "Modules"
description: "ES modules (import/export), dynamic import(), and CommonJS"
---

## What are JavaScript Modules?

Prior to **ES6**, we only had one global scope for all our logic. This made building large applications a nightmare! **Modules** allow you to split your code into separate files, each with its own private scope.

## 1. ES Modules (Modern Browser/Node.js)

The modern standard uses **`import`** and **`export`** to share variables and functions between files.

### Exporting from `utils.js`

```javascript
// Named exports!
export const PI = 3.14;
export const add = (a, b) => a + b;

// Default export! (Only ONE per file)
const config = { host: "localhost" };
export default config;
```

### Importing in `app.js`

```javascript
// Importing named exports (must use names!)
import { PI, add } from "./utils.js";

// Importing default export (name doesn't matter!)
import settings from "./utils.js";

console.log(add(PI, 10)); // 13.14
console.log(settings.host); // localhost
```

## 2. CommonJS (The Node.js Way)

Before ES modules were fully supported, **Node.js** used the **CommonJS** system. You'll still see this in older backend projects.

```javascript
// Exporting!
module.exports = { PI: 3.14 };

// Importing!
const { PI } = require("./utils.js");
```

## 3. Dynamic Imports: `import()`

Normally, imports happen before *any* code runs. **Dynamic imports** allow you to load a module only when you need it (like after a button click!), which dramatically boosts the performance of your web application.

```javascript
// Only load logic when user clicks!
button.addEventListener("click", async () => {
    // Dynamic import!
    const { heavyModule } = await import("./heavy-logic.js");
    heavyModule.run();
});
```

> **Wait!** Always use ES modules (`import/export`) for new projects. They are the official standard for both the browser and modern Node.js.

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **Export** | `export const` | Share variable/function |
| **Import** | `import { x }` | Load named variable |
| **Default** | `export default` | Share ONE thing per file |
| **Dynamic** | `import()` | Load code on-demand (Async) |
| **Best For** | Code separation, performance, clean structure |
| **Strict Mode**| All ES modules operate in strictly mode automatically! |
| **Scope** | Variables in a module are NOT global |
| **Bundling** | Use tools like Vite or Webpack to merge modules! |
| **Extension** | Use `.mjs` in Node.js for ES modules |
| **Script Tag** | Use `<script type="module">` for the browser |
| **Circular Ref**| Modules handle circular references better than CommonJS |
| **Live Bindings**| Exported values are "live" links to the original! |
| **Alias** | `import { x as y } from "./lib"` (Rename on import!) |
| **Namespace** | `import * as lib from "./lib"` (Import EVERYTHING!) |
| **Path** | Import paths are relative (`./`) or absolute (`/`) |
| **Caching** | Modules are cached; they only execute the FIRST time! |
