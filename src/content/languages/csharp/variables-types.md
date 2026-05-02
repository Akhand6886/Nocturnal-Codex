---
title: "Variables & Types"
description: "Value types vs Reference types, var, and nullable types"
---

## Strong Statically Typed

In **C#**, every variable must have a type. The compiler uses this to ensure that you are using your data correctly and to optimize the generated code.

```csharp
int count = 42;
string name = "Alpha";
bool isReady = true;
```

## Value Types vs. Reference Types

Wait! This is the most important architectural concept in C#.

1.  **Value Types**: Stored on the **Stack**. They contain the actual data. (e.g., `int`, `double`, `bool`, `struct`).
2.  **Reference Types**: Stored on the **Heap**. The variable contains a *reference* (address) to the actual data. (e.g., `string`, `class`, `interface`).

## Implicit Typing (`var`)

You can use the **`var`** keyword to let the compiler infer the type for you. This is highly recommended for readability, especially with complex types.

```csharp
var users = new List<string>(); // Compiler knows this is a List<string>
```

Wait! `var` is still **strongly typed**. Once the type is inferred, it cannot be changed.

## Nullable Types

By default, value types (like `int`) cannot be `null`. If you need them to be optional, you add a **`?`** to the type name.

```csharp
int? age = null; // Valid!
```

Modern C# also introduced **Nullable Reference Types**, which help prevent the "billion-dollar mistake" of null pointer exceptions.

## Common Data Types

| Category | Types | Description |
| :--- | :--- | :--- |
| **Integers** | `int`, `long`, `short`, `byte` | `int` is 32-bit (Default) |
| **Floating** | `double`, `float`, `decimal` | `decimal` is best for money! |
| **Text** | `string`, `char` | `string` is immutable |
| **Boolean** | `bool` | `true` or `false` |
| **Object** | `object` | The base type for everything |

## Summary

| Term | Description |
| :--- | :--- |
| **var** | Implicitly typed local variable |
| **Stack** | Fast, temporary memory for value types |
| **Heap** | Dynamic memory for reference types |
| **const** | Immutable value evaluated at compile-time |
| **readonly** | Immutable value evaluated at runtime |
| **Nullable** | Types that can hold `null` (e.g., `int?`) |
| **Cast** | Explicitly converting types (`(int)myDouble`) |
| **Logic** | Strong types catch errors before you even run the code |
| **Safety** | Type safety prevents accidental data corruption |
| **Modern** | `nint` and `nuint` for platform-specific integers |
| **Precision**| Use `decimal` for financial calculations! |
| **Standard** | Use `PascalCase` for properties and `camelCase` for variables |
