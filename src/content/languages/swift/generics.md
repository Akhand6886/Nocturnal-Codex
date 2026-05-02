---
title: "Generics"
description: "Type-safe code reuse and generic constraints in Swift"
---

## What are Generics?

**Generics** allow you to write flexible, reusable functions and types that can work with any data type, while still maintaining full type safety. You use angle brackets **`<T>`** to define a type parameter.

```swift
func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

## Generic Types

You can make entire classes, structs, and enums generic.

```swift
struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) { items.append(item) }
    mutating func pop() -> Element { items.removeLast() }
}
```

## Type Constraints

Wait! Sometimes you need to restrict a generic type to only work with types that have certain capabilities (like being able to be compared).

```swift
func findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind { return index }
    }
    return nil
}
```

## The `where` Clause

For more complex constraints, you can use the **`where`** clause.

```swift
func process<T>(items: [T]) where T: Numeric, T: Comparable {
    // T must be both a Number and Comparable
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **T** | Convention for Type Parameter |
| **Element** | Convention for collection items |
| **Equatable** | Protocol for types that can be compared (`==`) |
| **Comparable** | Protocol for types that can be ordered (`<`, `>`) |
| **Constraint** | Restricting the types that can be used |
| **Best For** | Collections (Array, Dictionary) and reusable logic |
| **Logic** | "Write once, run for any type safely" |
| **Safety** | Catch type-related bugs at compile-time |
| **Modern** | Opaque types (`some Protocol`) are built on generics |
| **Standard** | The foundation of the Swift Standard Library |
| **Identity** | Generics are specialized by the compiler for maximum speed |
| **Where** | Custom logic for complex generic requirements |
