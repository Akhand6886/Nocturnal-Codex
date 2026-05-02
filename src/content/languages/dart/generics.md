---
title: "Generics"
description: "Type-safe code reuse and constraints in Dart"
---

## What are Generics?

**Generics** allow you to write code that can work with any data type, while still maintaining full type safety. You use angle brackets **`<T>`** to define a type parameter.

```dart
class Box<T> {
  T? value;
  void set(T newValue) => value = newValue;
}

var intBox = Box<int>();
intBox.set(42);
```

## Generic Methods

You can also make individual functions generic.

```dart
T firstElement<T>(List<T> list) {
  return list[0];
}
```

## Type Constraints (`extends`)

Wait! Sometimes you need to restrict which types can be used. In **Dart**, you use the **`extends`** keyword inside the angle brackets.

```dart
// T must be a subclass of Number
class Calculator<T extends num> {
  T add(T a, T b) => (a + b) as T;
}
```

## Why use Generics?

1.  **Code Reuse**: Write one list, one cache, or one repository for any type.
2.  **Type Safety**: The compiler ensures you don't accidentally add a `String` to a `List<int>`.
3.  **Documentation**: Generics make it clear what kind of data a function or class expects.

## Summary

| Term | Description |
| :--- | :--- |
| **T** | Convention for a single Type Parameter |
| **E** | Convention for an Element (used in Lists) |
| **K, V** | Convention for Key and Value (used in Maps) |
| **extends** | Restricting a generic type to a specific hierarchy |
| **Reified** | Dart keeps type information at runtime (Fast check!) |
| **Best For** | Collections, API wrappers, and reusable UI components |
| **Logic** | "Write once, run for any type safely" |
| **Safety** | Catch type errors at compile-time |
| **Modern** | Essential for building generic Flutter widgets |
| **Standard** | Use meaningful letters (T, E, K, V) |
| **Identity** | The foundation of all Dart collection types |
