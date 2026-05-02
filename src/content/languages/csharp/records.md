---
title: "Records"
description: "Immutability and value-based equality for data structures"
---

## What is a Record?

Introduced in **C# 9.0**, a **Record** is a special type of class or struct that provides built-in functionality for encapsulating data. Records are primarily designed for **Immutability** and **Value-based equality**.

```csharp
public record User(string Name, int Age);
```

Wait! With just one line, C# generates:
1.  A constructor.
2.  Properties for `Name` and `Age`.
3.  Value-based equality logic (if two records have the same data, they are equal).
4.  A clean `ToString()` method.

## Immutability by Default

Records often use **`init`** properties, which mean they can only be set during initialization and never changed again.

```csharp
var user = new User("Alpha", 25);
// user.Age = 26; // ERROR! Records are immutable.
```

## Non-Destructive Mutation (`with`)

Wait! If records are immutable, how do you "change" them? You use the **`with`** expression to create a **new copy** of the record with some modified values.

```csharp
var olderUser = user with { Age = 26 };
```

## Equality: Value vs. Reference

-   **Classes**: Two instances are equal only if they point to the same memory location.
-   **Records**: Two instances are equal if all their properties match.

```csharp
var u1 = new User("A", 1);
var u2 = new User("A", 1);
Console.WriteLine(u1 == u2); // TRUE for Records!
```

## Summary

| Feature | Description |
| :--- | :--- |
| **record** | Keyword to define a data-centric type |
| **init** | Properties that are read-only after creation |
| **with** | Creating a modified copy of an object |
| **Deconstruct**| Breaking a record apart into separate variables |
| **Positional** | Short syntax: `record Person(string Name)` |
| **Best For** | Data Transfer Objects (DTOs), API models, and Redux-like state |
| **Logic** | "Data is more important than behavior" |
| **Safety** | Prevents accidental state changes (Bugs) |
| **Modern** | The "Functional" way to handle data in C# |
| **Identity** | Based on content, not memory address |
| **Inheritance**| Records can inherit from other records |
| **Struct** | You can also define `record struct` for value-type records |
| **Refactor** | Replacing boilerplate classes with records reduces code by ~90% |
