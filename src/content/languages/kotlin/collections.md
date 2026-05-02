---
title: "Collections"
description: "Lists, Sets, Maps, and Immutability in Kotlin"
---

## Read-Only vs. Mutable

Wait! Unlike Java, **Kotlin** makes a clear distinction between **Read-Only** (Immutable) and **Mutable** collections. This is a key safety feature.

1.  **Read-Only**: You can read data but not add or remove items. (e.g., `listOf()`, `setOf()`, `mapOf()`).
2.  **Mutable**: You can add, remove, and update items. (e.g., `mutableListOf()`, `mutableSetOf()`).

```kotlin
val list = listOf("A", "B") // Cannot add items
val mutableList = mutableListOf("A", "B")
mutableList.add("C") // SUCCESS!
```

## Creating Collections

| Collection | Read-Only | Mutable |
| :--- | :--- | :--- |
| **List** | `listOf(1, 2)` | `mutableListOf(1, 2)` |
| **Set** | `setOf(1, 1, 2)` | `mutableSetOf(1, 2)` |
| **Map** | `mapOf("A" to 1)`| `mutableMapOf("A" to 1)`|

## Collection Transformations

Kotlin provides a rich set of functional operations to transform your data.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

val evens = numbers.filter { it % 2 == 0 } // [2, 4]
val doubled = numbers.map { it * 2 }       // [2, 4, 6, 8, 10]
val first = numbers.first()                // 1
```

## The `it` Keyword

In Kotlin, if a lambda has only one parameter, you can refer to it using the shorthand **`it`**.

```kotlin
list.forEach { println(it) }
```

## Summary

| Term | Description |
| :--- | :--- |
| **List** | Ordered collection of items |
| **Set** | Unordered collection of unique items |
| **Map** | Key-Value pairs |
| **Mutable** | Collection that can be changed |
| **filter** | Keep items that match a condition |
| **map** | Transform every item in a list |
| **Best For** | Organizing and processing data streams |
| **Logic** | Favor read-only collections whenever possible |
| **Safety** | Prevents accidental modifications in concurrent code |
| **Modern** | Functional programming style for data manipulation |
| **Standard** | Use `List<T>` as the default collection type |
| **Identity** | Collections are backed by standard Java collections for performance |
