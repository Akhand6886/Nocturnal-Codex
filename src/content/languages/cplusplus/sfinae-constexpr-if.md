---
title: "SFINAE & constexpr if"
description: "Substitution Failure Is Not An Error and compile-time branching"
---

## What is SFINAE?

**SFINAE (Substitution Failure Is Not An Error)** is a fundamental rule in the **C++** template system. It means that if the compiler fails to "substitute" a type into a template (making it invalid), it doesn't immediately cause a compilation error. Instead, it just quietly ignores that specific template and looks for another one that *might* work!

```cpp
#include <type_traits>

// Enable this template ONLY if T is an integer!
template <typename T, typename std::enable_if<std::is_integral<T>::value, int>::type = 0>
void process(T val) {
    std::cout << "Integer processing!" << std::endl;
}
```

## The Modern Solution: `if constexpr` (C++17)

SFINAE is notoriously complex and hard to read. **`if constexpr`** changed everything! It allows you to write normal-looking `if` statements that are evaluated at **compile-time**. The branch that is NOt taken is completely ignored by the compiler, and it doesn't even have to be valid code for all types!

```cpp
template <typename T>
void cleverProcess(T val) {
  // Branching at compile-time!
  if constexpr (std::is_integral_v<T>) {
    std::cout << "Handling as integer: " << val << std::endl;
  } else {
    std::cout << "Handling as something else." << std::endl;
  }
}
```

## Comparisons: Runtime `if` vs Compile-time `if constexpr`

| Type | When? | Result |
| :--- | :--- | :--- |
| **if** | Runtime | Both branches must compile correctly. |
| **if constexpr**| Compile-time | ONLY the chosen branch must compile correctly. |

## Why use SFINAE or `if constexpr`?

1.  **Specialization**: Providing optimized logic for certain types (like a specialized `std::sort` for pointers).
2.  **Detection**: Checking if a type has a specific method (e.g., "Does this class have a `.toString()` function?") or property.
3.  **Generic Meta-Programming**: Writing code that adapts itself to the types it receives.

## Summary

| Feature | Description | Best Use Case... |
| :--- | :--- | :--- |
| **SFINAE** | The rule that makes templates possible | Advanced library code, complex traits |
| **if constexpr**| Modern, readable compile-time branching | 99% of generic logic (C++17!) |
| **enable_if** | Manual template filtering (Old way!) | Pre-C++17 code environments |
| **Concepts** | Formal constraints on templates (C++20!) | Modern type-safe templates |
| **Meta** | Coding for the compiler, not the CPU | Optimization, generic APIs |
| **Best For** | High-performance, type-adaptive generic libraries |
| **Logic** | Boolean checks at compilation time! |
| **Error** | Errors are silent in SFINAE but loud in normal code! |
| **Wait** | Concepts (C++20) effectively replace SFINAE entirely! |
| **Performance** | ZERO runtime cost for branching! |
| **vptr** | No virtual table involved; same speed as normal functions |
| **Traits** | Include `<type_traits>` for common Boolean checks |
| **is_integral** | Check if T is an integer type! |
| **is_pointer** | Check if T is a pointer! |
| **is_class** | Check if T is a class/struct! |
| **Suffix** | Use `_v` and `_t` for shorter syntax (e.g., `is_same_v`) |
| **Template** | Essential for building sophisticated generic tools |
| **Deduce** | Influences how the compiler finds the "best" function |
| **Constraint**| Limit which types can use your library |
| **Debug** | Compile-time errors are much better than runtime crashes! |
