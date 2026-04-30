---
title: "std::optional & std::variant"
description: "Safe handling of optional values and type-safe unions (C++17)"
---

## What is `std::optional`?

Introduced in **C++17**, **`std::optional`** is a type-safe way to represent a value that **may or may not exist**. Prior to this, developers used "sentinel" values like `-1` or `nullptr`, which are error-prone and hard to maintain.

```cpp
#include <optional>
#include <string>

std::optional<std::string> findUser(int id) {
    if (id == 1) return "Alpha";
    return std::nullopt; // Explicitly say "Value not found!"
}

auto result = findUser(1);

if (result) {
    // Access with * or ->
    std::cout << "User: " << *result << std::endl;
}
```

## Creating Optional Values

-   **`std::nullopt`**: Represents an empty optional (No value).
-   **`.value_or(v)`**: Returns the value if it exists, otherwise returns `v`.
-   **`.has_value()`**: Returns `true` if the optional contains a value.

```cpp
auto user = findUser(2);
std::cout << user.value_or("Guest") << std::endl; // Returns "Guest"!
```

## What is `std::variant`?

A **`std::variant`** is a type-safe version of a C-style `union`. It can hold **exactly one** of its alternative types at a time. It's much safer than a union because it tracks which type it's currently holding and prevents accessing it as the wrong type.

```cpp
#include <variant>

// Can be an int OR a string!
std::variant<int, std::string> value;

value = 10;
value = "Hello!"; // Now it's a string!

// Access with std::get!
std::cout << std::get<std::string>(value) << std::endl;
// std::get<int>(value); // ERROR: Throws std::bad_variant_access!
```

## Modern Way to Handle Variants: `std::visit`

Wait! Using `std::get` is repetitive. **`std::visit()`** allows you to apply a "visitor" function that automatically handles every possible type the variant can be.

```cpp
std::visit([](auto&& arg) {
    std::cout << "Value: " << arg << std::endl;
}, value);
```

## Summary

| Feature | Description | Best Use Case... |
| :--- | :--- | :--- |
| **optional** | A value that might be empty | Find operations, optional config |
| **variant** | A choice of different types | Error handling, complex state |
| **nullopt** | Explicit "No content" | Default empty state |
| **visit** | The best way to handle variants | Processing heterogeneous data |
| **Modern** | C++17 required! |
| **Safe** | Prevents "nullptr" crashes and bad type casts |
| **Best For** | Robust error handling and type-safe systems |
| **Logic** | Returns `true/false` when used in an `if` |
| **Size** | `optional` size is `value_size + bool_flag` |
| **Value** | `.value()` throws exception if optional is empty! |
| **Deref** | `*opt` is fast but unsafe! (Like a raw pointer!) |
| **Emplace** | `.emplace()` constructs the value in-place! |
| **Union** | `variant` provides the speed of unions with safety! |
| **Alternative**| Check types with `std::holds_alternative<T>(v)` |
| **Index** | Check current type index with `.index()` |
| **Exception** | `bad_variant_access` if accessing wrong type |
| **Empty State** | `variant` is usually never empty! |
| **Monadic** | C++23 added `.and_then()` and `.transform()`! |
| **API** | Functions returning optional values are self-documenting |
| **Memory** | Uses static memory with zero heap allocation! |
| **Deduce** | Template deduction works perfectly with these! |
