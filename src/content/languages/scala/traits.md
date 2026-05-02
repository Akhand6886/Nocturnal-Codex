---
title: "Traits"
description: "Mixins, abstract contracts, and multiple inheritance in Scala"
---

## What is a Trait?

A **Trait** in **Scala** is similar to a Java interface but much more powerful. It can contain both abstract methods and implemented methods. Traits are used to share interfaces and fields between classes.

```scala
trait Logger {
  def log(msg: String): Unit = println(s"[LOG]: $msg")
}

class User extends Logger {
  def save(): Unit = log("Saving user...")
}
```

## Multiple Mixins

Wait! Unlike classes (which only support single inheritance), a class can mix in **multiple traits** using the `with` keyword.

```scala
class Admin extends User with Logger with Authenticator
```

## Abstract vs. Concrete

-   **Abstract Method**: Only the name and type are defined.
-   **Concrete Method**: Has a full implementation.

Traits are perfect for "Stackable Modifications," where multiple traits modify the behavior of a method in a specific order.

## Why use Traits?

1.  **Modularity**: Break down complex behaviors into small, reusable components.
2.  **Flexible Design**: Add functionality to a class without forcing it into a specific inheritance tree.
3.  **Composition**: Favor composition over deep inheritance.

## Summary

| Term | Description |
| :--- | :--- |
| **trait** | Keyword to define a trait |
| **extends** | Using the first trait |
| **with** | Adding additional traits |
| **override** | Required when overriding a concrete method |
| **Mixing** | The process of adding a trait to a class |
| **Best For** | Horizontal code reuse and defining contracts |
| **Logic** | "What an object can DO" |
| **Safety** | Compiler ensures all abstract methods are implemented |
| **Modern** | Scala 3 traits can also have constructor parameters |
| **Standard** | Use `PascalCase` for all trait names |
| **Identity** | Traits cannot be instantiated on their own |
