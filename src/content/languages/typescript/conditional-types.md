---
title: "Conditional Types"
description: "Mastering logic at the type level with extends and infer"
---

## What are Conditional Types?

Conditional types allow you to create types that depend on a condition. They follow the syntax: `SomeType extends OtherType ? TrueType : FalseType`. 

This is essentially an "if-statement" for your types, allowing for incredibly flexible and dynamic APIs.

## 1. Basic Usage

A common use case is creating a type that returns different types based on the input.

```typescript
type IsString<T> = T extends string ? "yes" : "no";

type T1 = IsString<string>;  // "yes"
type T2 = IsString<number>;  // "no"
```

## 2. Distributive Conditional Types

When conditional types act on a generic type that is a **union**, they "distribute" across that union.

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>; 
// Result: string[] | number[]
```

## 3. The `infer` Keyword

The `infer` keyword allows you to extract types from within other types. It can only be used in the `extends` clause of a conditional type.

### Example: Getting the Return Type of a Function
```typescript
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type T3 = MyReturnType<() => string>; // string
```

### Example: Extracting the Type of an Array Element
```typescript
type Flatten<T> = T extends Array<infer U> ? U : T;

type T4 = Flatten<string[]>; // string
type T5 = Flatten<number>;   // number
```

## 4. Real-World Use Case: API Responses

Conditional types are perfect for handling complex API responses where the shape depends on a status or input.

```typescript
interface SuccessResponse<T> { data: T; status: 'success' }
interface ErrorResponse { message: string; status: 'error' }

type ApiResponse<T> = T extends { id: number } 
  ? SuccessResponse<T> 
  : ErrorResponse;
```

## Summary Checklist
- [x] Syntax: `T extends U ? X : Y`.
- [x] Use `infer` to extract sub-types dynamically.
- [x] Understand distribution across unions.
- [x] Perfect for reducing boilerplate in generic logic.
- [x] Enables "Type-level programming" in TypeScript.
---
