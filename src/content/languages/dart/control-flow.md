---
title: "Control Flow"
description: "if/else, switch, and loops in Dart"
---

## Conditional Logic (`if`)

In **Dart**, `if` statements work just like in other C-style languages.

```dart
if (isReady) {
  print('Go!');
} else {
  print('Wait...');
}
```

## The Modern `switch` (Dart 3.0+)

Wait! Dart 3.0 introduced a massively upgraded **Switch** system. It can now be used as an expression (returning a value) and supports pattern matching.

```dart
var status = switch (statusCode) {
  200 => 'Success',
  404 => 'Not Found',
  _ => 'Unknown' // The default case
};
```

## Loops in Dart

Dart provides the standard loops you expect:

1.  **`for`**: Best for a fixed number of iterations.
2.  **`for-in`**: The easiest way to iterate through a list.
3.  **`while`**: Runs as long as a condition is true.

```dart
var fruits = ['Apple', 'Banana', 'Cherry'];

for (var fruit in fruits) {
  print(fruit);
}
```

## Assertions

During development, you can use **`assert`** to verify that a condition is true. Assertions are ignored in production, so they have no performance cost for your users.

```dart
assert(age >= 18, 'Must be an adult');
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / else** | Basic branching |
| **switch** | Multi-way branch (supports patterns in Dart 3+) |
| **for-in** | Iterating through collections |
| **while** | Basic loop with condition |
| **break** | Exit loop immediately |
| **continue** | Skip current iteration |
| **Logic** | Essential for app logic and UI states |
| **Safety** | Switches must be exhaustive if using Enums |
| **Modern** | Switch expressions and patterns make code very concise |
| **Standard** | Use `for-in` for almost all collection processing |
| **Identity** | Control flow returns no value except in `switch` expressions |
