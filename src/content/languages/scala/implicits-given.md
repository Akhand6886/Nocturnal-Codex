---
title: "Implicits & Given"
description: "Contextual abstractions and type classes in Scala 2 and 3"
---

## What is Context?

Sometimes a function needs a value (like a database connection or a configuration) that is common to many functions in your app. Instead of passing it manually to every single call, **Scala** allows you to define it as a "Contextual Value."

## Scala 2: `implicit`

In Scala 2, you use the `implicit` keyword. The compiler looks for a value of the required type in the current scope.

```scala
implicit val ec: ExecutionContext = ...

def runTask()(implicit ec: ExecutionContext) = {
  // Uses the implicit ec automatically!
}
```

## Scala 3: `given` and `using`

Wait! Scala 3 made this much clearer by splitting "Implicits" into two distinct concepts: **`given`** (to provide a value) and **`using`** (to request a value).

```scala
// Provide the value
given ec: ExecutionContext = ...

// Use the value
def runTask()(using ec: ExecutionContext) = {
  // ...
}
```

## Type Classes

The most powerful use of this feature is creating **Type Classes**. A type class allows you to add new behavior to existing types (like adding a `toJson` method to an `Int`) without changing their original source code.

```scala
trait JsonWriter[T] {
  def write(v: T): String
}

given JsonWriter[Int] with {
  def write(v: Int) = v.toString
}
```

## Why use them?

1.  **Reduce Boilerplate**: Stop passing the same config through 10 layers of functions.
2.  **Extensibility**: Add behavior to types you don't own.
3.  **Clean Code**: Keep your function signatures focused on their main task.

## Summary

| Term | Description |
| :--- | :--- |
| **implicit** | Scala 2 keyword for contextual values |
| **given** | Scala 3 keyword to provide a contextual value |
| **using** | Scala 3 keyword to request a contextual value |
| **Context** | The environment/values available to a function |
| **Type Class**| A pattern for ad-hoc polymorphism |
| **Best For** | Configuration, Serialization, Database contexts |
| **Logic** | "Let the compiler fill in the blanks" |
| **Safety** | Compiler errors if no matching value is found |
| **Modern** | Scala 3's `given/using` is much easier to learn than Scala 2's `implicit` |
| **Standard** | Use sparingly! Too many implicits can make code hard to follow |
| **Identity** | The feature that makes Scala frameworks like Akka or Spark work |
