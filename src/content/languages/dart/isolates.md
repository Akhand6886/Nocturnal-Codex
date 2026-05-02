---
title: "Isolates"
description: "Multi-threading and concurrent execution in Dart"
---

## Why Isolates?

Most modern programming languages use **Threads** to run code in parallel. However, threads share memory, which can lead to complex bugs and "Race Conditions." 

**Dart** uses **Isolates**. Each Isolate has its own memory heap and its own "Event Loop." They don't share memory; they communicate only by **sending messages**.

## How they Work

Wait! Because Isolates don't share memory, you never have to worry about "locking" your variables. This makes concurrent programming much safer and easier to debug.

## Using `Isolate.run`

In modern Dart, you can easily run a function in a separate isolate using **`Isolate.run`**.

```dart
Future<String> heavyTask() async {
  return await Isolate.run(() {
    // This code runs on a separate CPU core!
    return performComplexCalculation();
  });
}
```

## Why use Isolates?

1.  **UI Performance**: If you do a heavy calculation (like image processing) on the main isolate, your Flutter app will "jank" (stutter). Moving it to a separate isolate keeps the UI smooth.
2.  **Safety**: No shared state means no race conditions.
3.  **Efficiency**: Utilizes all the cores on a user's device.

> [!IMPORTANT]
> For simple async tasks (like API calls), you don't need Isolates. `async/await` is enough. Only use Isolates for **CPU-intensive** work.

## Summary

| Term | Description |
| :--- | :--- |
| **Isolate** | An independent worker with its own memory |
| **Event Loop** | The mechanism that processes messages in an Isolate |
| **SendPort** | Used to send messages to an Isolate |
| **ReceivePort**| Used to receive messages from an Isolate |
| **Main Isolate**| Where your app starts and where the UI runs |
| **Best For** | JSON parsing (large), Image filtering, Cryptography |
| **Logic** | "Share by communicating, don't communicate by sharing" |
| **Safety** | Complete memory isolation prevents data corruption |
| **Modern** | `Isolate.run` makes it much easier to use than before |
| **Standard** | Part of the `dart:isolate` library |
| **Efficiency**| Scales across multiple CPU cores |
| **Identity** | The reason why Flutter can maintain 60/120 FPS so reliably |
