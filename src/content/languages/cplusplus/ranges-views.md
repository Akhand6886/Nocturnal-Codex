---
title: "Ranges & Views"
description: "C++20 range library and pipeline (|) composition"
---

## What are C++ Ranges?

Introduced in **C++20**, **Ranges** are a massive update to the **C++** Standard Template Library. They provide a much simpler and more powerful way to work with collections of data. Instead of passing two iterators (`begin` and `end`) to every algorithm, you can just pass the entire container once.

```cpp
#include <ranges>
#include <algorithm>
#include <vector>

std::vector<int> nums = {3, 1, 4, 1, 5, 9, 2};

// One function call, no iterator begin/end pairs!
std::ranges::sort(nums);
```

## Comparisons: Traditional Algorithm vs. Modern Range

| Feature | Traditional | Modern Range |
| :--- | :--- | :--- |
| **Logic** | Requires `begin()` and `end()` | Pass the whole `nums` object. |
| **Pipes** | Impossible; use nested loops | Use the `|` (Pipe) operator! |
| **Copy** | Often creates new collections | Uses "Views" (Lazy processing!) |

## The Power of Views (Lazy Processing)

A **View** doesn't modify the original collection and doesn't create a new one. It's "Lazy," meaning the work (filtering, transforming) is only done when you actually read the data!

```cpp
#include <iostream>
#include <vector>
#include <ranges>

namespace views = std::views;
std::vector<int> nums = {1, 2, 3, 4, 5, 6};

// Pipe logic together!
auto results = nums 
    | views::filter([](int n) { return n % 2 == 0; }) // Take even numbers!
    | views::transform([](int n) { return n * n; })  // Square them!
    | views::take(2); // Take only the first two from the results!

// { 4, 16 }
```

> **Wait!** The variables inside `results` aren't calculated until the `for` loop actually hits them! This saves a massive amount of memory and time.

## Most Common Views

| View | Purpose | Result |
| :--- | :--- | :--- |
| **filter(f)** | Logic filtering | Keep only values where `f` is true. |
| **transform(f)**| Map/Transformation | Apply function `f` to all items. |
| **take(n)** | Limit size | Take the FIRST `n` items. |
| **drop(n)** | Offset | Skip the FIRST `n` items. |
| **reverse** | Inverse | Iterate through the container backwards. |
| **keys/values** | Map iteration | Extract only the key or value from a map. |

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **Range** | `std::ranges::sort(v)` | Simple algorithms for whole collections |
| **View** | `v | views::filter(f)` | Lazy, non-owning processing |
| **Pipe (|)** | Combine many tools | Functional-style "Pipeline" code |
| **Lazy** | Only compute if read | High performance and memory efficiency |
| **Best For** | Data processing, filtering, functional C++ |
| **Modern** | C++20 required! |
| **Safe** | Impossible to miss an `end()` iterator! |
| **All-of** | `std::ranges::all_of(v, f)` | Check every item in a container |
| **Common** | `std::views::all` | Represent an entire container as a view |
| **Span** | `std::span` (Non-owning view of a raw array!) |
| **STL** | Standard algorithms are now range-compatible! |
| **Adaptor** | Use `|` with "Range Adaptors" |
| **Check** | Use `std::ranges::range` concept! |
| **Distance** | `std::ranges::distance(v)` |
| **Size** | `std::ranges::size(v)` |
| **Begin** | `std::ranges::begin(v)` |
| **Sentinel** | Concept for the end of a range |
| **Pointer** | Raw arrays are technically ranges! |
| **String** | `std::string_view` (Fast, read-only string view!) |
| **Infinite** | `views::iota(1)` (Generate numbers 1, 2, 3...!) |
| **Join** | `views::join` (Flatten nested ranges! - C++23) |
| **Split** | `views::split` (Split a range into chunks!) |
| **Zip** | `views::zip` (Combine multiple ranges! - C++23) |
| **Enumerate** | `views::enumerate` (Keep track of the index! - C++23) |
| **Performance** | As fast as manual code, but much safer |
| **Composition**| Combine many small operations into a powerful tool |
