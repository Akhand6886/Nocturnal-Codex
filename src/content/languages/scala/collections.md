---
title: "Collections"
description: "Lists, Sets, Maps, and the functional transformation pipeline"
---

## Immutable by Default

Wait! Unlike Java, **Scala**'s standard collections are **Immutable**. This means when you "add" an item to a list, you actually get a **new list** with the item added. The original list remains unchanged.

```scala
val list = List(1, 2)
val newList = 0 :: list // Adding 0 to the front
// Result: List(0, 1, 2)
```

## Creating Collections

| Collection | Syntax | Description |
| :--- | :--- | :--- |
| **List** | `List(1, 2, 3)` | Ordered linked list |
| **Set** | `Set(1, 1, 2)` | Unordered unique items |
| **Map** | `Map("A" -> 1)` | Key-Value pairs |
| **Vector** | `Vector(1, 2, 3)` | Fast random-access (indexing) |
| **Array** | `Array(1, 2, 3)` | Mutable, fixed-size JVM array |

## The Transformation Pipeline

Scala provides a massive set of functional methods to process your data without ever using a `for` loop.

```scala
val numbers = List(1, 2, 3, 4, 5)

val result = numbers
  .filter(_ % 2 == 0) // [2, 4]
  .map(_ * 2)         // [4, 8]
  .sum                // 12
```

## Chaining and Readability

Wait! Chaining methods together makes data processing look like a pipeline. It's much easier to read and test than nested loops and `if` statements.

-   **`filter`**: Keep items that match.
-   **`map`**: Change every item.
-   **`flatMap`**: Map and then flatten the result.
-   **`reduce`** / **`fold`**: Combine items into one value.

## Summary

| Term | Description |
| :--- | :--- |
| **List** | The go-to collection for recursion |
| **::** | The "Cons" operator (Add to front) |
| **++** | Merging two collections |
| **Immutable** | Collections that cannot be changed (Safety!) |
| **Mutable** | Collections in `scala.collection.mutable` |
| **Best For** | Data processing, stream handling, and Big Data |
| **Logic** | "Functional transformations" |
| **Safety** | Prevents "Concurrent Modification" errors |
| **Modern** | Highly optimized for performance on the JVM |
| **Standard** | Use `List` or `Vector` as the default |
| **Identity** | Collections are a primary reason why Scala is used for data science |
