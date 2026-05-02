---
title: "Data Types"
description: "Integers, Doubles, Booleans, and the powerful Tuple type"
---

## The Standard Types

**Swift** provides a familiar set of basic data types.

| Type | Description |
| :--- | :--- |
| **Int** | Whole numbers (64-bit on most platforms) |
| **Double** | 64-bit floating point numbers (Default for decimals) |
| **Float** | 32-bit floating point numbers |
| **Bool** | `true` or `false` |
| **String** | A collection of characters |
| **Character** | A single Unicode character |

## Number Formatting

Swift allows you to use underscores in numbers to make them more readable. This is great for large values.

```swift
let oneMillion = 1_000_000
```

## Tuples

Wait! **Tuples** are a unique feature in Swift. They allow you to group multiple values into a single compound value. The values within a tuple can be of any type.

```swift
let httpError = (404, "Not Found")

// You can also name the elements
let user = (name: "Alpha", age: 25)
print(user.name)
```

Tuples are perfect for returning multiple values from a function without having to define a whole new class or struct.

## Type Aliases

You can give an existing type a new, more descriptive name using the **`typealias`** keyword.

```swift
typealias AudioSample = UInt16
```

## Summary

| Term | Description |
| :--- | :--- |
| **Int** | The default integer type |
| **Double** | The default floating-point type |
| **Bool** | Booleans (must be `true` or `false`) |
| **Tuple** | Grouped values: `(1, "A")` |
| **Typealias** | Giving a type a custom name |
| **Overflow** | Swift prevents numeric overflows by default (Crash vs Corruption) |
| **Best For** | Representing different shapes of data safely |
| **Logic** | Strong types ensure data is used correctly |
| **Safety** | No implicit conversion (You must cast `Int` to `Double` manually) |
| **Modern** | Tuples and Type Inference make code very readable |
| **Standard** | Use `Int` even if your data fits in a smaller type |
| **Identity** | Data types in Swift are actually `structs`! |
