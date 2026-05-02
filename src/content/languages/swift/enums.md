---
title: "Enums"
description: "Enumerations with associated values and raw values in Swift"
---

## What is an Enum?

An **Enumeration** (Enum) defines a common type for a group of related values. In **Swift**, enums are much more powerful than in other languages—they can have methods, properties, and even "Associated Values."

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

## Raw Values

Enums can be backed by **Raw Values** (like Integers or Strings).

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars
}
let earth = Planet(rawValue: 3)
```

## Associated Values

Wait! This is Swift's "superpower." Each case in an enum can store additional data of any type.

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

var productCode = Barcode.qrCode("ABCDEFGHI")
```

## Exhaustive Switch

Enums and `switch` statements go perfectly together. Because Swift knows all possible cases of an enum, the `switch` must be exhaustive.

```swift
switch productCode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer)...")
case .qrCode(let code):
    print("QR Code: \(code)")
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **case** | Declaring a value in an enum |
| **Raw Value** | A fixed value attached to a case (Int/String) |
| **Associated Val**| Dynamic data attached to a case |
| **.case** | Shorthand notation (Dot Syntax) |
| **Iterable** | `CaseIterable` - Allow looping through all cases |
| **Best For** | Representing states, directions, and complex data shapes |
| **Logic** | "Safe, predictable sets of values" |
| **Safety** | Compiler ensures you handle every case |
| **Modern** | Powering "Algebraic Data Types" in Swift |
| **Standard** | Use `camelCase` for case names in Swift |
| **Identity** | Enums are Value Types (like Structs) |
| **Recursive** | Use `indirect` for enums that reference themselves |
