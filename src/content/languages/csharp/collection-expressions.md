---
title: "Collection Expressions"
description: "A unified syntax for creating and combining collections (C# 12+)"
---

## What are Collection Expressions?

In **C# 12**, a new syntax was introduced using square brackets **`[ ]`** to create and initialize collections. This provides a single, consistent way to work with Arrays, Lists, Spans, and more.

```csharp
// Before C# 12
int[] oldArray = new int[] { 1, 2, 3 };
List<int> oldList = new List<int> { 1, 2, 3 };

// With C# 12 Collection Expressions
int[] newArray = [1, 2, 3];
List<int> newList = [1, 2, 3];
Span<int> newSpan = [1, 2, 3];
```

## The Spread Operator (`..`)

Wait! You can also use the **Spread Operator** to combine multiple collections into a new one.

```csharp
int[] first = [1, 2];
int[] second = [3, 4];

int[] combined = [..first, ..second, 5]; // [1, 2, 3, 4, 5]
```

## Why use them?

1.  **Consistency**: You no longer need to remember if you should use `new[]`, `new List<T>`, or `Stackalloc`. Just use `[]`.
2.  **Performance**: The compiler is smart enough to choose the most efficient way to allocate memory for your specific collection.
3.  **Cleanliness**: Removes the "noise" of repeated type names during initialization.

## Summary

| Feature | Syntax | Description |
| :--- | :--- | :--- |
| **Brackets** | `[1, 2, 3]` | Unified collection initialization |
| **Spread** | `..collection`| Merging collections into one |
| **Target** | Type Inference | The compiler knows the type from the variable |
| **Best For** | Arrays, Lists, Spans, Sets, and custom collections |
| **Logic** | "One syntax to rule them all" |
| **Safety** | Prevents null exceptions during initialization |
| **Modern** | Brings C# parity with languages like Python and JavaScript |
| **Efficiency**| Optimized by the compiler for each target type |
| **Standard** | Use `[]` for all collection initialization in C# 12+ |
| **Clean** | Great for passing collections as arguments to methods |
