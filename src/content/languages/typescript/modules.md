---
title: "Modules"
description: "Organizing TypeScript code using ES6 import/export syntax"
---

## What are Modules?

In **TypeScript**, code is organized into **Modules**. A module is a file that contains its own scope. Variables, functions, and classes defined in a module are not visible outside the file unless you explicitly **export** them.

```typescript
// math.ts
export const PI = 3.14;

export function add(a: number, b: number): number {
    return a + b;
}
```

## Importing Code

To use code from another module, you use the **`import`** keyword.

```typescript
// main.ts
import { PI, add } from "./math";

console.log(add(PI, 10));
```

## Default Exports

Each module can have at most one **default export**. This is often used for the main class or function in a file.

```typescript
// Logger.ts
export default class Logger {
    log(msg: string) { console.log(msg); }
}

// main.ts
import MyLogger from "./Logger"; // You can name it anything!
```

## Namespaced Imports

If a module exports many things, you can import everything at once under a single name using the **`* as`** syntax.

```typescript
import * as MathUtils from "./math";
console.log(MathUtils.PI);
```

## Type-Only Imports

Wait! TypeScript allows you to import ONLY types. This is a great optimization because it ensures the import is completely removed when the code is converted to JavaScript.

```typescript
import type { User } from "./types";
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **export** | `export const x` | Make a value available |
| **import** | `import { x }` | Bring a value into scope |
| **default** | `export default x` | The "main" export of a file |
| **as** | `import { x as y }` | Renaming an import |
| **import type**| `import type { T }` | Optimized type-only import |
| **Best For** | Organizing large apps, reusable libraries |
| **Logic** | One file = One module |
| **Safety** | Prevents global namespace pollution |
| **Modern** | TS uses standard ES6 module syntax |
| **Standard** | Established and trusted worldwide for 10+ years |
| **Refactor** | Splitting large files into small, focused modules |
| **Dynamic** | `import("./mod").then(...)` (Lazy loading code!) |
| **Declaration**| `module.d.ts` (Defining modules for external JS libs) |
