---
title: "Methods"
description: "Parameters, return types, and expression-bodied members"
---

## Defining Methods

A **Method** is a block of code that contains a series of statements. In **C#**, methods must be defined inside a class or a struct.

```csharp
public int Add(int x, int y) {
    return x + y;
}
```

## Parameters and Arguments

-   **Required Parameters**: Standard inputs.
-   **Optional Parameters**: Have a default value.
-   **Named Arguments**: Allow you to specify which parameter you are passing a value for.

```csharp
public void Greet(string name, string prefix = "Hello") {
    Console.WriteLine($"{prefix}, {name}");
}

Greet("Alpha"); // Hello, Alpha
Greet("Alpha", prefix: "Hi"); // Hi, Alpha
```

## Return Types

If a method doesn't return anything, you use the **`void`** keyword. If it does return a value, you must specify the type.

Wait! In modern C#, if a method is just a single expression, you can use the **Expression-Bodied** syntax (`=>`) to make it much more concise.

```csharp
public int Multiply(int x, int y) => x * y;
```

## The `params` Keyword

The `params` keyword allows a method to accept a variable number of arguments of the same type.

```csharp
public int Sum(params int[] numbers) {
    int total = 0;
    foreach (var n in numbers) total += n;
    return total;
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **void** | Method that returns nothing |
| **return** | Exiting a method and providing a value |
| **static** | Method belongs to the class itself, not an instance |
| **override** | Changing a method inherited from a base class |
| **async** | Method that can run in the background (See Async section) |
| **Best For** | Reusability, logic organization, and abstraction |
| **Logic** | Small, single-purpose methods are easier to test and maintain |
| **Safety** | Type checking on all inputs and outputs |
| **Modern** | Local functions (methods inside methods) for better scoping |
| **Standard** | Use `PascalCase` for all method names in C# |
| **Identity** | A method's "Signature" is its name + parameter types |
| **Extension**| Adding methods to existing types (Advanced) |
