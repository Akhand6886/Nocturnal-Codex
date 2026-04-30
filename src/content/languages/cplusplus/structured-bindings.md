---
title: "Structured Bindings"
description: "Decomposing tuples, pairs, and structs (C++17)"
---

## What are Structured Bindings?

Introduced in **C++17**, **Structured Bindings** are a powerful tool that allows you to "decompose" complex objects like **`std::pair`**, **`std::tuple`**, or even simple structs into several individual variables in one single line. This is much more readable than using `.first` or `.second`.

```cpp
#include <map>
#include <string>

std::map<int, std::string> users = {{1, "Alpha"}, {2, "Beta"}};

// Modern way!
for (const auto& [id, name] : users) {
  std::cout << id << ": " << name << std::endl;
}
```

## How to use Structured Bindings

You use the **`auto`** keyword followed by a list of variables inside square brackets `[]`.

### 1. With Structs

Decompose a basic struct directly into named variables.

```cpp
struct Point { int x, y; };
Point p{10, 20};

// Decompose into x and y!
auto [x, y] = p;
std::cout << x << ", " << y << std::endl; // 10, 20
```

### 2. With `std::pair` and `std::tuple`

This is extremely common when functions return multiple values.

```cpp
#include <tuple>

std::tuple<int, string, bool> getStatus() {
    return {200, "OK", true};
}

// Cleanly unpack all three values!
auto [code, msg, success] = getStatus();
```

## Comparisons: Access by Reference vs. Copy

Wait! By default, `auto [x, y] = obj` will create **copies** of the data. To avoid this (especially for large strings or vectors), use a reference.

-   **`auto [x, y] = obj`**: Creates new copies.
-   **`auto& [x, y] = obj`**: Creates references (Modifies the original!).
-   **`const auto& [x, y] = obj`**: Creates read-only references (High performance!).

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **Simple** | `auto [a, b]` | Unpack into new variables |
| **Reference** | `auto& [a, b]` | Unpack as references |
| **Constant** | `const auto& [a, b]` | Read-only access |
| **Best For** | Looping over maps, returning multiple values |
| **Modern** | C++17 required! |
| **Cleaner** | No more `.first` and `.second`! |
| **Deduce** | Compiler automatically calculates the types |
| **Limits** | You must unpack ALL members of the struct! |
| **Arrays** | Also works with fixed-size arrays! |
| **Performance** | Zero cost compared to manual access |
| **Return** | Ideal for `std::map::insert()` return values |
| **Nested** | Use inside loops for massive readability boost |
| **Safety** | Prevents forgetting to access the second half of a pair |
| **Alias** | Effectively gives data members a local nickname |
| **Standard** | Replacing the older `std::tie()` approach |
| **Structs** | Works only with public data members |
| **Order** | Must follow the order defined in the struct! |
