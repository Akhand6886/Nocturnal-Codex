---
title: "Classes"
description: "Constructors, named parameters, and properties in Dart"
---

## Defining Classes

In **Dart**, everything is an object. You define classes using the `class` keyword.

```dart
class User {
  String name;
  int age;

  // Constructor
  User(this.name, this.age);
}
```

Wait! Notice the **`this.name`** syntax. This is a shorthand for assigning a constructor parameter directly to a field. It is the most common way to write constructors in Dart.

## Named Constructors

Dart doesn't support overloading constructors (having multiple constructors with the same name). Instead, you use **Named Constructors**.

```dart
class User {
  String name;
  int age;

  User.guest() : name = 'Guest', age = 18;
}
```

## Getters and Setters

While you can use simple fields, Dart allows you to define custom getters and setters to run logic when data is accessed or changed.

```dart
class User {
  int _score = 0; // Private field (starts with _)

  int get score => _score;
  set score(int value) {
    if (value >= 0) _score = value;
  }
}
```

## Abstract Classes

An **Abstract Class** cannot be instantiated. It is used as a blueprint for other classes.

```dart
abstract class Shape {
  void draw(); // No body!
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **this** | Reference to the current instance |
| **_var** | Private variable (Starts with an underscore) |
| **super** | Reference to the parent class |
| **extends** | Keyword for inheritance |
| **factory** | Special constructor that can return an existing instance |
| **Best For** | Modeling entities and application logic |
| **Logic** | "Encapsulate data and behavior" |
| **Safety** | Access control using private members |
| **Modern** | Concise constructor syntax |
| **Standard** | Use `UpperCamelCase` for class names |
| **Identity** | Classes can implement multiple interfaces (See Mixins section) |
| **late** | Often used for properties that are initialized after construction |
