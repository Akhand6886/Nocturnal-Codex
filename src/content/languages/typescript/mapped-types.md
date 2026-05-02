---
title: "Mapped Types"
description: "Creating new types by transforming properties of an existing type"
---

## What are Mapped Types?

**Mapped Types** allow you to create a new type based on another type. They use a syntax similar to a `for...in` loop in JavaScript to iterate over the keys of an existing type.

```typescript
type OnlyBools<T> = {
    [P in keyof T]: boolean;
};

interface Config { theme: string; debug: boolean; }
type ConfigBools = OnlyBools<Config>; // { theme: boolean; debug: boolean }
```

Wait! This is how **Utility Types** like `Partial` and `Readonly` are built under the hood.

## Mapping Modifiers

You can add or remove modifiers like `?` (optional) or `readonly` during the mapping process using `+` or `-`.

```typescript
// Removes 'readonly' from all properties
type CreateMutable<T> = {
    -readonly [P in keyof T]: T[P];
};

// Makes all properties optional and removes 'readonly'
type Flexible<T> = {
    -readonly [P in keyof T]?: T[P];
};
```

## Key Remapping (`as`)

Since TypeScript 4.1, you can re-map keys during the transformation using the **`as`** clause and **Template Literal Types**.

```typescript
type Getters<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface User { name: string; age: number; }
type UserGetters = Getters<User>; // { getName: () => string; getAge: () => number }
```

## Why use Mapped Types?

1.  **Safety**: Ensure that multiple types stay in sync with a single "Source of Truth."
2.  **Transformation**: Create complex versions of types (like Getters/Setters) automatically.
3.  **Generics**: Build powerful reusable utility types for your codebase.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **keyof** | `keyof T` | Getting a union of all keys in a type |
| **in** | `[P in K]` | Iterating through keys |
| **-readonly** | Modifier | Removing immutability |
| **+?** | Modifier | Adding optionality |
| **as** | Key Remapping | Changing the name of keys during mapping |
| **Capitalize** | Helper | Built-in type for changing case |
| **Source** | Single Truth | Change one interface, and all mapped types update |
| **Best For** | Store logic, API clients, form validation |
| **Logic** | "Functional programming for types" |
| **Modern** | The secret sauce behind most advanced TS libraries |
| **Safety** | Prevents forgetting to update related types manually |
| **Constraint**| Mapped types only work with fixed sets of keys |
