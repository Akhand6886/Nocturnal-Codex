---
title: "Options & Either"
description: "Handling nothingness and errors without exceptions"
---

## The Problem with `null`

In many languages, a method returns `null` if it can't find a value. This leads to the infamous `NullPointerException`. In **Scala**, we use **`Option`** to represent a value that might or might not be there.

```scala
def findUser(id: Int): Option[User] = {
  if (id == 1) Some(User("Alpha")) else None
}
```

## Working with `Option`

Wait! You don't "check" an Option with an `if` statement. Instead, you use **Pattern Matching** or **Functional Methods**.

```scala
val user = findUser(1)

// Method 1: Pattern Match
user match {
  case Some(u) => println(u.name)
  case None    => println("Not found")
}

// Method 2: Functional
val name = user.map(_.name).getOrElse("Guest")
```

## `Either` (Success or Error)

While `Option` represents "Value or Nothing," **`Either`** represents "Result A or Result B." By convention, **`Right`** is used for success and **`Left`** for errors (because "Right" is "correct").

```scala
def divide(a: Int, b: Int): Either[String, Int] = {
  if (b == 0) Left("Division by zero!")
  else Right(a / b)
}
```

## Why use them?

1.  **Safety**: You are forced to handle the "None" or "Error" case at compile-time.
2.  **Explicit**: The function signature tells you exactly what could go wrong.
3.  **No Exceptions**: Using `Either` is much faster and cleaner than throwing and catching exceptions for "expected" errors.

## Summary

| Term | Description |
| :--- | :--- |
| **Option** | Represents `Some(value)` or `None` |
| **Either** | Represents `Right(success)` or `Left(error)` |
| **getOrElse** | Provide a default value if missing |
| **map** | Run logic only if a value exists |
| **Best For** | Database lookups, API calls, and validation |
| **Logic** | "Make the possibility of failure explicit in the type" |
| **Safety** | Eliminates NullPointerExceptions |
| **Modern** | The standard way to handle optionality in modern functional languages |
| **Standard** | `None` is an object; `Some` is a case class |
| **Identity** | Options and Eithers are "Monads" (they can be chained!) |
