---
title: "Pattern Matching"
description: "The switch on steroids: matching types, values, and case classes"
---

## What is Pattern Matching?

**Pattern Matching** is one of **Scala**'s most powerful features. It allows you to test a value against a specific "pattern" and extract data from it if it matches. It is much more expressive and safer than a traditional `switch` statement.

```scala
val result = x match {
  case 1 => "One"
  case 2 => "Two"
  case _ => "Something else" // The default case (wildcard)
}
```

## Matching Case Classes

Wait! This is where pattern matching truly shines. You can "deconstruct" a case class to get its internal values.

```scala
user match {
  case User("Alpha", age) => println(s"Found Alpha, who is $age years old")
  case User(name, 25)    => println(s"Found a 25-year-old named $name")
  case _                 => println("Unknown user")
}
```

## Matching Types

You can also use pattern matching to check the type of a variable, which is much cleaner than using `instanceof` in Java.

```scala
obj match {
  case s: String => println(s"String of length ${s.length}")
  case i: Int    => println(s"Integer with value $i")
  case _         => println("Unknown type")
}
```

## Guards (`if`)

You can add a condition (a "guard") to a case to make it even more specific.

```scala
case n: Int if n > 100 => "A large number"
```

## Summary

| Term | Description |
| :--- | :--- |
| **match** | The starting keyword for pattern matching |
| **case** | An individual pattern to match against |
| **_** | The wildcard pattern (matches anything) |
| **Deconstruct**| Extracting variables from a case class |
| **Exhaustive** | The compiler will warn you if you forget a case |
| **Best For** | Complex branching, data deconstruction, and error handling |
| **Logic** | "Describe the shape of the data you want" |
| **Safety** | Catch missing cases at compile-time |
| **Modern** | Inspired by functional languages like Haskell and ML |
| **Standard** | Use pattern matching instead of `if/else` for complex logic |
| **Identity** | The most "Scala-ish" way to handle control flow |
