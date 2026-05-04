---
title: "Ranges (C++20)"
description: "Functional-style composition and lazy evaluation for containers"
---

## The Problem: Iterators are Verbose

Before C++20, simple operations like sorting or filtering a vector required passing `v.begin()` and `v.end()` everywhere. Chaining multiple operations (e.g., "filter even numbers, then square them") resulted in complex, nested code or temporary containers.

## The Solution: The Ranges Library

**Ranges** unify iterators and containers. They allow you to pass the container itself and provide **Range Views**—composable, lazy-evaluated transformations.

## 1. Simplified Algorithms

No more `begin()` and `end()` for standard operations.

```cpp
#include <ranges>
#include <algorithm>
#include <vector>

std::vector<int> v = {4, 1, 3, 2};
std::ranges::sort(v); // Sorts the entire range
```

## 2. Range Views and Piping

Views do NOT own the data; they are lightweight proxies. The `|` (pipe) operator allows for elegant, readable composition.

```cpp
#include <iostream>
#include <ranges>
#include <vector>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6};

    auto results = numbers 
        | std::views::filter([](int n) { return n % 2 == 0; }) // Lazy filter
        | std::views::transform([](int n) { return n * n; })    // Lazy square
        | std::views::take(2);                                // Take first 2

    for (int n : results) {
        std::cout << n << " "; // Output: 4 16
    }
}
```

## 3. Key Concepts

- **Range**: Something you can iterate over (Containers, Views).
- **View**: A range that is cheap to copy and usually lazy.
- **Adaptor**: Something that takes a range and returns a view (e.g., `filter`, `transform`).

## 4. Lazy Evaluation

The transformations in the example above are only calculated **when you iterate** over `results`. If you never iterate, no work is done. This allows for processing infinite sequences (like `std::views::iota(1)`).

## 5. Why use Ranges?

1.  **Readability**: Functional style is easier to follow than manual loops.
2.  **Safety**: Reduces "iterator mismatch" errors.
3.  **Efficiency**: Lazy evaluation avoids unnecessary allocations and computations.
4.  **Modernity**: Aligns C++ with modern functional patterns found in Rust, Kotlin, and Swift.

## Summary Checklist
- [x] Use `std::ranges` for standard algorithms.
- [x] Use `std::views` and the `|` operator for chaining.
- [x] Views are lazy; they don't modify the source container.
- [x] Use `std::ranges::to<std::vector>()` (C++23) to convert views back to containers.
- [x] Perfect for data pipelines and complex filtering logic.
---
