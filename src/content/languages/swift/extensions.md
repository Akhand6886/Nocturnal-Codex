---
title: "Extensions"
description: "Adding functionality to existing types without inheritance"
---

## What are Extensions?

**Extensions** allow you to add new functionality to an existing class, struct, enum, or protocol type. This includes types you don't own, like `String`, `Int`, or `Array` from the Swift Standard Library.

```swift
extension Int {
    func squared() -> Int {
        return self * self
    }
}

let result = 5.squared() // 25
```

## Why use Extensions?

1.  **Organization**: Break down a large class into smaller, logical chunks.
2.  **Retroactive Modeling**: Make a type conform to a protocol even if you can't change its original source code.
3.  **Convenience**: Add helpful "Utility" methods to core types.

## Protocol Extensions

Wait! As seen in the Protocols section, extending a protocol allows you to provide **default logic** for all types that implement that protocol.

```swift
extension Collection {
    func printCount() {
        print("I have \(count) items.")
    }
}
```

## Computed Properties

Extensions can add **Computed Properties**, but they **cannot** add stored properties (they can't change the memory size of the original object).

```swift
extension Double {
    var km: Double { return self / 1000.0 }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **extension** | The keyword to add functionality |
| **Computed** | A property that calculates a value on the fly |
| **Protocol** | Extending a protocol to provide default logic |
| **Retroactive**| Adding methods to types you didn't write |
| **Best For** | Code organization and adding "helper" methods |
| **Logic** | "Extend behavior, don't change state" |
| **Safety** | Extensions are compile-time checked and safe |
| **Modern** | Essential for keeping SwiftUI View files clean |
| **Standard** | Create separate files like `String+Extensions.swift` |
| **Identity** | Extensions belong to the type, not a specific instance |
| **Initializers**| Extensions can add new "convenience" constructors |
