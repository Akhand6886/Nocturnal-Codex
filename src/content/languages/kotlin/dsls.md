---
title: "Type-Safe Builders (DSLs)"
description: "Creating domain-specific languages using Kotlin's powerful type-safe builders."
category: "Advanced"
order: 15
---

## Building DSLs in Kotlin

Kotlin's combination of **function literals with receiver** and **extension functions** allows for the creation of elegant, type-safe builders.

### Core Mechanics

The secret sauce is the `T.() -> Unit` function type, which gives the function body access to the `T` receiver via `this`.

```kotlin
class HTML {
    fun body(init: Body.() -> Unit) {
        val body = Body()
        body.init()
        println("<body>...</body>")
    }
}

class Body {
    fun p(text: String) {
        println("<p>$text</p>")
    }
}

fun html(init: HTML.() -> Unit) {
    val html = HTML()
    html.init()
}

// Usage
html {
    body {
        p("Hello, DSL!")
    }
}
```

### Key DSL Features

| Feature | Description |
|---------|-------------|
| **Infix Functions** | Allow calling methods without dots or parentheses (`a to b`). |
| **Operator Overloading** | Customize standard operators for DSL syntax. |
| **DslMarker** | Prevents accessing outer scopes in nested builders. |

### Summary Table

| Pattern | Use Case |
|---------|----------|
| **HTML/XML Builders** | Programmatic UI or document generation. |
| **Configuration** | Gradle KTS, Ktor routing. |
| **Testing** | Kotest, Mockk verification. |
