---
title: "Iterators"
description: "Iterators, begin(), end(), and the range-based for loop"
---

## What are C++ Iterators?

In **C++**, code is often the same for different data types. An **iterator** is a special object that acts like a "pointer" into a container (like a **`std::vector`** or **`std::list`**). It provides a uniform way to "step through" (iterate) any collection of data, regardless of how it's stored.

```cpp
#include <vector>

std::vector<int> nums = {1, 2, 3};

// Modern Iteration!
for (auto it = nums.begin(); it != nums.end(); ++it) {
    std::cout << *it << " "; // *it "dereferences" to the item!
}
```

## Comparisons: The Two Essential Points

Every STL container provides these two methods for starting and ending an iteration:

-   **`.begin()`**: Points to the **first** element.
-   **`.end()`**: Points to the element **FOLLOWING** the last element. (It's a "past-the-end" marker!)

> **Wait!** Never dereference `nums.end()`. It doesn't point to actual data; it's only meant for comparison.

## The Modern Solution: Range-Based `for`

Writing manual iterators with `begin()` and `end()` is verbose. Since **C++11**, we use the **Range-Based `for` loop**, which handles all the iterator logic for you under the hood.

```cpp
std::vector<std::string> names = {"Alpha", "Beta"};

// Cleaner, safer, and faster!
for (const auto& name : names) {
    std::cout << name << std::endl;
}
```

## Iterator Types

Wait! Different containers support different "levels" of iteration.

| Iterator Category | Capability | Containers |
| :--- | :--- | :--- |
| **Random Access** | Jump anywhere (`it + 10`) | `vector`, `array` |
| **Bidirectional** | Move forward AND back | `list`, `map`, `set` |
| **Forward** | Move forward ONLY | `forward_list`, `unordered_map` |

## Advanced: Const Iterators and Reverse Iterators

-   **`cbegin()` / `cend()`**: Used when you don't want to modify the items (Read-only).
-   **`rbegin()` / `rend()`**: Used to iterate through the container from **END** to **START**!

```cpp
std::vector<int> nums = {1, 2, 3};

// Reversing!
for (auto it = nums.rbegin(); it != nums.rend(); ++it) {
    std::cout << *it << " "; // 3 2 1
}
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Start** | `.begin()` |
| **End** | `.end()` (Past-the-last point!) |
| **Step** | `++it` (Move to the next item) |
| **Access** | `*it` (Dereference to the item) |
| **Read Only** | `.cbegin()` (Const iterator) |
| **Reverse** | `.rbegin()` (Reverse iterator) |
| **Best For** | Generic looping, search, distance calculation |
| **STL** | All Standard containers support iterators! |
| **Range** | `for (x : c)` is built on iterators! |
| **Distance** | `std::distance(start, it)` (Find the index!) |
| **Advance** | `std::advance(it, n)` (Walk forward n steps) |
| **Safety** | Modern iterators help catch "Out-of-bounds" errors |
| **Invalid** | Adding/removing to a vector can make old iterators useless! |
| **Generic** | Algorithms (`std::sort`) take iterators as arguments! |
| **Pointer** | Raw pointers are technically iterators for arrays! |
| **Legacy** | Understanding `it` is key for reading older C++ code |
| **Next** | `std::next(it)` (Returns a new iterator n steps ahead) |
| **Auto** | Use `auto` for iterator types; they are very long! |
| **Loop** | `while (it != end)` is the classic pattern |
| **Insert** | Many container methods take an `it` for POSITION |
| **C++20** | Added "Ranges" to make iterators even simpler! |
| **Sentinel** | `end()` is often called a "sentinel" value |
| **Equality** | Use `==` and `!=` to compare iterators |
| **Trait** | Check `iterator_traits<T>` for generic logic |
| **Efficiency** | `++it` (Prefix) is slightly faster than `it++` (Postfix)! |
