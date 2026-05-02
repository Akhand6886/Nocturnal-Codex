---
title: "Result Builders"
description: "Creating domain-specific languages (DSLs) in Swift"
---

## What is a Result Builder?

A **Result Builder** is a feature in **Swift** that allows you to create your own "mini-languages" (DSLs). This is the technology that makes **SwiftUI**'s clean, declarative syntax possible.

It allows you to list items one after another without commas or `return` statements, and the builder automatically combines them into a single result.

```swift
// This is what makes this syntax work!
VStack {
    Text("Hello")
    Text("World")
}
```

## How they Work

A Result Builder is a struct marked with the **`@resultBuilder`** attribute. It must implement a static method called `buildBlock`.

```swift
@resultBuilder
struct StringBuilder {
    static func buildBlock(_ parts: String...) -> String {
        parts.joined(separator: " ")
    }
}
```

## Using a Result Builder

You can apply your builder to a function or a property to enable the DSL syntax.

```swift
@StringBuilder
func makeSentence() -> String {
    "Hello"
    "Nocturnal"
    "Codex"
}

print(makeSentence()) // "Hello Nocturnal Codex"
```

Wait! Result builders also support logic like `if/else` and `for` loops inside the DSL body, provided you implement the corresponding `buildOptional` or `buildEither` methods.

## Summary

| Term | Description |
| :--- | :--- |
| **@resultBuilder**| Attribute to define a builder |
| **buildBlock** | The core method that combines the parts |
| **DSL** | Domain-Specific Language |
| **Opaque** | Builders often return opaque types (`some View`) |
| **Best For** | UI layouts, HTML generation, or complex configurations |
| **Logic** | "Structure code as a list of components" |
| **Safety** | Fully type-checked by the Swift compiler |
| **Modern** | Introduced in Swift 5.4; essential for SwiftUI |
| **Standard** | Use them sparingly; only for truly declarative tasks |
| **Identity** | Known as "Function Builders" in earlier Swift versions |
| **Magic** | They make code feel like a configuration file instead of logic |
