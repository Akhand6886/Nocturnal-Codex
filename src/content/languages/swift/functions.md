---
title: "Functions"
description: "Defining functions, argument labels, and return types in Swift"
---

## Defining Functions

In **Swift**, functions are defined using the **`func`** keyword.

```swift
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

let message = greet(name: "Alpha")
```

## Argument Labels

Wait! This is a unique feature of Swift. Every parameter has an **Argument Label** (used when calling the function) and a **Parameter Name** (used inside the function).

```swift
func greet(person name: String, from town: String) {
    print("Hello \(name)! Glad you could visit from \(town).")
}

greet(person: "Alpha", from: "Codex City")
```

If you don't want a label when calling, use an underscore `_`.

```swift
func add(_ a: Int, _ b: Int) -> Int { a + b }
let sum = add(10, 20)
```

## Default Parameter Values

You can give parameters a default value, making them optional when calling the function.

```swift
func play(music: String = "Jazz") { ... }
```

## Variadic Parameters

A function can accept a variable number of arguments of the same type using `...`.

```swift
func sum(_ numbers: Int...) -> Int {
    numbers.reduce(0, +)
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **func** | Keyword to declare a function |
| **->** | Separator for the return type |
| **_** | Used to omit an argument label |
| **external** | The label seen by the caller |
| **internal** | The name seen by the code inside the function |
| **Best For** | Reusability and self-documenting code |
| **Logic** | "Functions should read like a sentence when called" |
| **Safety** | Strong type checking for all inputs and outputs |
| **Modern** | Omit `return` for single-line functions |
| **Standard** | Use `camelCase` for all function names |
| **Identity** | Swift's argument labels make its APIs the most readable in the industry |
