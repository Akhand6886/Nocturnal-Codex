---
title: "Streams API"
description: "Mastering functional programming and data processing in Java"
---

## What is the Streams API?

Introduced in Java 8, the **Streams API** provides a functional way to process collections of objects. A Stream is not a data structure (it doesn't store data); instead, it conveys elements from a source (like a List or Set) through a pipeline of computational steps.

## 1. The Stream Pipeline

A stream pipeline consists of:
1.  **Source**: (e.g., `list.stream()`)
2.  **Intermediate Operations**: Return a new stream (e.g., `filter`, `map`, `sorted`). These are **lazy** and don't execute until a terminal operation is called.
3.  **Terminal Operation**: Produces a result or side-effect (e.g., `collect`, `forEach`, `reduce`, `count`).

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

List<String> filteredNames = names.stream()
    .filter(name -> name.length() > 3)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());

// Result: ["ALICE", "CHARLIE", "DAVID"]
```

## 2. Common Operations

### Filter and Map
- `filter(Predicate)`: Keeps elements that match the condition.
- `map(Function)`: Transforms each element into something else.

### Reduce
Combines all elements into a single result (e.g., sum, concatenation).

```java
int sum = numbers.stream().reduce(0, (a, b) -> a + b);
```

### FlatMap
Used when each element of a stream can produce multiple elements (e.g., a list of lists).

```java
List<String> allTags = posts.stream()
    .flatMap(post -> post.getTags().stream())
    .distinct()
    .collect(Collectors.toList());
```

## 3. Parallel Streams

You can process data in parallel across multiple CPU cores by simply calling `.parallelStream()` instead of `.stream()`. 

**CAUTION**: Only use this for large datasets and stateless operations to avoid overhead and concurrency bugs.

## 4. Collectors

The `Collectors` class provides many useful reduction operations:
- `groupingBy`: Group elements by a property (like SQL `GROUP BY`).
- `joining`: Concatenate strings.
- `summarizingInt`: Get min, max, average, and sum in one go.

```java
Map<Integer, List<String>> namesByLength = names.stream()
    .collect(Collectors.groupingBy(String::length));
```

## Summary Checklist
- [x] Streams are functional, not storage.
- [x] Intermediate operations are lazy.
- [x] Terminal operations trigger the execution.
- [x] Use `map` for transformations and `filter` for selection.
- [x] Use `flatMap` for nested structures.
- [x] Parallel streams can boost performance for heavy computations.
---
