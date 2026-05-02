---
title: "Scope Functions"
description: "let, run, with, apply, and also explained"
---

## What are Scope Functions?

**Scope Functions** allow you to execute a block of code within the context of an object. They make your code more concise and readable by providing a temporary scope for that object.

There are five main scope functions: **`let`**, **`run`**, **`with`**, **`apply`**, and **`also`**.

## How to Choose?

Wait! These functions are very similar. The main difference is whether they use `this` or `it` to refer to the object, and what they return.

| Function | Reference | Return Value | Common Use Case |
| :--- | :--- | :--- | :--- |
| **let** | `it` | Result of block | Null-checks and transformations |
| **apply** | `this` | The Object itself | Object configuration (builders) |
| **also** | `it` | The Object itself | Side effects (logging) |
| **run** | `this` | Result of block | Computation and initialization |
| **with** | `this` | Result of block | Grouping calls on an object |

## 1. `let` (Null Safety)
Most commonly used to perform operations on a nullable object.

```kotlin
name?.let {
    println("Length is ${it.length}")
}
```

## 2. `apply` (Configuration)
Used to configure an object's properties and return the object.

```kotlin
val adam = Person().apply {
    name = "Adam"
    age = 32
}
```

## 3. `also` (Side Effects)
Used when you want to do something with an object without changing it (like logging).

```kotlin
val list = mutableListOf(1, 2, 3).also {
    println("Adding items to $it")
}
```

## Summary

| Function | Best Use Case |
| :--- | :--- |
| **let** | Safe calls, local variables |
| **apply** | Setup and builders |
| **also** | Extra actions (Log/Print) |
| **run** | Logic + Return |
| **with** | Calling many methods on one object |
| **Logic** | "Scoped operations" reduce repetitive variable names |
| **Safety** | `let` is the standard way to handle nullable types |
| **Modern** | Hallmark feature of Kotlin's fluent style |
| **Standard** | Don't over-nest scope functions; it hurts readability |
| **Identity** | They are all "High-Order Functions" |
