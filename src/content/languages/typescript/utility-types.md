---
title: "Utility Types"
description: "Partial, Pick, Omit, Record, and other built-in helpers"
---

## What are Utility Types?

**TypeScript** provides several global utility types to help with common type transformations. These allow you to take an existing type and create a new, modified version of it without rewriting the entire definition.

## 1. `Partial<T>` and `Required<T>`

-   **`Partial<T>`**: Makes all properties of a type **optional**.
-   **`Required<T>`**: Makes all properties **mandatory** (opposite of Partial).

```typescript
interface User { id: number; name: string; age?: number; }

type UpdateUser = Partial<User>; // { id?, name?, age? }
```

## 2. `Pick<T, K>` and `Omit<T, K>`

-   **`Pick<T, K>`**: Creates a type by selecting a set of properties `K` from `T`.
-   **`Omit<T, K>`**: Creates a type by removing a set of properties `K` from `T`.

```typescript
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutId = Omit<User, "id">;
```

## 3. `Record<K, T>`

Creates an object type whose property keys are `K` and whose property values are `T`.

```typescript
const users: Record<number, User> = {
    1: { id: 1, name: "Alpha" }
};
```

## 4. `Readonly<T>`

Makes all properties of a type **immutable**.

```typescript
const config: Readonly<{ theme: string }> = { theme: "dark" };
// config.theme = "light"; // ERROR!
```

## Summary

| Type | Transformation | Usage |
| :--- | :--- | :--- |
| **Partial** | All properties `?` | PATCH requests, configs |
| **Required** | Remove all `?` | Validation logic |
| **Pick** | Choose specific keys | UI components, narrow models |
| **Omit** | Remove specific keys | Security (hide passwords) |
| **Record** | Map of Keys to Values | Caches, lookup tables |
| **Readonly** | All properties `readonly`| Constants, shared state |
| **Exclude** | Remove from Union | `Exclude<"a" | "b", "a">` -> `"b"` |
| **Extract** | Keep from Union | `Extract<"a" | "b", "a">` -> `"a"` |
| **NonNullable**| Remove `null` / `undefined` | Sanitization |
| **ReturnType** | Get function output type| API response handling |
| **Parameters** | Get function input types| Higher-order functions |
| **Logic** | "Don't repeat yourself" - transform existing types! |
| **Standard** | Built into TypeScript (No imports needed) |
