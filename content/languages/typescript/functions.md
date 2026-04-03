---
title: "Functions"
description: "Parameter types, return types, choice of arrow vs function"
---

## Functional TypeScript

In **TypeScript**, a **function** is the fundamental way to call logic. TypeScript adds **Type Safety** to JavaScript functions by allowing you to define the exact types of the **Parameters** and the **Return Type**.

```typescript
// Explicitly define input as string, output as void (nothing)!
function greet(name: string): void {
  console.log("Hello, " + name);
}

greet("Alpha");
// greet(123); // ERROR: 123 is not a string!
```

## Parameter Annotations

Functions can have mandatory, optional, or default parameters.

1.  **Mandatory**: Default.
2.  **Optional (`?`)**: Might be missing (Value is `undefined`).
3.  **Default (`=`)**: A value to use if the argument is missing.

```typescript
// 'role' is optional; 'active' has a default!
function createUser(name: string, role?: string, active = true) {
  console.log(`User: ${name}, Role: ${role}, Status: ${active}`);
}
```

## Arrow Functions (Modern ES6)

Arrow functions are the standard for modern React and Next.js development. Their syntax is cleaner and they automatically handle the `this` keyword correctly.

```typescript
// Constant with arrow logic!
const multiply = (a: number, b: number): number => {
    return a * b;
};

// Even shorter (Implicit return!)
const square = (x: number): number => x * x;
```

## Function Overloading

In TypeScript, you can provide multiple versions of the **same** function, as long as they have the same implementation. This is useful for functions that can handle 2+ different types of data.

```typescript
// Type signatures!
function process(data: string): void;
function process(data: number): void;

// Implementation (ONE function only!)
function process(data: any): void {
  console.log("Processed: " + data);
}

process("Alpha");
process(123);
```

## Summary

| Type | Examples | Description |
| :--- | :--- | :--- |
| **Parameter** | `(x: string)` | Input variable |
| **Return** | `(): number` | Data sent back to caller |
| **Optional** | `(x?: string)` | Parameter can be missing |
| **Default** | `(x = 10)` | Value if parameter is missing |
| **Rest** | `(...args: number[])`| Indefinite number of inputs |
| **Void** | `void` | Used for functions that return NOTHING |
| **Best For** | Logic, callbacks, events, and reusability |
| **Arrow** | Modern, concise syntax (TS default!) |
| **Signature** | The name + inputs (Defines the function's type!) |
| **Callback** | Passing a function AS a parameter |
| **Type Safe** | TS catches "Wrong data type" errors! |
| **Overload** | One function, multiple type signatures |
| **Async** | Use `Promise<T>` for return types of async functions! |
| **Nested** | Defining a function inside another function |
| **Closure** | Functions "remember" their parent variables |
| **Recursive** | A function that calls itself (Use carefully!) |
| **Implicit** | TypeScript often guesses the return type automatically! |
| **Interface** | You can describe a function with an interface! |
| **Generic** | Functions that work with any type (See Generics section!) |
| **Hoisting** | Normal functions are "hoisted" to the top; Arrows ARE NOT! |
| **Bound** | Arrows automatically "bind" the `this` keyword |
| **Pure** | Functions that always return the same result for same input |
| **Security** | Prevents calling a function with too MANY or too FEW arguments |
| **Tooling** | Perfect autocomplete for function calls in VS Code |
| **Documentation**| Types acting like live documentation for your logic |
