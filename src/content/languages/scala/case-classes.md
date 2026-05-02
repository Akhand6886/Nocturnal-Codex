---
title: "Case Classes"
description: "Data-centric classes with automatic equality and pattern matching"
---

## What is a Case Class?

A **Case Class** is a special type of class in **Scala** designed to hold immutable data. By adding the `case` keyword, the compiler automatically generates a ton of useful boilerplate code for you.

```scala
case class User(name: String, age: Int)
```

Wait! With just one line, Scala gives you:
1.  **Immutability**: All parameters are `val` by default.
2.  **`equals` and `hashCode`**: Compares the data, not the memory address.
3.  **`toString`**: Pretty-printing of the object and its data.
4.  **`copy`**: Easily create a copy with some modified values.
5.  **Pattern Matching support**: Essential for functional logic.

## No `new` Keyword

You don't need the `new` keyword to create an instance of a case class.

```scala
val user = User("Alpha", 25)
```

## The `copy` Method

Wait! Because case classes are immutable, you "change" them by creating a new copy.

```scala
val olderUser = user.copy(age = 26)
```

## Why use Case Classes?

-   **Data Modeling**: Perfect for representing messages, API responses, or records.
-   **Security**: Since they are immutable, they are naturally thread-safe.
-   **Functional Programming**: They are the primary tool for **Pattern Matching** (see next section).

## Summary

| Term | Description |
| :--- | :--- |
| **case class** | Keyword for data-centric types |
| **copy** | Creating a modified clone |
| **val** | Parameters are immutable by default |
| **Equality** | Based on the values inside, not the memory address |
| **Best For** | Domain models, DTOs, and functional data structures |
| **Logic** | "Data is the focus" |
| **Safety** | Prevents accidental state changes and threading bugs |
| **Modern** | Replaces hundreds of lines of Java boilerplate with one line |
| **Standard** | Use `PascalCase` for case class names |
| **Identity** | The foundation of "Algebraic Data Types" in Scala |
