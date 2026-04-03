---
title: "Algorithms"
description: "std::sort, std::find, std::transform, and lambda expressions"
---

## What are STL Algorithms?

The **Standard Template Library (STL)** provides dozens of pre-written, highly optimized **Algorithms** that work correctly with **all** containers. Instead of writing your own `for` loops to sort, search, or transform data, we use the functions from the **`<algorithm>`** header.

```cpp
#include <algorithm>
#include <vector>

std::vector<int> nums = {3, 1, 4, 1, 5};

// SORTing into ascending order!
std::sort(nums.begin(), nums.end()); // 1, 1, 3, 4, 5
```

## Comparisons: The Two Essential Points

Any algorithm takes at least two arguments, which define the **RANGE** of data to work on:

-   **`nums.begin()`**: The start of the work.
-   **`nums.end()`**: The point where it stops.

> **Wait!** You can use these algorithms on ANY part of a container, not just the whole thing! Just change the iterators!

## 1. Searching: `std::find`

Find the first element that matches a specific value.

```cpp
auto it = std::find(nums.begin(), nums.end(), 5);

if (it != nums.end()) {
    std::cout << "Found 5!" << std::endl;
}
```

## 2. Transforming: `std::transform`

This is the C++ equivalent of JavaScript's `.map()`. It applies a function to every item in a range and stores the result.

```cpp
std::vector<int> squares(nums.size());

// Square all numbers!
std::transform(nums.begin(), nums.end(), squares.begin(), [](int n) {
    return n * n;
});
```

## 3. Lambda Expressions (Modern C++)

Wait! What was `[](int n) { return n * n; }`? That's a **Lambda Expression** (an "anonymous" inline function). It's the most common way to pass custom logic to algorithms.

```cpp
// Sort with a custom logic: descending order!
std::sort(nums.begin(), nums.end(), [](int a, int b) {
    return a > b;
});
```

## Summary

| Algorithm | Purpose | Result |
| :--- | :--- | :--- |
| **std::sort** | Reorder elements | Ascending order (Default) |
| **std::find** | Search for a value | Iterator to the element |
| **std::count** | Count occurrences | An integer count |
| **std::reverse** | Flip the range | Inverse order |
| **std::transform**| Perform logic on all | NEW processed values |
| **std::copy_if** | Filter items | NEW subset of the data |
| **Best For** | Data manipulation, search, sort, mapping |
| **Library** | `#include <algorithm>` | All standard tools! |
| **Performance** | Usually as fast or faster than a manual manual `for` loop! |
| **Binary S** | `std::binary_search` (Much faster for SORTED data!) |
| **Unique** | `std::unique` (Remove duplicates!) |
| **Accumulate** | `std::accumulate` (Total sum - in `<numeric>`) |
| **Modern** | C++20 added "Ranges" (`std::ranges::sort(nums)`) |
| **All-of** | `std::all_of` (Are all items true?) |
| **Any-of** | `std::any_of` (Is any item true?) |
| **None-of** | `std::none_of` (Are no items true?) |
| **Remove-if** | `std::remove_if` (Filter out bad items!) |
| **Stable** | `std::stable_sort` (Maintain original order for ties!) |
| **Partial** | `std::partial_sort` (Sort ONLY the top N items!) |
| **Heap** | `std::make_heap` (Building high-speed priority queues!) |
| **Shuffle** | `std::shuffle` (Randomize the collection!) |
| **Min/Max** | `std::min_element` and `std::max_element` |
| **Set** | `std::set_intersection` (Math set overlap!) |
| **Lexico** | `std::lexicographical_compare` (String-style sorting!) |
| **Permute** | `std::next_permutation` (Generate all orderings!) |
| **Replace** | `std::replace` (Switch one value for another!) |
| **Filling** | `std::fill` (Set entire range to one value!) |
| **Generate** | `std::generate` (Set range to a sequence of values!) |
| **Parallel** | `std::execution::par` (Run sort on ALL CPU cores!) |
