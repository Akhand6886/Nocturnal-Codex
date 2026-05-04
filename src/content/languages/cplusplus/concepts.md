---
title: "Concepts (C++20)"
description: "Revolutionizing templates with readable constraints and predicates"
---

## The Problem: Template Error Cryptography

Before C++20, if you passed an invalid type to a template (e.g., a non-numeric type to a math function), the compiler would produce pages of unreadable error messages. You had to use complex hacks like `std::enable_if` and SFINAE to constrain templates.

## The Solution: Concepts

**Concepts** allow you to define named requirements for template arguments. This makes templates safer, easier to read, and produces clear, concise compiler errors.

## 1. Defining a Concept

A concept is a set of compile-time predicates that a type must satisfy.

```cpp
#include <concepts>

template <typename T>
concept Numeric = std::is_arithmetic_v<T>;

template <typename T>
concept Printable = requires(T a) {
    std::cout << a; // Must support output streams
};
```

## 2. Using Concepts in Templates

There are three ways to apply a concept:

### As a Requirement (requires clause)
```cpp
template <typename T>
requires Numeric<T>
T add(T a, T b) {
    return a + b;
}
```

### As a Type Constraint (Shorthand)
```cpp
template <Numeric T>
T multiply(T a, T b) {
    return a * b;
}
```

### In Abbreviated Function Templates
```cpp
void print(Printable auto value) {
    std::cout << value << std::endl;
}
```

## 3. The `requires` Expression

You can check for the existence of methods, return types, or even nested types.

```cpp
template <typename T>
concept Iterator = requires(T i) {
    { ++i } -> std::same_as<T&>; // Must support prefix increment returning ref
    { *i } -> std::same_as<typename T::value_type&>; // Must support dereference
};
```

## 4. Why use Concepts?

1.  **Readability**: The template signature clearly states what it expects.
2.  **Diagnostics**: If a type doesn't match, the compiler tells you exactly which requirement failed.
3.  **Overloading**: You can provide different implementations of a function for different concepts.
4.  **Zero Overhead**: Like all templates, concepts are evaluated at compile-time.

## Summary Checklist
- [x] Use `concept` to define named requirements.
- [x] Use `requires` to check for syntax and return types.
- [x] Concepts replace complex SFINAE/enable_if logic.
- [x] They produce significantly better compiler errors.
- [x] Essential for modern C++20/23 library design.
---
