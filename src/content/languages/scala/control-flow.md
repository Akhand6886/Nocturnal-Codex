---
title: "Control Flow"
description: "if, while, and the powerful 'for' comprehensions in Scala"
---

## `if` as an Expression

In **Scala**, `if` is not just a statement—it's an **expression**. This means it returns a value.

```scala
val result = if (age >= 18) "Adult" else "Minor"
```

Because `if` returns a value, there is no need for a ternary operator (`? :`) in Scala.

## `for` Comprehensions

Wait! The `for` loop in Scala is much more than a loop. It's called a **For Comprehension**. It can iterate, filter, and even transform data into a new collection using the **`yield`** keyword.

```scala
val numbers = List(1, 2, 3, 4, 5)

// Filter and transform in one go!
val evensDoubled = for {
  n <- numbers
  if n % 2 == 0
} yield n * 2 // Result: List(4, 8)
```

## `while` Loops

Scala has standard `while` and `do while` loops, but they are rarely used in professional Scala code. We almost always prefer recursion or `for` comprehensions.

## Match Expressions

Wait! While we have `if`, most complex branching in Scala is done using **Pattern Matching** (the `match` keyword). See the Pattern Matching section for more details.

```scala
x match {
  case 1 => "One"
  case _ => "Something else"
}
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / else** | Returns a value (Expression) |
| **for** | Iterating through collections |
| **yield** | Turning a for loop into a generator |
| **while** | Standard loop (Use sparingly) |
| **match** | The "Switch" replacement (See Pattern Matching) |
| **Logic** | Expression-oriented: everything should return a value |
| **Safety** | Compiler ensures `match` blocks are exhaustive |
| **Modern** | For-comprehensions are a hallmark of Scala's power |
| **Standard** | Use `for` for side-effects and `for/yield` for data transformation |
| **Identity** | Control flow in Scala is built to be "Functional" |
