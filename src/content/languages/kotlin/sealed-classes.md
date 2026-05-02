---
title: "Sealed Classes"
description: "Restricted class hierarchies and exhaustive when expressions"
---

## What is a Sealed Class?

A **Sealed Class** is used to represent restricted class hierarchies. It allows you to define a set of possible types, and the compiler ensures that you have handled **all** of them. Think of it as an "Enum on steroids."

```kotlin
sealed class Result
data class Success(val data: String) : Result()
data class Error(val message: String) : Result()
object Loading : Result()
```

## Exhaustive `when`

Wait! The biggest benefit of a sealed class is when you use it in a `when` expression. Because the hierarchy is "sealed," the compiler knows all possible cases. If you miss one, your code won't compile!

```kotlin
fun handleResult(result: Result) = when (result) {
    is Success -> println("Got: ${result.data}")
    is Error -> println("Error: ${result.message}")
    Loading -> println("Loading...")
    // No 'else' branch needed!
}
```

## Sealed vs. Enum

-   **Enum**: All "instances" of an enum are the same type and have the same properties.
-   **Sealed Class**: Each "branch" can be its own class (Data class, Object, etc.) with its own specific data.

## Why use Sealed Classes?

1.  **State Management**: Perfect for representing UI states (Loading, Success, Error).
2.  **Safety**: Prevents bugs caused by forgetting to handle a specific case.
3.  **Readability**: Makes complex branching logic much clearer.

## Summary

| Term | Description |
| :--- | :--- |
| **sealed** | Keyword to restrict inheritance |
| **when** | Must be exhaustive for sealed types |
| **object** | Used for sealed branches that don't need data |
| **Hierarchy** | All subclasses must be in the same package/file |
| **Best For** | State machines, API results, UI events |
| **Logic** | "Closed" types for predictable behavior |
| **Safety** | Catch missing cases at compile-time, not runtime |
| **Modern** | Highly popular in Android and MVI/MVVM architectures |
| **Standard** | Preferred over Enums when branches need different data |
| **Identity** | The compiler tracks every possible child of the class |
