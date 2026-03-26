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
// Swift optionals and protocol-oriented programming
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
