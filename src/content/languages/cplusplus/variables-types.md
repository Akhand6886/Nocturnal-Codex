---
title: "Variables & Types"
description: "Int, float, char, bool, auto, and the modern type system"
---

## Modern C++ Types

In **C++**, every variable must have a declared type. This makes the language "Statically Typed," which means most errors are caught by the compiler *before* you ever run the program.

## Fundamental Data Types

| Category | Type | Size (Typical) | Example |
| :--- | :--- | :--- | :--- |
| **Integer** | `int` | 4 bytes | `-10, 0, 100` |
| **Floating Point**| `float`, `double`| 4, 8 bytes | `3.14, -0.01` |
| **Character** | `char` | 1 byte | `'A', '1', '$'` |
| **Boolean** | `bool` | 1 byte | `true, false` |

```cpp
int age = 25;
double price = 12.99;
char grade = 'A';
bool isActive = true;
```

## Modern Feature: Type Deduction (`auto`)

Since **C++11**, you don't always have to write out the full type name. The compiler can "deduce" it from the value you assign to it! This is excellent for complex types from the Standard Library.

```cpp
auto score = 100;     // Deduce int
auto result = 1.23;    // Deduce double
auto msg = "Hello!";   // Deduce const char*
```

> **Wait!** Always use `auto` for iterators and complex generic types, but keep it clear for simple types like `int` to maintain readability.

## The Power of `const` and `constexpr`

C++ encourages "immutability" — the idea that data shouldn't change unless it has to.

-   **`const`**: The value cannot be modified after it's been set.
-   **`constexpr`**: The value is calculated **during compilation**, meaning it doesn't even take time to run when you execute the program. This is the fastest possible speed!

```cpp
const double PI = 3.14159;
constexpr int MAX_ITEMS = 100 * 2; // Pre-calculated!
```

## Strings in Modern C++

In the old days, strings were just arrays of characters (`char*`). In modern C++, we use the much safer and more powerful **`std::string`** class.

```cpp
#include <string>

std::string name = "Alpha";
std::string greeting = "Hello, " + name; // Piece strings together!
```

## Summary

| Type | Examples | Description |
| :--- | :--- | :--- |
| **int** | `10`, `-1` | Whole numbers |
| **double** | `3.1415` | High-precision decimals |
| **char** | `'A'`, `'\n'` | Single character |
| **bool** | `true`, `false` | Logic |
| **auto** | `auto x = 1` | Type deduction (C++11) |
| **void** | `void fn()` | No type (usually for function returns) |
| **string** | `std::string` | Modern text object |
| **Best For** | Data storage, variables, and constants |
| **unsigned** | Use for numbers that are ALWAYS positive |
| **sizeof** | Use `sizeof(int)` to find memory size! |
| **Casting** | `static_cast<int>(3.14)` (The safe way!) |
| **Reference** | `int& ref = x;` (An alias for x!) |
| **Pointer** | `int* ptr = &x;` (A memory address!) |
| **NULL** | Use `nullptr` in modern C++ (Instead of 0 or NULL) |
| **Initialize** | `int x{1};` (Modern "Uniform Initialization") |
| **Literal** | `0.5f` (float), `10LL` (long long) |
| **Overflow** | C++ doesn't protect against huge numbers exceeding their size! |
| **Limits** | Include `<limits>` to check max/min values |
| **Type Alias** | `using Number = int;` (Give a type a new name!) |
| **Enum** | `enum class Color { Red, Blue };` (Modern scoped enums) |
