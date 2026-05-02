---
title: "Kotlin Multiplatform (KMP)"
description: "Sharing code across iOS, Android, Web, and Desktop."
category: "Advanced"
order: 20
---

## Sharing Logic, Not UI

Kotlin Multiplatform allows you to share your business logic (data models, networking, validation) across all platforms while keeping the native UI layers (SwiftUI, Jetpack Compose).

### The Expect/Actual Pattern

KMP uses the `expect` and `actual` keywords to handle platform-specific implementations.

```kotlin
// Common module
expect fun getPlatformName(): String

// iOS module
actual fun getPlatformName(): String = "iOS"

// Android module
actual fun getPlatformName(): String = "Android"
```

### Key Ecosystem Components

| Component | Purpose |
|-----------|---------|
| **Ktor** | Multiplatform networking client. |
| **Kotlin Serialization** | Cross-platform JSON parsing. |
| **SQLDelight** | Cross-platform local database. |
| **Compose Multiplatform** | Shared UI framework (experimental for some platforms). |

### Summary Table

| Feature | Advantage |
|---------|-----------|
| **Consistency** | One business logic implementation. |
| **Performance** | Compiles to native code (no bridge like React Native). |
| **Flexibility** | Mix and match common and platform-specific code. |
