---
title: "Extension Functions"
description: "Adding functionality to existing classes without inheritance"
---

## What are Extension Functions?

Kotlin allows you to "extend" a class with new functionality without having to inherit from the class or use design patterns like Decorator. You can even extend classes that you don't own (like `String`, `List`, or Android's `View`).

Extensions are resolved **statically**, meaning they don't actually modify the class they extend.

## 1. Syntax

To define an extension, prefix the function name with the **Receiver Type** (the name of the class you are extending).

```kotlin
// Extend the String class
fun String.removeFirstAndLast(): String {
    return this.substring(1, this.length - 1)
}

fun main() {
    val myString = "Nocturnal"
    println(myString.removeFirstAndLast()) // Output: octurna
}
```

## 2. Using `this`

Inside an extension function, you can use the keyword `this` to refer to the **receiver object** (the instance the function is called on).

```kotlin
fun Int.isEven(): Boolean = this % 2 == 0

val x = 10
if (x.isEven()) {
    println("Even!")
}
```

## 3. Extension Properties

You can also add properties to classes in a similar way. Note that extension properties cannot have a "backing field" (they must have an explicit getter).

```kotlin
val String.lastChar: Char
    get() = this[length - 1]
```

## 4. Why use them?

- **Readability**: They make code look like it belongs to the object (e.g., `user.isValid()` instead of `UserUtils.isValid(user)`).
- **Clean API**: You can add domain-specific logic to general types.
- **Null Safety**: You can even define extensions on **nullable** types!

```kotlin
fun String?.isNullOrBlank(): Boolean = this == null || this.trim().isEmpty()
```

## Summary Checklist
- [x] Extensions add methods to a class without inheritance.
- [x] They are resolved statically (no class modification).
- [x] Use `ReceiverType.functionName` syntax.
- [x] Use `this` to access the instance.
- [x] Perfect for utility methods and fluent APIs.
- [x] Can be defined on nullable types for extra safety.
---
