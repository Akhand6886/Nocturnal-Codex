---
title: "tsconfig.json"
description: "Compiler options, strict mode, target, and lib"
---

## What is tsconfig.json?

The **`tsconfig.json`** file is the brain of your **TypeScript** project. It specifies the root files and the compiler options required to compile the project.

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "strict": true
  }
}
```

## Essential Options

Wait! These are the settings you will change most often:

1.  **`target`**: The version of JavaScript the compiler output will be (e.g., `ES5`, `ES2022`, `ESNext`).
2.  **`module`**: The module system used (e.g., `CommonJS`, `ESNext`, `NodeNext`).
3.  **`lib`**: The libraries available at runtime (e.g., `["DOM", "ESNext"]` if you are building for a browser).
4.  **`outDir`**: Where the compiled `.js` files will be placed.

## The Power of `strict: true`

Turning on **`strict`** mode enables a suite of type-checking behaviors that result in much safer code. It is highly recommended for all new projects. It includes:
-   **`noImplicitAny`**: Errors on variables that don't have an explicit type and can't be inferred.
-   **`strictNullChecks`**: Ensures you handle `null` and `undefined` explicitly.

## Includes and Excludes

You can control exactly which files are part of your project.

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

## Project References

For large monorepos, you can use **Project References** to split a single large project into smaller, independent sub-projects that compile much faster.

## Summary

| Option | Description |
| :--- | :--- |
| **target** | The JavaScript version output |
| **module** | The module loading system |
| **strict** | Enables all strict type-checking options |
| **outDir** | The output folder for JS files |
| **rootDir** | The source folder for TS files |
| **lib** | Built-in API definitions (DOM, ESNext, etc.) |
| **paths** | Custom path aliases (e.g., `@/components/*`) |
| **jsx** | How JSX is handled (React, Preserve, etc.) |
| **skipLibCheck**| Skip type checking of declaration files (.d.ts) |
| **incremental** | Faster rebuilds by saving project graph |
| **Base** | Use `@tsconfig/node18` for standard presets |
| **Tooling** | `tsc --init` creates a default config file |
| **Safety** | `strict: true` is the gold standard for TS safety |
