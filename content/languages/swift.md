---
id: "swift"
name: "Swift"
slug: "swift"
description: "Apple's modern language for iOS, macOS, and beyond — safe, fast, and expressive."
iconName: "swift"
year: 2014
creator: "Chris Lattner (Apple)"
paradigm: ["Object-Oriented", "Functional", "Protocol-Oriented"]
useCases: ["iOS Development", "macOS Development", "Server-Side", "System Scripting"]
website: "https://swift.org/"
category: "Mobile"
featured: false
difficulty: "Intermediate"
topics:
  - section: "Basics"
    items:
      - title: "Introduction to Swift"
        description: "Swift's safety features, Xcode setup, and Playgrounds"
      - title: "Variables & Constants"
        description: "let vs var, type inference, and type annotations"
      - title: "Data Types"
        description: "Strings, Int, Double, Bool, tuples, and Any/AnyObject"
      - title: "Control Flow"
        description: "if/else, guard, switch (pattern matching), for-in, while"
      - title: "Optionals"
        description: "Optional binding, nil coalescing, forced unwrapping, and optional chaining"
  - section: "Functions & Closures"
    items:
      - title: "Functions"
        description: "External/internal names, default values, inout, and throwing functions"
      - title: "Closures"
        description: "Trailing closures, capturing values, @escaping, and shorthand syntax"
      - title: "Enums"
        description: "Associated values, raw values, CaseIterable, and indirect enums"
  - section: "OOP & Protocols"
    items:
      - title: "Structs vs Classes"
        description: "Value vs reference semantics, mutating, and when to use each"
      - title: "Protocols"
        description: "Protocol definition, conformance, extensions, and PATs"
      - title: "Generics"
        description: "Generic types, functions, associated types, and where clauses"
      - title: "Extensions"
        description: "Adding functionality to existing types, protocol extensions"
  - section: "SwiftUI & Modern Swift"
    items:
      - title: "SwiftUI Basics"
        description: "Declarative views, @State, @Binding, @ObservedObject"
      - title: "Concurrency"
        description: "async/await, Task, actor model, and structured concurrency"
      - title: "Result Builders"
        description: "@ViewBuilder and custom DSLs with result builders"
---

## Overview

Swift is a powerful and intuitive programming language developed by Apple for iOS, iPadOS, macOS, tvOS, and watchOS. It is designed to be safe, fast, and expressive. Swift eliminates entire classes of unsafe code through optionals, type safety, and automatic memory management. Its protocol-oriented programming paradigm encourages composition over inheritance.

## Key Features

- **Type safety & optionals** — Nil safety is enforced at the compiler level
- **Protocol-oriented** — Protocols + extensions enable powerful abstractions
- **Value types** — Structs and enums are first-class citizens
- **SwiftUI** — Declarative UI framework for Apple platforms
- **Playgrounds** — Interactive coding environment for experimentation

## Code Example

```swift
protocol Describable {
    var description: String { get }
}

struct Planet: Describable {
    let name: String
    let moons: Int

    var description: String {
        "\(name) has \(moons) moon\(moons == 1 ? "" : "s")"
    }
}

let mars = Planet(name: "Mars", moons: 2)
print(mars.description) // Mars has 2 moons
```

## Learning Resources

- [Swift.org Documentation](https://docs.swift.org/swift-book/)
- [Hacking with Swift](https://www.hackingwithswift.com/)
- [Ray Wenderlich](https://www.raywenderlich.com/)
