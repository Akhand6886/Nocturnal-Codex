---
title: "Containers"
description: "std::vector, std::list, std::map, std::set, and std::array"
---

## What are C++ Containers?

In **C++**, code is often the same for different data types. Instead of manually allocating memory for every collection of data, we use **Containers** from the Standard Template Library (STL). These are pre-written, highly optimized class templates that manage their own memory.

```cpp
#include <vector>

// Dynamic array! 
std::vector<int> nums = {1, 2, 3};
nums.push_back(4); // Automatically grows!
```

## Comparisons: Which one to use?

| Container | Structure | Best Use Case... |
| :--- | :--- | :--- |
| **std::vector** | Dynamic Array | 90% of the time! (Fast access, contiguous memory) |
| **std::list** | Doubly Linked List | Fast insertions/deletions anywhere. |
| **std::map** | Balanced Binary Tree | Key-Value pairs (Ordered by key). |
| **std::unordered_map**| Hash Table | Key-Value pairs (Unordered, but FASTER). |
| **std::set** | Balanced Binary Tree | Unique items only. |
| **std::array** | Fixed-size Array | When size is known at compile-time. |

## 1. `std::vector` (The 90% Solution!)

A **`std::vector`** is a dynamic array that grows automatically. Because its memory is contiguous (all items are next to each other in RAM), it's the fastest container for almost every task.

```cpp
std::vector<std::string> names;
names.push_back("Alpha");
names.emplace_back("Beta"); // Faster: Construct in-place!

// Access by index!
std::cout << names[0] << std::endl;
```

## 2. Associative: `std::map` and `std::set`

Maps allow you to associate a **key** with a **value** (like a dictionary), and Sets store only **unique** items.

```cpp
#include <map>

std::map<std::string, int> scores;
scores["Alpha"] = 100;
scores["Beta"] = 50;

// Iterating over a map!
for (const auto& [name, score] : scores) {
    std::cout << name << ": " << score << std::endl;
}
```

## 3. Fixed-size: `std::array` (Modern C++)

Instead of using C-style arrays (`int arr[3]`), use **`std::array`**. It provides the same performance but adds safety features like `.size()` and `.at()`.

```cpp
#include <array>

std::array<int, 3> points = {10, 20, 30};
// points.push_back(40); // ERROR: Fixed size!
```

## Summary

| Type | Examples | Description |
| :--- | :--- | :--- |
| **vector** | `std::vector<int>` | Dynamic, contiguous array |
| **map** | `std::map<k, v>` | Ordered Key-Value pairs |
| **unordered_map**| `std::unordered_map` | Fast Hash Table |
| **set** | `std::set<int>` | Collection of UNIQUE items |
| **list** | `std::list<int>` | Linked-list (no random access) |
| **array** | `std::array<int, 3>` | Fixed-size; no memory overhead |
| **deque** | `std::deque<int>` | Fast additions to front AND back |
| **Best For** | Data storage, retrieval, and organization |
| **STL** | Standard Template Library (Massive speed boost!) |
| **Iterate** | Use the range-based `for` loop! |
| **emplace** | `emplace_back` is faster than `push_back`! |
| **Complexity** | O(1) for vector access; O(log n) for map search |
| **Reserve** | Use `vec.reserve(n)` to avoid reallocations! |
| **Clear** | `container.clear()` |
| **Empty** | `container.empty()` (Faster than checking size!) |
| **Capacity** | Vector keeps extra space to avoid frequent growth |
| **Iterator** | All STL containers support iterators! |
| **Modern** | C++20 added "Eraze-if" for cleaner removals |
| **Algorithm** | Use `<algorithm>` with your containers! |
| **Safety** | Modern containers prevent memory leaks and overflows |
| **Pointer** | Storing smart pointers in containers is safe and useful |
| **Reference** | Be careful with references to items (reallocations!) |
| **Generic** | Templates allow any object to be stored! |
| **Hash** | Provide `std::hash` to store custom keys in unordered_map |
| **Compare** | Maps need `<` operator for custom key types |
| **Cost** | Balanced trees have more memory overhead than arrays |
