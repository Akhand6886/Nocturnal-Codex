---
title: "Introduction to TypeScript"
description: "JavaScript with syntax for types: The bridge to scalable, safe, and robust development"
---

## What is TypeScript?

**TypeScript** is a powerful programming language developed and maintained by **Microsoft**. It is a **superset of JavaScript**, which means any valid JavaScript code is also valid TypeScript code. 

Wait! What does it "add" to JavaScript? The main feature of TypeScript is its **Static Type System**. While JavaScript is "Dynamic" (you can change a variable from a number to a string easily!), TypeScript enforces strict rules about what data is allowed.

```typescript
// Type annotation!
let message: string = "Welcome to the Codex";

// message = 10; // ERROR: 10 is not a string!
```

## How It Works: Transpilation

Web browsers cannot "read" TypeScript directly. Instead, your code must go through a process called **Transpilation** (using the `tsc` compiler), which converts your TypeScript into plain, standard JavaScript.

1.  **Code**: You write `.ts` or `.tsx` files.
2.  **Compile**: The TypeScript compiler checks for errors and types.
3.  **Ship**: Standard `.js` code is sent to the browser.
4.  **Runtime**: At this point, the "types" are gone! They exist ONLY during development to find bugs.

## Key Features

-   **Type Safety**: Catching 50% of bugs before your code even runs.
-   **IntelliSense**: High-quality autocomplete in your editor (VS Code, etc.).
-   **ESNext Support**: Use the latest JavaScript features even in older browsers.
-   **Interfaces & Types**: Define complex data structures with ease.
-   **Refactoring**: Rename a variable in one place, and it updates everywhere safely!

## Why Use TypeScript?

1.  **Scale**: Essential for large teams and massive codebases (like VS Code, React, or Slack).
2.  **Documentation**: The types themselves describe how the code should work, making it easier for new developers to understand.
3.  **Modern**: Most modern web frameworks (Next.js, Vite, Deno) treat TypeScript as their primary language.

## Summary

| Feature | Description |
| :--- | :--- |
| **Creator** | Anders Hejlsberg (Microsoft, 2012) |
| **Superset** | All JavaScript is valid TypeScript! |
| **Compiler** | `tsc` (The TypeScript Compiler) |
| **Safety** | Strong static typing and error checking |
| **Best For** | Large apps, web development, Team collaboration |
| **Modern Era**| Dominates modern web development (React, Next.js) |
| **Intellisense**| Better autocomplete and developer experience |
| **TSConfig** | The `tsconfig.json` file controls all project settings |
| **Library** | Huge ecosystem of "Declaration Files" (`@types/`) |
| **Any** | The "Escape Hatch" (DANGER: Disables type checking!) |
| **Interface** | Defines a contract for your data (See Objects/Interfaces) |
| **Type** | Combine and compose types in unique ways |
| **Generic** | Reusable, type-safe logic (See Generics section!) |
| **Standards** | Always follows the latest ECMAScript (JS) standards |
| **Tooling** | Built-in support for Prettier, ESLint, and modern IDEs |
| **Speed** | Initial setup is slow, but development is MUCH faster! |
| **Main Use** | Frontend (React/Vue/Angular) and Backend (Node.js) |
| **Strict** | Use `strict: true` for the highest possible safety! |
| **Infer** | Often you don't even have to write types! (Type Inference!) |
| **Decorators**| Modern meta-programming for classes and methods |
| **Module** | Uses Standard ES Modules (`import/export`) |
| **Enums** | Adds a way to define a set of named constants |
| **Community** | Massive support and countless tutorials and tools |
