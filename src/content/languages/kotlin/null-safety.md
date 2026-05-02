---
title: "Null Safety"
description: "Nullable types, safe calls, and the Elvis operator"
---

## The Billion Dollar Mistake

In many languages (like Java), any object can be **`null`**, and trying to use it results in a crash (`NullPointerException`). Kotlin solves this at the **compiler level**.

By default, types in Kotlin are **Non-Nullable**.

```kotlin
var name: String = "Alpha"
// name = null // ERROR! Compiler won't allow this.
```

## Nullable Types (`?`)

If you want to allow a variable to be null, you must explicitly add a **`?`** to the type.

```kotlin
var name: String? = "Alpha"
name = null // SUCCESS!
```

## Safe Calls (`?.`)

Wait! If a variable can be null, how do you use its properties safely? You use the **Safe Call** operator. If the variable is null, the result is null; if not, the property is accessed.

```kotlin
val length = name?.length // If name is null, length is null.
```

## The Elvis Operator (`?:`)

What if you want a default value when something is null? Use the **Elvis Operator**. (Rotate your head 90 degrees to see Elvis's hair and eyes!)

```kotlin
val length = name?.length ?: 0 // If name is null, use 0.
```

## The Not-Null Assertion (`!!`)

Use this only if you are **100% sure** a variable is not null. It converts any value to a non-nullable type and throws an exception if the value is actually null.

```kotlin
val length = name!!.length // DANGEROUS! Can still cause NPE.
```

## Summary

| Operator | Syntax | Description |
| :--- | :--- | :--- |
| **?** | `T?` | Declaring a nullable type |
| **?.** | `x?.y` | Safe call: return `y` or `null` |
| **?:** | `x ?: y`| Elvis: return `x` or default `y` |
| **!!** | `x!!` | Assertion: Throw error if null |
| **as?** | `x as? T`| Safe cast: return `T` or `null` |
| **Best For** | Eliminating NullPointerExceptions |
| **Logic** | Handle "nothingness" explicitly and safely |
| **Safety** | Catch null-related bugs during development, not at runtime |
| **Modern** | Kotlin's hallmark feature that changed Android development |
| **Standard** | Avoid `!!` whenever possible; use `?.` or `if` checks |
| **Smart Cast** | Once you check for null with `if`, Kotlin "knows" it's safe |
