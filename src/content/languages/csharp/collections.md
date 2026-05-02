---
title: "Collections"
description: "Lists, Dictionaries, Arrays, and Enumerables in .NET"
---

## Arrays: Fixed Size

In **C#**, an **Array** is a fixed-size sequence of elements. Once created, you cannot change its length.

```csharp
string[] names = { "Alpha", "Beta", "Gamma" };
names[0] = "Omega";
```

## Lists: Dynamic Size

The **`List<T>`** is the most commonly used collection in C#. It acts like an array but grows automatically as you add items.

```csharp
var numbers = new List<int> { 1, 2, 3 };
numbers.Add(4);
numbers.Remove(1);
```

## Dictionaries: Key-Value Pairs

A **`Dictionary<TKey, TValue>`** provides fast O(1) lookups based on a unique key.

```csharp
var ages = new Dictionary<string, int> {
    ["Alice"] = 25,
    ["Bob"] = 30
};

int aliceAge = ages["Alice"];
```

## `IEnumerable<T>`: The Universal Interface

Wait! This is the most powerful interface in the .NET collection ecosystem. It represents a sequence of items that can be iterated (e.g., using `foreach`). Almost all collections implement `IEnumerable<T>`.

## Common Collections

| Type | Best Use Case... |
| :--- | :--- |
| **List<T>** | General purpose dynamic list |
| **Dictionary<K, V>**| Fast lookups by key |
| **HashSet<T>** | Unique collection with fast checks |
| **Queue<T>** | First-In-First-Out (FIFO) |
| **Stack<T>** | Last-In-First-Out (LIFO) |
| **LinkedList<T>** | Fast insertions in the middle |

> [!TIP]
> Use `List<T>` by default unless you have a specific reason (like fast key lookups) to use another collection type.

## Summary

| Term | Description |
| :--- | :--- |
| **Generics** | The `<T>` syntax that makes collections type-safe |
| **Capacity** | The internal size of a List before it needs to grow |
| **Count** | The actual number of items in a collection |
| **indexer** | The `[]` syntax for accessing items |
| **TryGet** | `TryGetValue` - Safely getting a value from a Dictionary |
| **Logic** | Data organization is key to performance |
| **Safety** | Generics prevent "unboxing" and runtime type errors |
| **Modern** | Spans and Memory types for high-performance collections |
| **Standard** | Use `System.Collections.Generic` namespace |
| **Empty** | `Array.Empty<T>()` is more efficient than `new T[0]` |
| **Identity** | Collections are Reference Types! |
