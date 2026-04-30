---
title: "Concepts (C++20)"
description: "Defining formal constraints on template parameters"
---

## What are C++ Concepts?

Introduced in **C++20**, **Concepts** are formal requirements (constraints) that a template type must meet to be valid for use. They are the biggest improvement in **C++** templates since the language began because they provide **clear, readable error messages** and replace the complex, "hacky" **SFINAE** logic of the past.

```cpp
#include <concepts>

// Define a Concept: Must be an integer!
template <typename T>
concept Integral = std::is_integral_v<T>;

// Constrain a function!
template <Integral T>
T add(T a, T b) {
    return a + b;
}

// add(1.23, 4.56); // ERROR: double is not Integral!
```

## Why Use Concepts?

Wait! If you passed a `string` to a math template in the old days, you'd get a **100-line error message** from the compiler! With **Concepts**, the compiler tells you exactly which requirement failed in a single, human-readable sentence.

```cpp
// Much clearer error message!
error: constraints not satisfied
note: because 'string' is not an 'Integral'
```

## Creating Complex Concepts: `requires`

You can combine multiple checks or require that a type has certain methods.

```cpp
template <typename T>
concept Printable = requires(T v) {
    // T must have a .toString() method that returns a string!
    { v.toString() } -> std::same_as<std::string>;
};

template <Printable T>
void show(T v) {
    std::cout << v.toString() << std::endl;
}
```

## Logical Helpers: `&&` and `||`

Concepts can be combined using standard logical operators and built-in traits from the **`<concepts>`** library.

```cpp
template <typename T>
concept SignedIntegral = std::integral<T> && std::signed_integral<T>;
```

## Summary

| Feature | Description | Best Use Case... |
| :--- | :--- | :--- |
| **concept** | A set of requirements for a type | Formal interface for templates |
| **requires**| Block to check methods and properties | Complex type validation |
| **Constraints**| Limit which types can use your library | Robust generic libraries |
| **Modern** | C++20 required! |
| **Readable** | Best error messages in C++ history |
| **Performance** | Zero runtime cost (all checks at compile-time!) |
| **Standard** | `std::integral`, `std::floating_point`, `std::sortable` |
| **Check** | Use `concept` before `template` for safety! |
| **Logic** | Combine with `&&` and `||` for precise control |
| **Replace** | Replaces complex `enable_if` and SFINAE! |
| **Algorithm** | Modern STL algorithms are now concepts-based! |
| **Deduce** | Influences overload resolution perfectly! |
| **Meta** | The ultimate tool for modern template meta-programming |
| **Trailing** | `template <typename T> requires Integral<T>` |
| **Abbreviated**| `void f(Integral auto x) {}` (Extremely clean syntax!) |
| **Return** | `requires { { f(x) } -> std::same_as<int>; }` |
| **Nested** | Concepts can depend on other concepts! |
| **Trait** | Wrappers around old type-traits like `is_pointer` |
| **Concept** | Formally document your requirements for others! |
| **Compile** | Errors are caught immediately, saving developer time |
| **Generic** | The final piece of the template puzzle for C++! |
