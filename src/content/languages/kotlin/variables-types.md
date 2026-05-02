---
title: "Variables & Types"
description: "val vs var, type inference, and primitive types in Kotlin"
---

## val vs. var

In **Kotlin**, you have two ways to declare a variable. Choosing the right one is the first step to writing clean code.

1.  **`val`**: Read-only (Immutable). You can assign a value only once. **Always prefer `val` by default.**
2.  **`var`**: Mutable. You can change the value later.

```kotlin
val name = "Alpha" // Cannot be changed
var age = 25       // Can be changed
age = 26
```

## Type Inference

Wait! You noticed I didn't specify the type above. Kotlin has excellent **Type Inference**. It knows `name` is a `String` because I assigned a string to it.

If you want to be explicit, you can add the type after a colon:

```kotlin
val count: Int = 42
```

## Everything is an Object

In Kotlin, there are no "primitive" types like `int` in Java. Everything is an object (like `Int`, `Double`, `Boolean`). The compiler automatically optimizes these into primitives whenever possible for performance.

## String Templates

Combining variables with strings is incredibly easy in Kotlin using the **`$`** symbol.

```kotlin
val message = "Hello, $name! You are $age years old."
```

## Common Types

| Type | Description |
| :--- | :--- |
| **Int** | 32-bit signed integer |
| **Long** | 64-bit signed integer |
| **Double** | 64-bit floating point |
| **Boolean** | `true` or `false` |
| **String** | Sequence of characters |
| **Any** | The base type for all Kotlin classes |

## Summary

| Term | Description |
| :--- | :--- |
| **val** | Immutable variable (Preferred!) |
| **var** | Mutable variable |
| **Any** | The root of the Kotlin type hierarchy |
| **Unit** | A type that has only one value (used like `void`) |
| **Nothing** | A type that has no values (used for functions that never return) |
| **Best For** | Writing safe and predictable code |
| **Logic** | "Immutable by default" prevents accidental bugs |
| **Safety** | Static typing with powerful inference |
| **Modern** | Clean syntax without unnecessary semicolons |
| **Standard** | Use `camelCase` for all variables |
| **Identity** | Kotlin compiles to Java bytecode or Native machine code |
| **Cast** | Use `as` for explicit casting or `as?` for safe casting |
