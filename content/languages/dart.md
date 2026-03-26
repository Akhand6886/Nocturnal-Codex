---
id: "dart"
name: "Dart"
slug: "dart"
description: "Google's language optimized for building beautiful, natively compiled applications with Flutter."
iconName: "dart"
year: 2011
creator: "Lars Bak, Kasper Lund (Google)"
paradigm: ["Object-Oriented", "Functional"]
useCases: ["Mobile Apps", "Web Apps", "Desktop Apps", "IoT"]
website: "https://dart.dev/"
category: "Mobile"
featured: false
difficulty: "Beginner"
---

## Overview

Dart is a client-optimized language for developing fast apps on any platform. It is the language behind Flutter, Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. Dart features a sound type system, null safety, and can compile to ARM and x64 machine code for mobile and desktop, or to JavaScript for the web.

## Key Features

- **Sound null safety** — Eliminates null reference exceptions at compile time
- **Hot reload** — Instant UI updates during development (via Flutter)
- **AOT & JIT compilation** — Fast development (JIT) and fast production (AOT)
- **Isolates** — Concurrency model without shared-state threads
- **Single codebase** — Build for iOS, Android, web, and desktop with Flutter

## Code Example

```dart
// Dart null safety and async
Future<String> greetUser(String? name) async {
  final displayName = name ?? 'Guest';
  await Future.delayed(Duration(seconds: 1));
  return 'Welcome, $displayName!';
}

void main() async {
  print(await greetUser('Alice')); // Welcome, Alice!
  print(await greetUser(null));    // Welcome, Guest!
}
```

## Learning Resources

- [Dart Official Docs](https://dart.dev/guides)
- [Flutter Documentation](https://docs.flutter.dev/)
- [Dart Pad (Online Playground)](https://dartpad.dev/)
