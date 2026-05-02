---
title: "Closures"
description: "Anonymous functions, trailing syntax, and shorthand arguments"
---

## What is a Closure?

**Closures** are self-contained blocks of functionality that can be passed around and used in your code. They are similar to "Lambdas" in other languages. In **Swift**, even functions are actually a special type of closure.

```swift
let greet = { (name: String) -> String in
    return "Hello, \(name)!"
}

print(greet("Alpha"))
```

## Trailing Closure Syntax

Wait! If a function's **last argument** is a closure, you can write it **outside** the parentheses. This makes code much cleaner and is the foundation of **SwiftUI**.

```swift
// Standard way
names.sorted(by: { $0 > $1 })

// Trailing closure way (Preferred!)
names.sorted { $0 > $1 }
```

## Shorthand Argument Names (`$0`, `$1`)

Swift automatically provides shorthand names for the arguments passed to a closure. `$0` is the first argument, `$1` the second, and so on.

```swift
let reversed = names.sorted { $0 > $1 }
```

## Capturing Values

Closures can "capture" and store references to variables and constants from the context in which they are defined. Swift handles all the memory management of these captured values automatically.

## Summary

| Term | Description |
| :--- | :--- |
| **{ }** | Syntax for a closure |
| **in** | Separates parameters/return type from the body |
| **$0, $1** | Shorthand for closure arguments |
| **Trailing** | Putting the closure after `()` if it's the last arg |
| **Escaping** | `@escaping` - Closure that outlives the function it was passed to |
| **Best For** | Callbacks, sorting, and UI layout (SwiftUI) |
| **Logic** | "Functions as values" |
| **Safety** | Strong type inference for closure parameters |
| **Modern** | Highly expressive and concise |
| **Standard** | Use trailing closure syntax whenever possible |
| **Identity** | Closures are Reference Types! |
| **Autoclosure**| Wrapping an expression in a closure automatically (Advanced) |
