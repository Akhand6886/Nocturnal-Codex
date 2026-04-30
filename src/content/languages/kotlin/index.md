---
id: kotlin
name: Kotlin
slug: kotlin
description: >-
  A modern, concise JVM language by JetBrains — the preferred language for
  Android development.
iconName: kotlin
year: 2011
creator: JetBrains
paradigm:
  - Object-Oriented
  - Functional
useCases:
  - Android Development
  - Server-Side
  - Multiplatform
  - Desktop Apps
website: 'https://kotlinlang.org/'
category: Mobile
featured: false
difficulty: Intermediate
topics:
  - section: Basics
    items:
      - title: Introduction to Kotlin
        description: 'JVM interop, Kotlin/JVM vs Kotlin/Native vs Kotlin/JS'
        slug: introduction-to-kotlin
      - title: Variables & Types
        description: 'val vs var, type inference, nullable types (?), and smart casts'
        slug: variables-types
      - title: Functions
        description: 'Named/default arguments, single-expression functions, infix'
        slug: functions
      - title: Control Flow
        description: 'when expression, if as expression, for, ranges'
        slug: control-flow
      - title: Null Safety
        description: 'Safe calls (?.), Elvis operator (?:), let, and !!'
        slug: null-safety
  - section: OOP & Data Classes
    items:
      - title: Classes
        description: 'Primary constructors, init blocks, properties, companion objects'
        slug: classes
      - title: Data Classes
        description: 'Auto-generated equals, hashCode, toString, copy, destructuring'
        slug: data-classes
      - title: Sealed Classes
        description: Restricted hierarchies for exhaustive when expressions
        slug: sealed-classes
      - title: Delegation
        description: by keyword for class and property delegation
        slug: delegation
  - section: Functional Kotlin
    items:
      - title: Lambdas
        description: 'Lambda syntax, it keyword, and higher-order functions'
        slug: lambdas
      - title: Collections
        description: 'map, filter, reduce, groupBy, and sequence'
        slug: collections
      - title: Extension Functions
        description: Adding functions to existing classes without inheritance
        slug: extension-functions
      - title: Scope Functions
        description: 'let, run, apply, also, with — when to use each'
        slug: scope-functions
  - section: Coroutines & Advanced
    items:
      - title: Coroutines
        description: 'launch, async/await, Dispatchers, and structured concurrency'
        slug: coroutines
      - title: Flow
        description: 'Cold streams, operators, StateFlow, and SharedFlow'
        slug: flow
      - title: Kotlin Multiplatform
        description: 'Sharing code across Android, iOS, web, and desktop'
        slug: kotlin-multiplatform
      - title: DSLs
        description: Type-safe builders and domain-specific languages
        slug: dsls
---

## Overview

Kotlin is a cross-platform, statically typed language with type inference. It is designed to interoperate fully with Java and runs on the JVM. Google officially endorsed Kotlin as the preferred language for Android development in 2019. Kotlin Multiplatform enables sharing code across Android, iOS, web, and desktop.

## Key Features

- **Null safety** — Nullable types are explicit; no more NullPointerExceptions
- **Coroutines** — Lightweight concurrency without callback hell
- **Data classes** — Auto-generated `equals`, `hashCode`, `toString`, `copy`
- **Extension functions** — Add methods to existing classes without inheritance
- **Java interop** — 100% interoperable with existing Java code

## Code Example

```kotlin
data class User(val name: String, val age: Int)

suspend fun fetchUsers(): List<User> {
    return listOf(
        User("Alice", 30),
        User("Bob", 25)
    ).filter { it.age > 20 }
     .sortedBy { it.name }
}
```

## Learning Resources

- [Kotlin Official Docs](https://kotlinlang.org/docs/home.html)
- [Kotlin Koans](https://play.kotlinlang.org/koans/)
- [Android Developers — Kotlin](https://developer.android.com/kotlin)
