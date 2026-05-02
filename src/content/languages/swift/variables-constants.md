---
title: "Variables & Constants"
description: "let vs var, type safety, and type inference in Swift"
---

## let vs. var

In **Swift**, you have a very clear distinction between values that can change and values that cannot.

1.  **`let`**: Declares a **Constant**. Once set, it can never be changed. **Always prefer `let` by default.**
2.  **`var`**: Declares a **Variable**. You can update its value later.

```swift
let pi = 3.14159
var score = 0
score += 10
```

Wait! If you try to change a `let` constant, the Swift compiler will throw an error before you even run your app.

## Type Safety and Inference

Swift is a **Type-Safe** language. This means the compiler ensures that you never pass a string where an integer is expected.

However, you rarely need to write the types yourself because Swift has excellent **Type Inference**.

```swift
let name = "Alpha" // Swift knows this is a String
let age: Int = 25  // You can also be explicit
```

## String Interpolation

Combining variables into strings is easy using the **`\()`** syntax.

```swift
let message = "Hello \(name), your score is \(score)"
```

## Naming Rules

Swift supports almost any character in variable names, including Unicode and even Emoji (though this is mostly for fun, not for professional code!).

```swift
let 🚀 = "To the moon!"
```

## Summary

| Term | Description |
| :--- | :--- |
| **let** | Immutable constant (Safe!) |
| **var** | Mutable variable |
| **Inference** | Compiler automatically determines the type |
| **Explicit** | `var x: Type` syntax |
| **Scope** | Variables are limited to the block `{ }` where they are defined |
| **Best For** | Predictable and error-free code |
| **Logic** | "Immutable by default" prevents accidental data changes |
| **Safety** | Compiler prevents type mismatches and uninitialized variables |
| **Modern** | Clean syntax with no semicolons required |
| **Standard** | Use `camelCase` for all variables and constants |
| **Identity** | Swift's strictness makes it one of the safest languages in the world |
