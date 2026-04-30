---
title: "Iterators"
description: "Iterating safely through collections using Iterator and ListIterator"
---

## What is an Iterator?

In **Java**, an **Iterator** is an object that allows you to step through (traverse) a collection, one element at a time. While you can use a `for-each` loop for most simple tasks, an `Iterator` gives you more control, such as the ability to safely **remove** elements while you are iterating.

```java
import java.util.*;

List<String> bugs = new ArrayList<>(List.of("NullPtr", "Deadlock", "RaceCondition"));
Iterator<String> it = bugs.iterator();

while (it.hasNext()) {
    String bug = it.next();
    if (bug.equals("Deadlock")) {
        it.remove(); // Safely remove while iterating!
    }
}
```

## Comparisons: `Iterator` vs `ListIterator`

Wait! If you are working specifically with a **List**, you can use the more powerful **`ListIterator`**.

| Feature | Iterator | ListIterator |
| :--- | :--- | :--- |
| **Direction** | Forward only. | Forward and Backward. |
| **Modification**| `.remove()` only. | `.remove()`, `.add()`, `.set()`. |
| **Index** | No index access. | Access current index with `.nextIndex()`. |

```java
ListIterator<String> listIt = bugs.listIterator();
while (listIt.hasNext()) {
    System.out.println("Forward: " + listIt.next());
}
while (listIt.hasPrevious()) {
    System.out.println("Backward: " + listIt.previous());
}
```

## The `Iterable` Interface

Any class that implements the **`Iterable`** interface can be the target of a "for-each" loop. All standard Java collections (List, Set, etc.) implement this!

```java
// Under the hood, this uses an Iterator!
for (String bug : bugs) {
    System.out.println(bug);
}
```

> [!WARNING]
> Never use `list.remove(item)` inside a for-each loop. This will throw a **`ConcurrentModificationException`**. Always use `iterator.remove()` instead!

## Summary

| Term | Description |
| :--- | :--- |
| **.hasNext()** | Returns true if there are more elements |
| **.next()** | Returns the next element and moves the pointer |
| **.remove()** | Deletes the last element returned by `.next()` |
| **.hasPrevious()**| Only for `ListIterator` (Backwards check) |
| **Iterable** | Interface that allows the "for-each" syntax |
| **Best For** | Safe modification, bidirectional traversal, custom containers |
| **Safe** | Prevents crashes during collection modification |
| **Fail-Fast** | Throws error if collection changes outside the iterator |
| **Standard** | Established and trusted worldwide for 25+ years |
| **Memory** | Low overhead; just points to existing data |
| **Cursors** | Internal pointer that sits BETWEEN elements |
| **Mutation** | Use `ListIterator` to swap or add items on the fly |
| **Interface** | Part of the `java.util` core framework |
| **Legacy** | Replaces the older, more limited `Enumeration` |
| **Functional**| `iterator.forEachRemaining(System.out::println);` |
| **Infinite** | You can create custom iterators that never end! |
| **Efficiency**| O(1) time complexity for `next()` and `hasNext()` |
| **Generic** | Use `<T>` to keep your iterations type-safe |
| **Cleanup** | Iterators don't need manual closing! |
| **Hierarchy**| `Iterator` -> `ListIterator` |
