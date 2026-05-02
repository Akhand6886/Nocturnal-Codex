---
title: "Structs vs. Classes"
description: "Value types vs Reference types in the Swift language"
---

## Value Types vs. Reference Types

This is the most important architectural concept in **Swift**.

1.  **Structs (Value Types)**: When you copy a struct, you create a **brand new copy** of the data. Changes to the copy don't affect the original.
2.  **Classes (Reference Types)**: When you copy a class, you create a new **reference** to the **same** data in memory. Changes to one affect all others.

```swift
struct Point { var x: Int }
class User { var name: String; init(n: String) { name = n } }
```

## When to use which?

| Feature | Struct | Class |
| :--- | :--- | :--- |
| **Type** | Value Type | **Reference Type** |
| **Memory** | Stack (Fast) | **Heap (Slower)** |
| **Copying** | Copy data | **Copy reference** |
| **Inheritance**| No | **Yes** |
| **Mutability** | Based on `var` / `let` | **Can change internal data even if let** |

## Mutating Methods

Wait! In a struct, if you want to change one of its properties inside a method, you must mark that method as **`mutating`**.

```swift
struct Counter {
    var count = 0
    mutating func increment() {
        count += 1
    }
}
```

## The Swift Philosophy: "Structs First"

Apple recommends using **Structs** by default for almost everything. They are faster, safer, and easier to reason about because you don't have to worry about "hidden" changes from other parts of your code.

Only use **Classes** when you specifically need **Inheritance** or **Identity** (e.g., a Database connection that must be shared).

## Summary

| Term | Description |
| :--- | :--- |
| **Struct** | Value type (The default choice in Swift) |
| **Class** | Reference type (Use for shared identity) |
| **Memberwise** | Structs get a free constructor automatically |
| **Deinit** | Classes can run code right before they are destroyed |
| **Identity** | `===` - Checking if two variables point to the exact same object |
| **Best For** | Modeling data (Structs) or shared services (Classes) |
| **Logic** | Favor "Immutability" and "Values" |
| **Safety** | Structs prevent "Race Conditions" in multi-threaded code |
| **Modern** | SwiftUI is built entirely on Structs |
| **Standard** | Use `PascalCase` for both names |
| **Identity** | Structs are compared by value; Classes by memory address |
