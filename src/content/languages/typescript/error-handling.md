---
title: "Error Handling"
description: "try/catch, unknown, never, and functional error patterns"
---

## Standard Error Handling

**TypeScript** uses the same `try/catch` mechanism as JavaScript. However, since TypeScript 4.0+, the error caught in a `catch` block is typed as **`unknown`** by default for safety.

```typescript
try {
    throw new Error("Oops!");
} catch (err: unknown) {
    if (err instanceof Error) {
        console.log(err.message); // Safe access!
    }
}
```

Wait! Why `unknown`? Because in JavaScript, you can throw **anything** (a string, a number, or even an object), so the compiler can't be sure it's an `Error` object.

## The `never` Type

The **`never`** type represents values that **never occur**. It’s used in functions that always throw an error or contain infinite loops.

```typescript
function fail(message: string): never {
    throw new Error(message);
}
```

## Exhaustiveness Checking

You can use `never` to ensure that you have handled all possible cases in a union (e.g., in a `switch` statement).

```typescript
type Shape = "circle" | "square";

function area(shape: Shape) {
    switch (shape) {
        case "circle": return 1;
        case "square": return 2;
        default:
            const _exhaustive: never = shape; // ERROR if you add "triangle" to Shape!
            return _exhaustive;
    }
}
```

## Functional Patterns (Result Types)

Many developers prefer to treat errors as values (similar to Rust or Go) rather than using exceptions.

```typescript
type Result<T, E> = { success: true; data: T } | { success: false; error: E };

function getUser(): Result<User, string> {
    if (found) return { success: true, data: user };
    return { success: false, error: "Not found" };
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **try/catch** | The standard way to handle exceptions |
| **unknown** | The default type for caught errors (Safe!) |
| **never** | A type for code that should be unreachable |
| **Error** | The built-in JS class for error objects |
| **Throwing** | You can throw ANY value in JS/TS |
| **Exhaustive** | Using `never` to ensure all cases are handled |
| **Result** | Pattern for returning errors as data |
| **Safety** | Prevents "undefined" property access on errors |
| **Best For** | Robust, crash-resistant applications |
| **Logic** | Catching is for expected failures; Panic/Error is for bugs |
| **Modern** | TS provides the best tools for catching errors early |
| **Identity** | An error should ideally always be an instance of `Error` |
