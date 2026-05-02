---
title: "Delegation"
description: "Property delegation and class delegation using by"
---

## What is Delegation?

**Delegation** is a design pattern where an object "delegates" its responsibility to another object. In **Kotlin**, this is a first-class feature supported by the **`by`** keyword.

## 1. Property Delegation

You can delegate the getter and setter of a property to another object.

```kotlin
val lazyValue: String by lazy {
    println("Computed!")
    "Hello"
}
```

Wait! The **`lazy`** delegate is the most common one. It ensures that the value is only calculated the **first time** it is accessed.

## 2. Built-in Delegates

-   **`lazy`**: Computed only on first access.
-   **`Delegates.observable`**: Notifies you whenever the property changes.
-   **`Delegates.vetoable`**: Allows you to "veto" (reject) a change to a property.

```kotlin
var name: String by Delegates.observable("No name") { prop, old, new ->
    println("$old -> $new")
}
```

## 3. Class Delegation

Kotlin allows you to implement an interface by delegating its methods to an existing instance. This is a great alternative to inheritance.

```kotlin
interface Base { fun print() }
class BaseImpl(val x: Int) : Base {
    override fun print() { print(x) }
}

// Derived implements Base by delegating to 'b'
class Derived(b: Base) : Base by b
```

## Why use Delegation?

1.  **Composition**: Favor composition over inheritance (cleaner architecture).
2.  **Performance**: `lazy` prevents unnecessary calculations.
3.  **Encapsulation**: Hide the complexity of property management behind a delegate.

## Summary

| Term | Description |
| :--- | :--- |
| **by** | The keyword used for delegation |
| **lazy** | Lazy initialization (Thread-safe by default) |
| **observable**| Tracking property changes |
| **Delegated** | A property whose logic lives elsewhere |
| **Best For** | Resource-heavy variables, ViewModel properties, Architecture |
| **Logic** | "Don't do it yourself; let someone else handle it" |
| **Safety** | Type-safe property management |
| **Modern** | Powering modern frameworks like Jetpack Compose |
| **Standard** | Use `by lazy` for anything that isn't needed immediately |
| **Identity** | Delegation happens at compile-time for zero overhead |
