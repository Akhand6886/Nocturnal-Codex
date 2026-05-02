---
title: "Memory Management (ARC)"
description: "Understanding Automatic Reference Counting and avoiding retain cycles"
---

## What is ARC?

Swift uses **Automatic Reference Counting (ARC)** to manage your app's memory usage. Every time you create a new instance of a class, ARC allocates a chunk of memory. It keeps track of how many properties, constants, and variables are currently referring to that instance. 

When the count reaches zero, the instance is deallocated.

## 1. Strong References (Default)

By default, all references are "strong." As long as one strong reference exists, the instance cannot be deallocated.

```swift
var ref1: Person? = Person(name: "Alice")
var ref2 = ref1 // Reference count is now 2
ref1 = nil      // Count is 1
ref2 = nil      // Count is 0 -> Memory is freed
```

## 2. Strong Reference Cycles (Retain Cycles)

This happens when two class instances hold strong references to each other. Even if you set your external references to `nil`, the objects still point to each other, so their count never hits zero. **This is a memory leak.**

```swift
class Tenant {
    var apartment: Apartment?
}

class Apartment {
    var tenant: Tenant?
}
```

## 3. Resolving Cycles: `weak` and `unowned`

### `weak`
A weak reference does NOT increase the reference count. It must be an **optional** because it can become `nil` when the instance it points to is deallocated.

```swift
class Apartment {
    weak var tenant: Tenant? // Resolves the cycle!
}
```

### `unowned`
Similar to `weak`, it doesn't increase the count. However, it is **non-optional**. Only use it when you are certain the other instance will always exist as long as the current one does (e.g., a credit card and its owner).

## 4. Closures and Capture Lists

Closures are reference types and can also cause retain cycles if they capture `self` strongly.

```swift
lazy var greeting: () -> String = { [weak self] in
    guard let self = self else { return "No User" }
    return "Hello, \(self.name)"
}
```

## Summary Checklist
- [x] ARC manages memory automatically for classes.
- [x] Strong references increase the count.
- [x] Retain cycles occur when objects point to each other strongly.
- [x] Use `weak` for references that can become `nil`.
- [x] Use `unowned` for references that will never be `nil`.
- [x] Use `[weak self]` in closures to avoid leaking your View Controllers.
---
