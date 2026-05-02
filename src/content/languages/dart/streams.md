---
title: "Streams"
description: "Reactive programming and asynchronous data sequences in Dart"
---

## What is a Stream?

A **Stream** is a sequence of asynchronous events. Think of a **Future** as a single value that arrives later, while a **Stream** is a pipe that can provide multiple values over time (like a faucet).

```dart
Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    yield i; // Sending a value into the stream
    await Future.delayed(Duration(seconds: 1));
  }
}
```

## `async*` and `yield`

Wait! To create a stream, you mark your function with **`async*`** (pronounced "async star") and use the **`yield`** keyword to send values.

## Listening to a Stream

You can consume a stream using the **`await for`** loop.

```dart
void main() async {
  var stream = countStream(5);
  await for (var value in stream) {
    print(value); // Prints 1, then 2, then 3...
  }
}
```

## Stream Controllers

For more advanced use cases (like a search bar or a chat app), you can use a **`StreamController`** to manually push values into a stream.

```dart
final controller = StreamController<String>();
controller.add('New Message');
controller.stream.listen((msg) => print(msg));
```

## Summary

| Term | Description |
| :--- | :--- |
| **Stream** | A sequence of async data |
| **async*** | Keyword to define a stream generator |
| **yield** | Adding a value to a stream |
| **await for** | Iterating over a stream |
| **listen** | Callback-based way to handle stream events |
| **Single-sub** | A stream that can only be listened to once (Default) |
| **Broadcast** | A stream that many people can listen to |
| **Best For** | Real-time data, sensors, chat, and Firebase |
| **Logic** | "Reactive" - the app reacts as data arrives |
| **Safety** | Always close your streams when done to prevent memory leaks! |
| **Modern** | The foundation of the "BLoC" pattern in Flutter |
| **Standard** | `StreamSubscription` allows you to pause/cancel a stream |
| **Identity** | Streams are a core part of the `dart:async` library |
