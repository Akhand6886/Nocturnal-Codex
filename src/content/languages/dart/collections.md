---
title: "Collections"
description: "Lists, Sets, and Maps in the Dart language"
---

## Lists (Arrays)

In **Dart**, a **List** is an ordered group of items.

```dart
var fruits = ['Apple', 'Banana'];
fruits.add('Cherry');
print(fruits[0]); // Apple
```

## Sets (Unique)

A **Set** is an unordered collection of unique items. It is much faster than a List for checking if an item exists.

```dart
var tags = {'flutter', 'dart', 'ui'};
tags.add('dart'); // Duplicate, will not be added
```

## Maps (Key-Value)

A **Map** is a collection of key-value pairs.

```dart
var ages = {
  'Alice': 25,
  'Bob': 30,
};
print(ages['Alice']);
```

## Collection Operators

Wait! Dart has some very powerful operators for combining and manipulating collections.

1.  **Spread Operator (`...`)**: Insert all elements of one collection into another.
2.  **Collection If**: Add an item to a list only if a condition is true.
3.  **Collection For**: Build a list based on another list.

```dart
var moreFruits = ['Grape', ...fruits];
var activeUsers = [
  'Admin',
  if (isLogged) 'User',
];
```

## Summary

| Type | Best Use Case |
| :--- | :--- |
| **List<T>** | Ordered sequence of items (Default) |
| **Set<T>** | Collection of unique items |
| **Map<K, V>**| Key-value lookups |
| **...** | Merging collections |
| **forEach** | Running a function for every item |
| **map** | Transforming every item (returns an Iterable) |
| **Best For** | Organizing and processing application data |
| **Logic** | Strong types ensure all items match the collection type |
| **Safety** | Generics prevent adding the wrong type of data |
| **Modern** | Collection If/For make UI code (Flutter) much cleaner |
| **Standard** | Collections are mutable by default; use `const` for immutability |
| **Identity** | Collections are objects that implement `Iterable` |
