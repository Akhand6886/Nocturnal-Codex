---
title: "Functions"
description: "def, anonymous functions, and high-order functions in Scala"
---

## Defining Functions

In **Scala**, you define a function (actually a "method") using the **`def`** keyword.

```scala
def add(x: Int, y: Int): Int = {
  x + y
}
```

Wait! Notice the **`=`** sign. In Scala, a function is like a value. If the body is a single expression, you can omit the braces:

```scala
def add(x: Int, y: Int) = x + y
```

## Anonymous Functions (Lambdas)

Functions are first-class citizens in Scala. You can assign them to variables or pass them to other functions.

```scala
val list = List(1, 2, 3)
list.map((n: Int) => n * 2)
```

Wait! You can use the **Underscore (`_`)** as a shorthand for parameters in simple functions.
`list.map(_ * 2)` is the same as `list.map(n => n * 2)`.

## High-Order Functions

A function that takes another function as a parameter is called a **High-Order Function**. This is a key part of functional programming.

```scala
def runTask(action: () => Unit): Unit = {
  action()
}
```

## Currying

Scala supports **Currying**, which allows you to transform a function with multiple arguments into a chain of functions, each with a single argument.

```scala
def add(x: Int)(y: Int) = x + y
val addFive = add(5) _
println(addFive(10)) // 15
```

## Summary

| Term | Description |
| :--- | :--- |
| **def** | Keyword to declare a method |
| **=>** | The "Rocket" syntax for anonymous functions |
| **_** | Shorthand for anonymous function parameters |
| **Unit** | Return type for functions that return nothing |
| **Nested** | You can define functions inside functions! |
| **Best For** | Reusability and functional data processing |
| **Logic** | "Functions are values" |
| **Safety** | Strong type checking for inputs and outputs |
| **Modern** | Concise syntax and powerful functional features |
| **Standard** | Use `camelCase` for function names |
| **Identity** | Functions in Scala can have multiple parameter lists |
