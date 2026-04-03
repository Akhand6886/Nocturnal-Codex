---
title: "Type Annotations"
description: "Explicit types for strings, numbers, booleans, and arrays"
---

## What are Type Annotations?

In **TypeScript**, a **Type Annotation** is the syntax you use to tell the compiler exactly what "type" of data a variable is allowed to hold. You add it after the variable name using a colon (`:`).

```typescript
// Explicit type!
let name: string = "Alpha";
let count: number = 10;
let isReady: boolean = true;
```

## Primitives: String, Number, Boolean

These correspond to JavaScript's primitive types. Unlike in Java, types in TypeScript are **lowercase**.

| Type | Examples | Description |
| :--- | :--- | :--- |
| **string** | `"Hi"`, `'A'`, `\`` | Text |
| **number** | `10`, `-1.5`, `0xff` | ALL numbers (int, float, hex) |
| **boolean** | `true`, `false` | Logic |

```typescript
let age: number = 25;
let username: string = "admin";
let isActive: boolean = false;
```

## Array Annotations

Wait! There are two different ways to annotate an array in TypeScript. Both do the exactly same thing; it's a matter of preference.

1.  **Type[]**: The most common and concise way.
2.  **Array<Type>**: The generic syntax (Uses the "angle-bracket" style).

```typescript
// Any list of numbers!
let scores: number[] = [80, 90, 75];

// A generic list of strings!
let names: Array<string> = ["Alpha", "Beta"];
```

## Function Annotations

You should also annotate the **Parameters** and the **Return Type** of your functions.

```typescript
// Function takes a string; returns nothing (void)!
function logMessage(msg: string): void {
  console.log("Log: " + msg);
}

// Function takes two numbers; returns a number!
const add = (a: number, b: number): number => {
  return a + b;
};
```

## Summary

| Type | Examples | Description |
| :--- | :--- | :--- |
| **string** | `"Hello!"` | Textual data |
| **number** | `42, 3.14` | Any numerical value |
| **boolean** | `true, false` | Logical true or false |
| **number[]** | `[1, 2, 3]` | A list of numbers |
| **void** | `function(): void`| Returns nothing! |
| **any** | `let x: any = 1;` | The "Escape Hatch" (AVOID THIS!) |
| **Best For** | Variable declaration, function inputs/outputs |
| **Explicit** | Manually specifying the type (`: type`) |
| **Implicit** | TypeScript guesses the type! (See Type Inference!) |
| **Annotate** | Use types to "document" your code while writing it |
| **Safe** | Prevents assigning the wrong data to a variable |
| **Clean** | Your IDE will provide better suggestions with types |
| **Modern** | The standard way to write safe JavaScript |
| **Null** | Types can also be `null` or `undefined` (If allowed!) |
| **Never** | `function(): never` (For code that NEVER returns!) |
| **Object** | You can also annotate objects! (See Objects/Interfaces) |
| **Tuples** | `[number, string]` (An array with fixed types and size!) |
| **Inference** | TypeScript is very smart; usually it knows the type! |
| **Compiler** | `tsc` checks these annotations before building |
| **Runtime** | Annotations are REMOVED when your code is transpiled to JS |
| **Identity** | An object never "forgets" its real type internally |
| **Multiple** | Use "Union Types" to allow 2+ types (`string | number`) |
| **BigInt** | `let x: bigint = 100n;` (For massive numbers!) |
| **Symbol** | `let x: symbol = Symbol();` (Unique identifiers!) |
| **Unknown** | A safer alternative to `any` (Requires type checking!) |
| **ReadOnly** | `readonly number[]` (A list that CANNOT be modified!) |
