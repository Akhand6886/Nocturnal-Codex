---
title: "Pattern Matching"
description: "Type checking, property matching, and logical patterns"
---

## What is Pattern Matching?

**Pattern Matching** is a powerful feature in **C#** that allows you to test values against a specific shape or type and "extract" information from them if they match. It makes code much more readable than a series of `if/else` and `is/as` statements.

## 1. Type Patterns

The simplest form checks if a variable is of a certain type and assigns it to a new variable in one go.

```csharp
if (shape is Circle c) {
    Console.WriteLine($"Radius: {c.Radius}");
}
```

## 2. Property Patterns

You can check the specific properties of an object within the pattern.

```csharp
if (user is { Age: >= 18, Status: "Active" }) {
    Console.WriteLine("Authorized");
}
```

## 3. Switch Expressions

Switch expressions are the primary place where pattern matching shines.

```csharp
string message = obj switch {
    int i when i > 100 => "Large number",
    string s => $"You said: {s}",
    null => "Empty object",
    _ => "Something else"
};
```

## 4. Logical Patterns (`and`, `or`, `not`)

Wait! You can combine patterns using logical keywords for extremely expressive checks.

```csharp
if (input is not (null or "")) {
    // Input has content!
}
```

## Summary

| Pattern | Syntax | Description |
| :--- | :--- | :--- |
| **Declaration** | `obj is Type t` | Check type and cast |
| **Constant** | `x is 42` | Check for a specific value |
| **Property** | `{ Prop: val }` | Check internal properties |
| **Relational** | `age is >= 18` | Check ranges |
| **Logical** | `and`, `or`, `not` | Combine multiple patterns |
| **Var** | `is var x` | Match anything and assign to x |
| **Best For** | Validation, branching logic, working with complex unions |
| **Logic** | "Describe the data you are looking for" |
| **Safety** | Compiler ensures you don't access properties of the wrong type |
| **Modern** | Replaces complex `if` nests and `is/as` boilerplate |
| **Identity** | Pattern matching is optimized by the compiler to be fast |
| **Discard** | `_` matches anything but we don't care about the value |
