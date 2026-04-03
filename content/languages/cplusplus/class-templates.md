---
title: "Class Templates"
description: "Generic classes, containers, and partial specialization"
---

## What are Class Templates?

In **C++**, code is often the same for different data types. For example, a `Stack` class remains the same for storing both an `int` and a `string`. Instead of writing multiple versions of the same class (which is hard to maintain!), you can write a **single** "generic" **Class Template**.

```cpp
// Template: Any type 'T'!
template <typename T>
class Box {
public:
    T value;

    void set(T v) { value = v; }
    T get() const { return value; }
};

// Compiler generates 'int' version!
Box<int> intBox;
intBox.set(10);

// Compiler generates 'string' version!
Box<std::string> strBox;
strBox.set("Alpha");
```

## How It Works: "Template Instantiation"

Wait! The compiler doesn't actually compile the template itself. When you use `Box<int>`, the compiler reads your template and **generates** a real, hidden class specifically for `int` during compilation. This means templates have **zero runtime overhead**! They are as fast as if you had written the classes manually.

## CTAD (Class Template Argument Deduction)

Since **C++17**, you often don't have to provide the type (`<int>`). The compiler can "deduce" it from the constructor arguments.

```cpp
Box myBox{100}; // Automatically deduces 'int'!
```

## Handling Multiple Types

What if you want to store two different types of data? Use multiple template parameters!

```cpp
template <typename T, typename U>
struct Pair {
  T first;
  U second;
};

// Deduces both types!
Pair result{1, 5.5}; 
```

## Complete & Partial Specialization

Sometimes you need a completely different version of the template for one specific type (like a `bool`).

```cpp
// Partial: Specialization for pointers!
template <typename T>
class Box<T*> {
    // Specialized logic for pointer safety!
};

// Complete: Specialization for bool!
template <>
class Box<bool> {
    // Specialized logic for a boolean!
};
```

## Summary

| Feature | Syntax | Behavior |
| :--- | :--- | :--- |
| **template** | `template <typename T>` | Define a generic class |
| **Instantiation**| `Box<int> b` | Compiler generates the class code |
| **CTAD** | `Box b{100}` | Compiler guesses the type! (C++17) |
| **Specialization**| `template <>` | Custom logic for one specific type |
| **Partial** | `template <T*>` | Custom logic for a group of types |
| **Best For** | Containers, smart pointers, generic objects |
| **Performance** | Zero runtime cost (Same as manual code!) |
| **Binary Size**| "Code Bloat": Big binaries; one version for EACH type! |
| **Header** | Templates must be defined ENTIRELY in headers! |
| **STL** | Standard containers (`vector`, `map`) are all templates! |
| **Concepts** | Use `concept` (C++20!) to restrict allowed types! |
| **Dependent** | Types that depend on template parameters |
| **Meta** | "Template Metaprogramming" (Coding during compilation!) |
| **typename** | Can also use `class` instead (They are identical!) |
| **Default** | `template <typename T = int>` (Default type!) |
| **Non-type** | `template <int N>` (Template using a constant constant!) |
| **Safety** | Errors found during compilation, not crash! |
| **Type Check** | Use `std::is_integral` (C++11 type traits!) |
| **Alias** | `template <typename T> using MyBox = Box<T>;` |
| **Array** | `std::array<int, N>` is a classic class template! |
| **Constraint**| Use `enable_if` for older C++ versions |
| **Modern** | Concepts make class templates much safer! |
| **Friendly** | A template can have friends of the same type! |
