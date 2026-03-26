---
id: "kotlin"
name: "Kotlin"
slug: "kotlin"
description: "A modern, concise JVM language by JetBrains — the preferred language for Android development."
iconName: "kotlin"
year: 2011
creator: "JetBrains"
paradigm: ["Object-Oriented", "Functional"]
useCases: ["Android Development", "Server-Side", "Multiplatform", "Desktop Apps"]
website: "https://kotlinlang.org/"
category: "Mobile"
featured: false
difficulty: "Intermediate"
---

## Overview

Kotlin is a cross-platform, statically typed language with type inference. It is designed to interoperate fully with Java and runs on the JVM. Google officially endorsed Kotlin as the preferred language for Android development in 2019. Kotlin Multiplatform enables sharing code across Android, iOS, web, and desktop, making it a versatile choice for modern application development.

## Key Features

- **Null safety** — Nullable types are explicit; no more NullPointerExceptions
- **Coroutines** — Lightweight concurrency without callback hell
- **Data classes** — Auto-generated `equals`, `hashCode`, `toString`, `copy`
- **Extension functions** — Add methods to existing classes without inheritance
- **Java interop** — 100% interoperable with existing Java code

## Code Example

```kotlin
// Kotlin coroutines and data classes
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
