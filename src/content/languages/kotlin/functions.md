---
title: "Functions"
description: "fun, default arguments, and named parameters in Kotlin"
---

## Defining Functions

In **Kotlin**, functions are declared using the **`fun`** keyword.

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

Wait! If a function only has a single expression, you can use the **Single-Expression** syntax to make it much shorter:

```kotlin
fun sum(a: Int, b: Int) = a + b
```

## Default Arguments

Kotlin allows you to provide default values for parameters. This dramatically reduces the need for "overloading" functions like you have to do in Java or C++.

```kotlin
fun greet(name: String, prefix: String = "Hello") {
    println("$prefix, $name!")
}

greet("Alpha") // Hello, Alpha!
```

## Named Arguments

When calling a function, you can name the arguments. This is especially useful for functions with many parameters, making the call site much clearer.

```kotlin
greet(prefix = "Hi", name = "Alpha")
```

## Unit (The void replacement)

If a function doesn't return anything useful, its return type is **`Unit`**. You don't have to specify it; the compiler adds it automatically.

## Top-Level Functions

Wait! In Kotlin, functions don't have to live inside a class. You can define them at the "top level" of a file. This is perfect for utility functions.

## Summary

| Term | Description |
| :--- | :--- |
| **fun** | Keyword to declare a function |
| **Unit** | Equivalent to `void` |
| **Nothing** | Function that never returns (throws exception or infinite loop) |
| **Single-expr**| `fun f() = expression` |
| **Default** | `param: T = value` |
| **Best For** | Breaking down logic and building reusable tools |
| **Logic** | "Functional-first" approach for better testability |
| **Safety** | Strong type checking for all parameters and return values |
| **Modern** | Inline functions and Lambdas (See Lambdas section) |
| **Standard** | Use `camelCase` for all function names |
| **Identity** | Functions are first-class citizens in Kotlin |
| **Local** | You can define a function inside another function! |
