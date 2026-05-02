---
title: "Functions"
description: "Defining functions, parameters, and arrow syntax in Dart"
---

## Defining Functions

In **Dart**, functions are first-class objects. You can assign them to variables or pass them as arguments to other functions.

```dart
int sum(int a, int b) {
  return a + b;
}
```

Wait! For functions that only contain one expression, you can use the **Arrow Syntax (`=>`)** to make them much shorter.

```dart
int sum(int a, int b) => a + b;
```

## Parameters

Dart has two types of parameters:

1.  **Positional**: Required by default, passed in a specific order.
2.  **Named**: Optional by default, passed using names inside `{}`.

```dart
// Named parameters
void greet({String? name, String prefix = 'Hello'}) {
  print('$prefix, $name!');
}

greet(name: 'Alpha', prefix: 'Hi');
```

## Required Named Parameters

If you want a named parameter to be mandatory, use the **`required`** keyword.

```dart
void login({required String username, required String password}) { ... }
```

## Anonymous Functions (Lambdas)

You can create functions without a name. These are often used as callbacks (e.g., in `onPressed` handlers in Flutter).

```dart
var list = ['A', 'B', 'C'];
list.forEach((item) => print(item));
```

## Summary

| Term | Description |
| :--- | :--- |
| **void** | Function that returns nothing |
| **=>** | Shorthand for single-expression functions |
| **{ }** | Syntax for named parameters |
| **[ ]** | Syntax for optional positional parameters |
| **required** | Making a named parameter mandatory |
| **Best For** | Reusability and organizing logic |
| **Logic** | "Functions are data" |
| **Safety** | Strong type checking for inputs and outputs |
| **Modern** | Concise arrow syntax for simple tasks |
| **Standard** | Use `lowerCamelCase` for function names |
| **Identity** | Functions can be defined at the "top level" of a file |
