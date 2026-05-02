---
title: "Lambdas"
description: "High-order functions, function types, and it syntax"
---

## What is a Lambda?

A **Lambda** (or Lambda Expression) is a small, anonymous function that can be passed around as a value. They are defined inside curly braces `{ }`.

```kotlin
val sum = { a: Int, b: Int -> a + b }
println(sum(10, 20))
```

## High-Order Functions

A **High-Order Function** is a function that takes another function as a parameter or returns a function.

```kotlin
fun operate(a: Int, b: Int, action: (Int, Int) -> Int): Int {
    return action(a, b)
}

val result = operate(10, 5, { x, y -> x * y })
```

Wait! If the **last parameter** of a function is a lambda, you can put it **outside** the parentheses. This is a very common Kotlin pattern!

```kotlin
val result = operate(10, 5) { x, y -> 
    x * y 
}
```

## The `it` Shorthand

If a lambda has only one parameter, you can omit the name and use **`it`**.

```kotlin
val numbers = listOf(1, 2, 3)
numbers.filter { it > 1 }
```

## Closures

Lambdas in Kotlin can access and modify variables from the outer scope (the scope in which they were defined).

## Summary

| Term | Description |
| :--- | :--- |
| **{ }** | The syntax for a lambda expression |
| **->** | Separates parameters from the function body |
| **it** | Shorthand for a single parameter |
| **Trailing** | Putting the lambda outside `()` if it's the last arg |
| **type** | `(Int) -> String` (The type signature of a function) |
| **Best For** | Callbacks, listeners, and collection processing |
| **Logic** | "Functions are values" |
| **Safety** | Type-safe function parameters |
| **Modern** | Highly functional style of programming |
| **Standard** | Use trailing lambdas for better readability |
| **Identity** | Lambdas are compiled into anonymous classes (or inlined!) |
| **Inline** | `inline` keyword to remove the performance cost of lambdas |
