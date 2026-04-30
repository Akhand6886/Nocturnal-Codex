---
title: "Union & Intersection Types"
description: "Combining types with | and & for complex data modeling"
---

## What are Union Types (`|`)?

In **TypeScript**, a **Union Type** is a way to tell the compiler that a variable can be one of several different types. This is incredibly powerful for handling data that might change, like an ID that could be a `string` OR a `number`.

```typescript
// ID can be string OR number!
const userId: string | number = 10;

// userId = true; // ERROR: true is NOT string or number!
```

## What are Intersection Types (`&`)?

An **Intersection Type** allows you to combine multiple types into **ONE** final type. The resulting object must have **all** the properties of **every** type in the intersection. This is a common, flexible alternative to using `interface extends`.

```typescript
type Name = { name: string };
type Age = { age: number };

// Must have BOTH!
type Person = Name & Age;

const me: Person = { 
    name: "Alpha", 
    age: 25 
};
```

## Comparisons: Union (`|`) vs. Intersection (`&`)

Wait! How do you remember which one is which?

| Feature | Union (`|`) | Intersection (`&`) |
| :--- | :--- | :--- |
| **Logic** | "OR": One of these. | "AND": ALL of these. |
| **Common Use** | API status codes, IDs, colors. | Merging small, reusable types. |

## Practical Example: Discriminated Unions

This is the most powerful use of unions. You distinguish between several "objects" by looking at a shared "type" property.

```typescript
interface Success {
  type: "success";
  data: string;
}

interface Failure {
  type: "error";
  message: string;
}

type Response = Success | Failure;

function handle(resp: Response) {
  if (resp.type === "success") {
    // TS knows this is a Success object!
    console.log(resp.data);
  }
}
```

## Summary

| Type | Syntax | Purpose |
| :--- | :--- | :--- |
| **Union** | `string | number` | One of these types |
| **Literal Union**| `"dark" | "light"` | Specific allowed values |
| **Intersection**| `TypeA & TypeB` | Must satisfy ALL types |
| **Best For** | Flexible APIs, complex state, merging data |
| **Safety** | TS ensures you handle each case! (See Type Guards!) |
| **Mixed** | Combine multiple unions/intersections! |
| **Refactor** | Convert separate variables into one clean union! |
| **Modern** | The hallmark of a modern, flexible TS project |
| **Interface** | Use `interface extends` for object hierarchies |
| **Alias** | Use `type` aliases (`type X = ...`) for unions |
| **Narrow** | TS "narrows" the type as your code gets specific! |
| **Equality** | Use `===` to distinguish between union members! |
| **Nullable** | `string | null` (A value that can be missing!) |
| **Optional** | `prop?: string` is secretly `string | undefined`! |
| **Logic** | The power of modeling data with "sum" and "product" types |
| **Security** | Prevents accessing properties that aren't common to all union types |
| **Standard** | Established and trusted worldwide for 10+ years |
| **Exhaustive** | TS can check if you've handled ALL cases of a union (See Switch!) |
| **Tooling** | Perfect autocomplete in VS Code for literal values! |
| **Clean** | Your code reads like logical documentation |
| **Generic** | Unions and Intersections can also be generic! |
| **Overlap** | Be careful with overlapping property names in intersections! |
