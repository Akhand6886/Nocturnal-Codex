---
title: "Values & Variables"
description: "val vs var and the importance of immutability in Scala"
---

## val vs. var

In **Scala**, you define values and variables using keywords that clearly indicate whether they can be changed.

1.  **`val`**: An immutable value. Once set, it can never be changed. **Always prefer `val` by default.**
2.  **`var`**: A mutable variable. It can be reassigned later.

```scala
val name = "Alpha" // Cannot be changed
var age = 25       // Can be changed
age = 26
```

Wait! Scala encourages the use of `val` as much as possible. This "Immutable by Default" philosophy makes your code safer and much easier to parallelize.

## Type Inference

Scala has a very smart compiler. You usually don't need to specify the type yourself.

```scala
val count = 42 // Scala knows this is an Int
```

If you want to be explicit (e.g., for public APIs), you can add the type after a colon:

```scala
val total: Double = 100.0
```

## Lazy Values

Wait! You can mark a value as **`lazy`**. This means it won't be calculated until the very first time it is accessed. This is great for expensive operations or database connections.

```scala
lazy val bigData = loadFromDatabase()
```

## Common Types

| Type | Description |
| :--- | :--- |
| **Int** | 32-bit signed integer |
| **Long** | 64-bit signed integer |
| **Double** | 64-bit floating point |
| **Boolean** | `true` or `false` |
| **String** | Sequence of characters |
| **Unit** | Equivalent to `void` |

## Summary

| Term | Description |
| :--- | :--- |
| **val** | Immutable value (The standard) |
| **var** | Mutable variable (Use sparingly) |
| **lazy val** | Value computed only on first use |
| **Any** | The base type for all types in Scala |
| **AnyVal** | Base type for value types (Int, Double, etc.) |
| **AnyRef** | Base type for reference types (Objects) |
| **Best For** | Predictable and bug-free code |
| **Logic** | Favor immutability to prevent state-related bugs |
| **Safety** | Static typing with powerful inference |
| **Modern** | Concise syntax compared to traditional Java |
| **Standard** | Use `camelCase` for all values and variables |
| **Identity** | Everything in Scala is an object |
