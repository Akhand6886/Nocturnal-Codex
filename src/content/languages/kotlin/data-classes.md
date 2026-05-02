---
title: "Data Classes"
description: "Automatically generating toString, equals, and copy in Kotlin"
---

## What is a Data Class?

A **Data Class** is a class whose main purpose is to hold data. In Java, this usually requires writing dozens of lines of boilerplate (`getters`, `setters`, `toString`, `equals`, `hashCode`). In Kotlin, you just add the **`data`** keyword.

```kotlin
data class User(val name: String, val age: Int)
```

Wait! With just one line, Kotlin gives you:
1.  **`equals()` / `hashCode()`**: Compares the data, not the memory address.
2.  **`toString()`**: Returns `User(name=Alpha, age=25)`.
3.  **`copy()`**: Creates a copy with some modified values.
4.  **`componentN()`**: Allows for destructuring.

## The `copy()` Function

Wait! Because data classes are often used as immutable models, the `copy()` function is incredibly useful for "changing" data safely.

```kotlin
val user = User("Alpha", 25)
val olderUser = user.copy(age = 26) // Name stays "Alpha"
```

## Destructuring Declarations

You can "unpack" a data class directly into variables.

```kotlin
val (name, age) = user
println("$name is $age")
```

## Requirements

To be a data class:
-   The primary constructor must have at least one parameter.
-   All primary constructor parameters must be marked as `val` or `var`.
-   Data classes cannot be `abstract`, `open`, or `sealed`.

## Summary

| Term | Description |
| :--- | :--- |
| **data** | Keyword that enables automatic method generation |
| **copy** | Creating a modified clone of an object |
| **equals** | Value-based equality check |
| **destruct** | `val (x, y) = obj` syntax |
| **Best For** | Models, DTOs (Data Transfer Objects), and App State |
| **Logic** | "Data is the focus" |
| **Safety** | Promotes immutability and predictable data handling |
| **Modern** | Replaces heavy boilerplate with a single keyword |
| **Standard** | Use `data class` for any class that just holds information |
| **Identity** | Based on the values inside the object |
| **Efficiency**| Optimized by the compiler to be as fast as manual code |
