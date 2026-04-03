---
title: "Function Templates"
description: "Generic functions, type deduction, and template specialization"
---

## What are Function Templates?

In **C++**, code is often the same for different data types. For example, a `max()` function performs the same comparison logic for both an `int` and a `double`. Instead of writing multiple versions of the same function (which is hard to maintain!), you can write a **single** "generic" **Function Template**.

```cpp
// Template: Any type 'T'!
template <typename T>
T myMax(T a, T b) {
    return (a > b) ? a : b;
}

// Compiler will generate 'int' version!
int i = myMax(10, 5);

// Compiler will generate 'double' version!
double d = myMax(1.23, 4.56);
```

## How It Works: "Template Instantiation"

Wait! The compiler doesn't actually compile the template itself. When you call `myMax<int>`, the compiler reads your template and **generates** a real, hidden function specifically for `int` during compilation. This means templates have **zero runtime overhead**!

## Automatic Type Deduction

Since **C++11**, you rarely need to explicitly provide the type (`<int>`). The compiler can usually "deduce" it from the arguments you pass.

```cpp
auto res = myMax(10, 5); // Automatically deduces 'int'!
```

## Handling Multiple Types

What if you want to find the max of an `int` and a `double`? Use two template parameters!

```cpp
template <typename T, typename U>
auto myMax(T a, U b) {
    return (a > b) ? a : b;
}

// Deduces common type! (usually double)
auto res = myMax(10, 5.5); 
```

## Template Specialization

Sometimes you need a different version of the template for one specific type (like `const char*`).

```cpp
template <>
const char* myMax<const char*>(const char* a, const char* b) {
    // Specialized logic for C-style strings!
    return (std::strcmp(a, b) > 0) ? a : b;
}
```

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **template** | `template <typename T>` | Define a generic function |
| **Instantiation**| `myMax(10, 5)` | Compiler generates type-specific code |
| **Deduction** | `auto res = f(x)` | Compiler guesses the type |
| **Specialization**| `template <>` | Custom logic for one specific type |
| **Best For** | Generic algorithms, math, reusable utilities |
| **Performance** | Zero runtime cost (Same as manual code!) |
| **Binary Size**| "Code Bloat": Compiler generates one version for EACH type! |
| **Header** | Templates must be entirely defined in a header file! |
| **Concept** | Use `concept` (C++20!) to restrict allowed types! |
| **Overload** | Templates can coexist with normal functions |
| **Dependent** | Types that depend on template parameters |
| **Meta** | "Template Metaprogramming" (Logic during compilation!) |
| **typename** | Can also use `class` instead (They are identical!) |
| **Default** | `template <typename T = int>` (Default type!) |
| **Non-type** | `template <int N>` (Template using a constant number!) |
| **Safety** | Errors found during compilation, not crash! |
| **Constraint**| Use `std::is_integral` (C++11 type traits!) |
| **Return** | Use `auto` + `->` (Trailing return type) for old C++11 |
| **Standard** | `std::sort`, `std::find` are all function templates! |
