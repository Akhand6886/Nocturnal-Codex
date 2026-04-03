---
title: "Streams API"
description: "Functional processing, intermediate/terminal ops, and parallel streams"
---

## What is the Streams API?

Introduced in **JAVA 8**, the **Streams API** is a functional way to process collections of data. Instead of writing long, nested `for` loops and `if` statements, you can write concise "pipelines" of logic.

A Stream is **NOT** a data structure (it doesn't store anything!). It's a "conveyer belt" that carries your data through various transformations.

```java
import java.util.*;
import java.util.stream.*;

List<String> names = List.of("Alpha", "Beta", "Gamma");

// Modern processing!
List<String> results = names.stream()
    .filter(n -> n.startsWith("A")) // 1. Filter!
    .map(String::toUpperCase)      // 2. Map!
    .collect(Collectors.toList());  // 3. Final Result!
```

## Comparisons: The Two Types of Operations

Wait! A Stream pipeline consists of three distinct parts:

1.  **Source**: The data you're starting with (`names.stream()`).
2.  **Intermediate**: Operations that return a **NEW** stream. These are **Lazy** (they don't run until the end!).
3.  **Terminal**: The final operation that calculates the result and "closes" the stream.

| Category | Methods | Purpose |
| :--- | :--- | :--- |
| **Intermediate**| `.filter()`, `.map()`, `.sorted()` | Process the data logic |
| **Terminal** | `.forEach()`, `.collect()`, `.count()`| Produce the final value |

## 1. Transforming: `.map()`

Apply a function to every item in the stream.

```java
List<Integer> squares = nums.stream()
    .map(n -> n * n)
    .toList(); // Modern Java 16+ way!
```

## 2. Filtering: `.filter()`

Pick only the items that pass a specific test.

```java
long count = names.stream()
    .filter(n -> n.length() > 4)
    .count();
```

## Why use Streams?

1.  **Readability**: Most stream pipelines read like plain English.
2.  **Parallelism**: You can run the entire pipeline on **ALL** your CPU cores at once just by changing `.stream()` to **`.parallelStream()`**.
3.  **Efficiency**: Because intermediate operations are "Lazy," the JVM can optimize the work (e.g., stopping early after finding one match).

## Summary

| Feature | Method / Syntax | Purpose |
| :--- | :--- | :--- |
| **Stream** | `.stream()` | Start the pipeline |
| **Filter** | `.filter(x -> ...)` | Keep based on logic |
| **Map** | `.map(x -> ...)` | Transform every item |
| **Sort** | `.sorted()` | Reorder items |
| **Collect** | `.collect()` | Save back to a List/Set |
| **Each** | `.forEach()` | Run logic on every item |
| **Parallel** | `.parallelStream()` | High-speed multi-core! |
| **Best For** | Processing collections, bulk data, functional logic |
| **Modern** | Java 8 required! |
| **Lazy** | Logic doesn't run until a terminal op is called! |
| **One-time**| You cannot reuse a stream once it's closed! |
| **Infinite** | `Stream.generate(...)` (Endless data stream!) |
| **Reduce** | `.reduce(0, (a, b) -> a + b)` (Total sum!) |
| **Find** | `.findFirst()` or `.findAny()` (Optimum search!) |
| **Matched** | `.anyMatch()`, `.allMatch()`, `.noneMatch()` |
| **Distinct** | `.distinct()` (Remove duplicates automatically!) |
| **Limit/Skip**| `.limit(5)`, `.skip(2)` (Control data size!) |
| **Collector**| Use `Collectors.joining(", ")` for strings! |
| **Safety** | Streams do not modify the original collection! |
| **Chain** | Cleanly link 10+ operations together |
| **Grouping** | `Collectors.groupingBy()` (Powerful database-style grouping!) |
| **Optional** | Many terminal ops return `Optional<T>` for safety |
| **Functional**| Uses "Lambda Expressions" (`x -> x + 1`) |
| **Reference** | `String::toUpperCase` (The clean `::` syntax!) |
| **Performance**| As fast as for-loops for most tasks |
| **Debug** | Use `.peek()` to see data as it flows through! |
| **Pipeline** | The modern standard for all Java data work |
