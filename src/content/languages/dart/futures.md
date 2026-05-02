---
title: "Futures"
description: "Async/Await, non-blocking I/O, and error handling in Dart"
---

## What is a Future?

A **Future** represents a potential value or error that will be available at some time in the future. It is similar to a "Promise" in JavaScript.

```dart
Future<String> fetchData() {
  return Future.delayed(Duration(seconds: 2), () => 'Success!');
}
```

## `async` and `await`

Wait! To work with futures in a clean, readable way, **Dart** uses the `async` and `await` keywords.

-   **`async`**: Marks a function that returns a `Future`.
-   **`await`**: Pauses the function until the future completes.

```dart
void main() async {
  print('Fetching...');
  var result = await fetchData();
  print(result); // Prints after 2 seconds
}
```

## Error Handling

You use standard **`try/catch`** blocks to handle errors that happen in an asynchronous operation.

```dart
try {
  var data = await fetchData();
} catch (e) {
  print('Caught error: $e');
} finally {
  print('Done.');
}
```

## `Future.wait`

If you want to run multiple futures at the same time and wait for all of them to finish, use `Future.wait`.

```dart
var results = await Future.wait([fetchA(), fetchB()]);
```

## Summary

| Term | Description |
| :--- | :--- |
| **Future** | An object representing a delayed value |
| **async** | Required to use `await` inside a function |
| **await** | Suspension point for async execution |
| **then** | The older callback-style way to handle futures |
| **Uncompleted**| The initial state of a Future |
| **Completed** | The final state (Value or Error) |
| **Best For** | API calls, file I/O, and long-running computations |
| **Logic** | "Non-blocking" - your UI stays responsive while waiting |
| **Safety** | Prevents the "Freeze" bugs in mobile apps |
| **Modern** | The standard way to handle I/O in Flutter |
| **Standard** | Every `async` function must return a `Future` |
| **Identity** | Built into the `dart:async` library |
