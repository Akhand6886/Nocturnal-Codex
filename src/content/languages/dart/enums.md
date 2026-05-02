---
title: "Enums"
description: "Simple and Enhanced Enumerations in Dart"
---

## What is an Enum?

An **Enumeration** (Enum) is a special kind of class used to represent a fixed number of constant values.

```dart
enum Status { pending, success, failed }
```

## Enhanced Enums (Dart 2.17+)

Wait! Enums in modern **Dart** are extremely powerful. They can have fields, constructors, and methods, just like a regular class.

```dart
enum Plan {
  free(0, 'Basic'),
  pro(10, 'Professional'),
  gold(50, 'Unlimited');

  final int price;
  final String label;

  const Plan(this.price, this.label);

  bool get isExpensive => price > 20;
}
```

## Exhaustive Switch

When you use an enum in a `switch` statement, the compiler ensures that you have handled every possible value.

```dart
switch (currentPlan) {
  case Plan.free:
    // ...
  case Plan.pro:
    // ...
  case Plan.gold:
    // ...
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **enum** | Keyword to define a set of constants |
| **values** | `Plan.values` - List of all cases |
| **index** | The numeric position of a case (starts at 0) |
| **const** | Enum constructors must be constants |
| **Best For** | States, types, and fixed categories |
| **Logic** | Predictable and type-safe data |
| **Safety** | Compiler prevents using invalid enum values |
| **Modern** | Enhanced Enums make data-centric logic much cleaner |
| **Standard** | Use `lowerCamelCase` for case names in Dart |
| **Identity** | Enums are a special type of Class |
| **Switch** | Use `switch` expressions for concise enum handling |
