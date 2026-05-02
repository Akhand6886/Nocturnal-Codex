---
title: "Protocols"
description: "Interface-based programming and the power of Protocol Extensions"
---

## What is a Protocol?

A **Protocol** defines a blueprint of methods, properties, and other requirements that suit a particular task. Classes, Structs, and Enums can all **adopt** a protocol to provide an implementation.

```swift
protocol Togglable {
    mutating func toggle()
}

struct LightSwitch: Togglable {
    var isOn = false
    mutating func toggle() { isOn.toggle() }
}
```

Wait! In Swift, we focus on **Protocol-Oriented Programming**. This means we design our systems around what objects *do* (protocols) rather than what they *are* (inheritance).

## Protocol Extensions

Wait! This is a game-changer. You can provide a **default implementation** for a protocol's methods using an extension. This allows you to add functionality to any type that conforms to that protocol automatically.

```swift
extension Togglable {
    func describe() {
        print("This item can be toggled.")
    }
}
```

## Protocol as Type

You can use a protocol as a type, allowing you to store a collection of different objects that all conform to the same protocol.

```swift
let items: [Togglable] = [LightSwitch(), DoorLock()]
```

## Summary

| Term | Description |
| :--- | :--- |
| **protocol** | The keyword to define a blueprint |
| **conforms** | When a type implements a protocol's requirements |
| **any** | `any Protocol` - A type-erased box for a protocol |
| **some** | `some Protocol` - An opaque type (Used heavily in SwiftUI) |
| **Delegation** | A common pattern where a protocol is used to communicate between objects |
| **Best For** | Decoupling code and creating flexible, reusable components |
| **Logic** | "Design the interface first" |
| **Safety** | Compiler ensures that all requirements are met |
| **Modern** | The "Swift way" of building large systems |
| **Standard** | Use protocols like `Identifiable` or `Equatable` from the std lib |
| **Identity** | Protocols can also specify required properties (`get`, `set`) |
| **Inherit** | Protocols can inherit from other protocols |
