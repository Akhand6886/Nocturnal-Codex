---
title: "Inheritance & Mixins"
description: "extends, implements, and horizontal code reuse with with"
---

## Inheritance (`extends`)

**Dart** supports single inheritance. A class can inherit from one other class using the `extends` keyword.

```dart
class Animal {
  void eat() => print('Eating...');
}

class Dog extends Animal {
  void bark() => print('Woof!');
}
```

## Interfaces (`implements`)

Wait! In Dart, there is no `interface` keyword. Instead, **every class implicitly defines an interface**. You can implement any class as an interface.

```dart
class MockUser implements User {
  // You must implement ALL methods/fields of User here
}
```

## Mixins (`with`)

**Mixins** are Dart's way of reusing a class's code in multiple class hierarchies without using inheritance. They are perfect for "plugging in" functionality.

```dart
mixin Logger {
  void log(String msg) => print('[LOG]: $msg');
}

class User with Logger {
  void save() {
    log('Saving user...');
  }
}
```

Wait! Use the **`with`** keyword to add a mixin to a class. Unlike inheritance, a class can have many mixins!

## Why use Mixins?

-   Avoid "Deep Inheritance" trees that are hard to manage.
-   Reuse the same code across unrelated classes.
-   Keep your classes small and focused on one task.

## Summary

| Term | Description |
| :--- | :--- |
| **extends** | Vertical inheritance (Is-A) |
| **implements** | Contract-based implementation |
| **with** | Horizontal code reuse (Has-Behavior) |
| **mixin** | A class designed to be "mixed in" |
| **super** | Call a method in the parent class |
| **Best For** | Flexible and modular architecture |
| **Logic** | "Composition over Inheritance" |
| **Safety** | Static checking ensures all contracts are met |
| **Modern** | Highly used in Flutter (e.g., `SingleTickerProviderStateMixin`) |
| **Standard** | Use Mixins for cross-cutting concerns like logging or validation |
| **Identity** | Mixins do not define their own type hierarchy |
