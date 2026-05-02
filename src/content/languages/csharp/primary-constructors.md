---
title: "Primary Constructors"
description: "Reducing boilerplate in classes and structs (C# 12+)"
---

## What is a Primary Constructor?

Introduced in **C# 12**, **Primary Constructors** allow you to declare a constructor and its parameters directly in the class or struct definition. This removes the need for boilerplate constructor bodies and private fields.

```csharp
// Before C# 12
public class User {
    private readonly string _name;
    public User(string name) {
        _name = name;
    }
}

// With C# 12 Primary Constructors
public class User(string name) {
    public string Name => name;
}
```

## How they Work

Wait! The parameters of a primary constructor are in scope for the **entire class**. You can use them to initialize properties, fields, or even use them directly in methods.

```csharp
public class BankAccount(string owner, decimal initialBalance) {
    public string Owner => owner;
    public decimal Balance { get; private set; } = initialBalance;

    public void Deposit(decimal amount) => Balance += amount;
}
```

## Why use them?

1.  **Readability**: Makes your class definitions much shorter and cleaner.
2.  **Productivity**: You don't have to manually map parameters to private fields.
3.  **Dependency Injection**: They are perfect for injecting services into controllers or repositories.

## Summary

| Term | Description |
| :--- | :--- |
| **Primary** | The constructor defined on the class header |
| **Scope** | Parameters are available throughout the class body |
| **Capture** | The compiler automatically stores parameters if needed |
| **Boilerplate**| Dramatically reduced |
| **Best For** | Data-centric classes, DI services, and internal helpers |
| **Logic** | "One place for definition and initialization" |
| **Safety** | Still fully type-safe and checked at compile-time |
| **Modern** | Inspired by Scala, Kotlin, and C# Records |
| **Standard** | Now the recommended way to handle DI in ASP.NET Core |
| **Limitation** | Unlike Records, these don't generate properties automatically |
