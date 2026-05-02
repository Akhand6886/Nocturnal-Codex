---
title: "Declaration Files"
description: ".d.ts files, DefinitelyTyped, and describing JS libraries"
---

## What are Declaration Files?

**Declaration Files** (ending in **`.d.ts`**) are files that contain only type information and no implementation code. Their purpose is to tell **TypeScript** about the shape of code that already exists in plain JavaScript files.

```typescript
// math.d.ts
export declare function add(a: number, b: number): number;
```

## DefinitelyTyped (`@types`)

Wait! What if you use a popular library like **React** or **Lodash** that was written in plain JavaScript? You can't just import it because TS won't know the types.

The community maintains a massive repository called **DefinitelyTyped**. You can install types for almost any library using npm:

```bash
npm install --save-dev @types/react
```

## The `declare` Keyword

You use the `declare` keyword to tell TypeScript: "This variable/function exists somewhere else (like in a global script tag), so don't worry about where it came from."

```typescript
declare const __VERSION__: string;
```

## Ambient Namespaces

You can use `.d.ts` files to define global types that are available everywhere in your project without needing an `import` statement.

```typescript
// global.d.ts
interface Window {
    myCustomProperty: string;
}
```

## Creating Your Own declarations

If you are publishing a library written in TypeScript, the compiler can automatically generate declaration files for you by setting `"declaration": true` in your `tsconfig.json`.

## Summary

| Term | Description |
| :--- | :--- |
| **.d.ts** | The extension for declaration files |
| **@types** | Namespace for community-contributed types |
| **declare** | Telling TS that something exists elsewhere |
| **Ambient** | Types available globally without imports |
| **Module** | Declaring the shape of an entire external module |
| **Best For** | Legacy JS projects, external libraries, global variables |
| **Logic** | "Types without implementation" |
| **Safety** | Ensures you use external JS libs correctly |
| **DefinitelyT.**| The central hub for TS type definitions |
| **Versioning**| Match `@types/v` with the library `v` |
| **Publishing**| Include `.d.ts` files in your npm package |
| **Skip Check**| `skipLibCheck: true` (Speed up compilation) |
