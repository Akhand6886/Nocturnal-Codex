---
title: "Objects & Interfaces"
description: "Defining optional properties, readonly, and extensible interfaces"
---

## What is an Interface?

In **TypeScript**, an **Interface** is a "contract" that defines the shape of an object. It's a way to name a complex group of related types so you can reuse them throughout your application.

```typescript
// Define the shape of a User!
interface User {
  name: string;
  age: number;
}

// Implement it!
const u1: User = { 
    name: "Alpha", 
    age: 25 
};
```

## Comparisons: Type Alias vs. Interface

Wait! Should you use `type` or `interface`?

| Feature | Interface | Type Alias (`type`) |
| :--- | :--- | :--- |
| **Logic** | Best for Objects and Classes. | Best for Unions (`|`) and Intersections (`&`). |
| **Extensible** | **Can be merged** (Re-open anytime!). | Cannot be merged. |
| **Syntax** | `interface User { ... }` | `type User = { ... };` |

> **Best Practice**: Use **`interface`** by default for all object shapes, as it leads to better error messages and is more extensible.

## Optional & Readonly Properties

-   **`?`**: Marks a property as optional (it doesn't have to exist).
-   **`readonly`**: Marks a property as read-only (it cannot be changed after it's set).

```typescript
interface User {
  readonly id: number; // Cannot be changed!
  name: string;
  age?: number; // Optional! (Doesn't have to be provided)
}

const u1: User = { id: 1, name: "Alpha" };
// u1.id = 2; // ERROR: Cannot change a readonly property!
```

## Extending Interfaces

You can build new interfaces by "stealing" properties from an existing one using the **`extends`** keyword.

```typescript
interface Admin extends User {
  role: "super-admin" | "moderator";
}

const boss: Admin = { 
    id: 1, 
    name: "Alpha", 
    role: "super-admin" 
};
```

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **Interface** | `interface x {}` | Describe object shape |
| **Optional** | `prop?: type` | Property might be missing |
| **Readonly** | `readonly x` | Cannot be modified after set |
| **Extends** | `interface y extends x`| Re-use properties from x |
| **Best For** | Describing object shapes, APIs, state management |
| **Merged** | `interface A` can be defined twice! (They combine!) |
| **Type Safe** | TS ensures you don't miss a required property! |
| **Autocomplete**| Get perfect suggestions when typing object data! |
| **Intersection**| `type A & B` (The non-extending way to merge!) |
| **Standard** | The preferred way to write modern React/Next.js code |
| **Library** | Most JS libraries provide interfaces for their data! |
| **Class** | Classes can `implement` interfaces! (See Classes section) |
| **Constraint**| Use interfaces to "contract" your data requirements! |
| **Index Sign.**| `[key: string]: any` (Allow ANY additional properties!) |
| **Method** | `greet(msg: string): void` (Define logic in an interface!) |
| **Recursive** | An interface can refer to itself (e.g., for Trees!) |
| **Hybrid** | Interfaces can describe FUNCTIONS and OBJECTS at once! |
| **Excess** | TS checks for "hidden" properties you didn't define! |
| **Tooling** | Built-in support for VS Code and other editors |
| **Refactor** | Rename a property, and it updates across all objects! |
| **Documentation**| Interfaces act like live documentation for your data! |
| **Safety** | Prevents "undefined" errors by catching missing keys! |
