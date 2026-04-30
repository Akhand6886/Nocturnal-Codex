---
title: "Collections Framework"
description: "List, Set, Map, ArrayList, HashSet, and HashMap"
---

## What is the Collections Framework?

In **Java**, if you want to store a group of objects (like a list of users or a dictionary of scores), you use the **Java Collections Framework (JCF)**. It provides a set of pre-built classes and interfaces that are highly optimized for common data storage tasks.

It lives in the **`java.util`** package.

```java
import java.util.*;

// Interface 'List' = The "what"
// Class 'ArrayList' = The "how"
List<String> names = new ArrayList<>();
names.add("Alpha");
names.add("Beta");
```

## Comparisons: The Three Essential Interfaces

Wait! Before you use a collection, you must pick the right **Interface** based on how you want to store your data:

| Interface | Behavior | Implementation Class |
| :--- | :--- | :--- |
| **List** | Ordered; allows duplicates. | **ArrayList**, LinkedList |
| **Set** | Unordered; UNIQUE items only. | **HashSet**, TreeSet |
| **Map** | Key-Value Pairs. | **HashMap**, TreeMap |

## 1. `List` (Standard Workhorse)

An **`ArrayList`** is a dynamic array that grows automatically. Because its items are stored next to each other in memory, it's the fastest option for 90% of your tasks.

```java
List<Integer> nums = new ArrayList<>();
nums.add(10);
nums.get(0); // Quick access!
```

## 2. `Set` (Uniqueness Matters)

A **`HashSet`** is unordered, but it's very fast at checking if an item already exists. It uses the object's `hashCode()` to find data almost instantly.

```java
Set<String> uniqueColors = new HashSet<>();
uniqueColors.add("Red");
uniqueColors.add("Red"); // Ignored! (Only one "Red" allowed!)
```

## 3. `Map` (Key-Value Dictionary)

A **`HashMap`** associates a **key** with a **value**. Like a real dictionary: the word is the "key," and the definition is the "value."

```java
Map<String, Integer> scores = new HashMap<>();
scores.put("Alpha", 100);
scores.put("Beta", 50);

System.out.println(scores.get("Alpha")); // Prints 100!
```

## Summary

| Feature | Method / Syntax | Purpose |
| :--- | :--- | :--- |
| **Add** | `.add(v)` or `.put(k, v)` | Put an item in |
| **Search** | `.contains(v)` or `.containsKey(k)` | Check if x exists |
| **Size** | `.size()` | Number of items |
| **Order** | `ArrayList` (Ordered) vs `HashSet` (Random) | Logic of organization |
| **Empty** | `.isEmpty()` | Faster than checking size! |
| **Clear** | `.clear()` | Wipe the collection |
| **Best For** | Lists, unique sets, dictionaries, generic storage |
| **Interface** | Pick the "List" or "Map" first! |
| **Class** | Pick the "ArrayList" or "HashMap" second! |
| **Iterator** | Standard way to step through any collection |
| **Stream** | Modern high-speed processing (Java 8+) |
| **Generics** | `List<String>` ensures type safety! |
| **Wrapper** | You MUST use `Integer` instead of `int`! |
| **Null** | Most collections allow at least one `null` value |
| **Collections**| Use `Collections.sort(list)` (The helper class!) |
| **Modern** | `List.of("A", "B")` (Unmutable small lists! - Java 9+) |
| **Performance** | `ArrayList` = O(1) access; `HashMap` = O(1) search |
| **Thread** | Standard collections are NOT safe for multi-threading! |
| **Synchronized**| Use `Collections.synchronizedList(l)` for thread safety |
| **Concurrent** | Special high-speed thread-safe collections in `java.util.concurrent` |
| **Algorithm** | Search, sort, reverse logic is pre-built! |
| **Framework** | Replacing the older, slower `Vector` and `Hashtable` |
| **Memory** | JVM manages all memory; no manual free()! |
| **Identity** | Set equality depends on `equals()` and `hashCode()`! |
| **Safe** | Impossible to "go past the end" like in C arrays! |
| **Tree** | `TreeMap` keeps keys in alphabetical/natural order! |
