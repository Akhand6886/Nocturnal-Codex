---
id: dart
name: Dart
slug: dart
description: >-
  Google's language optimized for building beautiful, natively compiled
  applications with Flutter.
iconName: dart
year: 2011
creator: 'Lars Bak, Kasper Lund (Google)'
paradigm:
  - Object-Oriented
  - Functional
useCases:
  - Mobile Apps
  - Web Apps
  - Desktop Apps
  - IoT
website: 'https://dart.dev/'
category: Mobile
featured: false
difficulty: Beginner
topics:
  - section: Basics
    items:
      - title: Introduction to Dart
        description: 'Dart VM, AOT/JIT compilation, and DartPad'
        slug: introduction-to-dart
      - title: Variables & Types
        description: 'var, final, const, dynamic, and Dart''s sound type system'
        slug: variables-types
      - title: Functions
        description: 'Arrow syntax, optional params, named params, and closures'
        slug: functions
      - title: Control Flow
        description: 'if/else, switch, for, while, and pattern matching (3.0+)'
        slug: control-flow
      - title: Null Safety
        description: 'Non-nullable by default, ?, !, late, and required'
        slug: null-safety
  - section: OOP in Dart
    items:
      - title: Classes
        description: 'Constructors (named, factory, const), this, and cascade notation (..)'
        slug: classes
      - title: Inheritance & Mixins
        description: 'extends, implements, with, and mixin classes'
        slug: inheritance-mixins
      - title: Generics
        description: 'Generic classes, functions, and type constraints'
        slug: generics
      - title: Enums
        description: Enhanced enums with methods and implementations
        slug: enums
  - section: Async & Collections
    items:
      - title: Futures
        description: 'async/await, Future.then, and error handling'
        slug: futures
      - title: Streams
        description: 'Single-subscription, broadcast streams, and StreamBuilder'
        slug: streams
      - title: Isolates
        description: Concurrent execution without shared-state threads
        slug: isolates
      - title: Collections
        description: 'List, Set, Map, Iterable, and collection literals'
        slug: collections
  - section: Flutter & UI
    items:
      - title: Flutter Basics
        description: 'Widget tree, StatelessWidget, StatefulWidget, and build()'
        slug: flutter-basics
      - title: State Management
        description: 'setState, Provider, Riverpod, Bloc'
        slug: state-management
      - title: Navigation & Routing
        description: 'Navigator 2.0, go_router, and deep linking'
        slug: navigation-routing
---

## Overview

Dart is a client-optimized language for developing fast apps on any platform. It is the language behind Flutter, Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. Dart features a sound type system, null safety, and can compile to ARM and x64 machine code or to JavaScript for the web.

## Key Features

- **Sound null safety** — Eliminates null reference exceptions at compile time
- **Hot reload** — Instant UI updates during development (via Flutter)
- **AOT & JIT compilation** — Fast development (JIT) and fast production (AOT)
- **Isolates** — Concurrency model without shared-state threads
- **Single codebase** — Build for iOS, Android, web, and desktop with Flutter

## Code Example

```dart
Future<String> greetUser(String? name) async {
  final displayName = name ?? 'Guest';
  await Future.delayed(Duration(seconds: 1));
  return 'Welcome, $displayName!';
}

void main() async {
  print(await greetUser('Alice'));
  print(await greetUser(null));
}
```

## Learning Resources

- [Dart Official Docs](https://dart.dev/guides)
- [Flutter Documentation](https://docs.flutter.dev/)
- [Dart Pad (Online Playground)](https://dartpad.dev/)
