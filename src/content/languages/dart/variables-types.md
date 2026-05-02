---
title: "Variables & Types"
description: "var, final, const, and type inference in Dart"
---

## Strong Typing

**Dart** is a strongly typed language, but it also has powerful **Type Inference**. This means you can specify types explicitly, or let the compiler figure them out for you.

```dart
var name = 'Alpha'; // Inferred as String
int age = 25;       // Explicitly typed
```

## Immutable Variables

Wait! Choosing between `final` and `const` is important in Dart.

1.  **`final`**: A variable that can be set only once. Its value is determined at **runtime**. (e.g., the current time).
2.  **`const`**: A variable that is a **compile-time constant**. Its value must be known before the app runs.

```dart
final currentTime = DateTime.now(); // Runtime
const pi = 3.14;                    // Compile-time
```

## String Interpolation

You can put the value of an expression inside a string using the **`${}`** syntax. If it's just a single variable, you can omit the braces.

```dart
print('My name is $name and I am $age years old.');
```

## Everything is an Object

In Dart, every variable refers to an **Object**. There are no "primitives." Even numbers like `int` and `double` are objects and can have methods.

## Common Data Types

| Type | Description |
| :--- | :--- |
| **int** | Integer values (no decimal) |
| **double** | 64-bit floating-point numbers |
| **num** | Can be either an `int` or a `double` |
| **String** | Sequence of characters |
| **bool** | `true` or `false` |
| **dynamic** | Turns off type checking (Use sparingly!) |

## Summary

| Term | Description |
| :--- | :--- |
| **var** | Implicitly typed variable |
| **final** | Immutable after first assignment (Runtime) |
| **const** | Immutable at compile-time |
| **late** | Variable that is initialized after its declaration (Safety check) |
| **dynamic** | A type that can hold anything (Safety risk!) |
| **Best For** | Writing clean and type-safe code |
| **Logic** | "Immutable by default" makes code easier to reason about |
| **Safety** | Strong static analysis catches bugs before you run |
| **Modern** | Concise syntax with no boilerplate |
| **Standard** | Use `lowerCamelCase` for variables |
| **Identity** | Variables are references to objects in memory |
