---
title: "Generics"
description: "Type-safe functions and classes with <T> and constraints"
---

## What are TypeScript Generics?

In **TypeScript**, **Generics** are a way to write generic, reusable code that works correctly with any data type, while still maintaining high-level **Type Safety**. This is essential for building flexible libraries, state managers, and data collections (like a `List` or a `Result`).

```typescript
// Generic Type Name: <T> (Standard!)
function identity<T>(value: T): T {
  return value;
}

// Any type can work!
let num = identity<number>(10);
let str = identity<string>("Alpha");
```

## How It Works: Type Parameters (`<T>`)

You can create your own "generic" functions and classes using a placeholder type, usually called **`T`** (for Type).

```typescript
class Box<T> {
  private content: T;

  constructor(content: T) {
    this.content = content;
  }

  get(): T { return this.content; }
}

// Inferred as Box<number>!
const intBox = new Box(100);
```

## Comparisons: The Two Essential Points

Wait! TypeScript is smart. You rarely have to provide the `<Type>` manually.

-   **Explicit**: `identity<string>("Hi")`
-   **Implicit**: `identity("Hi")` (TS "infers" the type automatically!)

## Generic Constraints (`extends`)

What if you want a method that only works with things that have a `.length` property? Use the **`extends`** keyword to safely "limit" what types are allowed.

```typescript
interface HasLength {
  length: number;
}

// T MUST have a length property!
function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("Alpha"); // OK (String has length!)
logLength([1, 2]); // OK (Array has length!)
// logLength(123); // ERROR: number does NOT have length!
```

## Summary

| Type | Examples | Description |
| :--- | :--- | :--- |
| **Generic** | `<T>` | Placeholder for ANY type |
| **Constraint** | `<T extends X>` | Limit which types are allowed |
| **Class** | `class Box<T>` | Class that works with any type |
| **Method** | `function f<T>()` | Run logic on any type |
| **Best For** | Reusable logic, collections, type-safe APIs |
| **Infer** | Often you don't even have to write types! (Type Inference!) |
| **Safe** | Impossible to use the "wrong" data type with a generic! |
| **Clean** | Your code reads like logical documentation |
| **Generic T.**| Use `T`, `U`, `V` for many parameters! |
| **Standard** | Established and trusted worldwide for 10+ years |
| **React** | Standard way to write Props and State in React + TS |
| **Library** | Most JS libraries provide generics for their data! |
| **Constraint**| Use `extends` to "contract" your generic requirements! |
| **Default** | `<T = string>` (Set a default type!) |
| **Multiple** | `<T, U>` (Combine two or more types!) |
| **Logic** | Code once; use for many different types! |
| **Identity** | An object never "forgets" its real type internally |
| **Refactor** | Rename a property, and it updates across all instances! |
| **Tooling** | Perfect autocomplete for generic calls in VS Code |
| **Interface** | You can also describe a generic with an interface! |
| **Array** | `Array<T>` is a built-in generic type! |
| **Promise** | `Promise<T>` (Describe what a task will return!) |
| **Search** | `find<T>()` (Search logic that returns the correct type!) |
| **KeyOf** | `<T, K extends keyof T>` (Accessing object keys safely!) |
