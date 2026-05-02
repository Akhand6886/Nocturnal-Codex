---
title: "State Management"
description: "setState, Providers, and Riverpod in Flutter"
---

## What is State?

In **Flutter**, "State" is information that can change during the lifetime of a widget and that you want the UI to reflect. When the state changes, the UI must be rebuilt.

## 1. `setState` (Local State)

For simple widgets (like a checkbox or a counter), you can use the built-in `setState` method. It tells Flutter: "Something changed, please redraw this widget."

```dart
setState(() {
  _counter++;
});
```

## 2. Lifting State Up

Wait! As your app grows, you'll need to share state between many different widgets. This is where **Global State Management** comes in.

## 3. Popular Solutions

| Solution | Best For... |
| :--- | :--- |
| **Provider** | The classic, standard way to share data. |
| **Riverpod** | A modern, safer, and more powerful version of Provider. |
| **BLoC** | Large-scale apps using Streams and Events. |
| **GetX** | High-speed, high-performance, and very simple syntax. |

## Why use a library?

1.  **Efficiency**: Only rebuild the specific widgets that need the new data.
2.  **Separation**: Keep your business logic (the "What") separate from your UI (the "How").
3.  **Testability**: Easier to write unit tests for your data logic without needing to run the whole app.

## Summary

| Term | Description |
| :--- | :--- |
| **State** | Data that changes over time |
| **Rebuild** | Redrawing the UI to match the new state |
| **Provider** | A popular "Wrapper" for sharing data down the tree |
| **Reactive** | UI that "reacts" automatically to data changes |
| **Best For** | Keeping your app data organized and synchronized |
| **Logic** | "One Source of Truth" |
| **Safety** | Prevents "Out of Sync" UI bugs |
| **Modern** | Riverpod is currently the recommended choice for new apps |
| **Standard** | State management is the #1 topic in Flutter architecture |
| **Identity** | The "BLoC" pattern is unique to the Flutter/Dart ecosystem |
| **Observable**| Data that can be "watched" for changes |
