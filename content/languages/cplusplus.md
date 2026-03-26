---
id: "cplusplus"
name: "C++"
slug: "cplusplus"
description: "A powerful systems language extending C with object-oriented features, templates, and zero-overhead abstractions."
iconName: "cplusplus"
year: 1985
creator: "Bjarne Stroustrup"
paradigm: ["Object-Oriented", "Procedural", "Functional", "Generic"]
useCases: ["Game Development", "Systems Programming", "High-Performance Computing", "Embedded Systems"]
website: "https://isocpp.org/"
category: "Systems"
featured: true
difficulty: "Advanced"
topics:
  - section: "Basics"
    description: "C++ fundamentals building on C knowledge."
    items:
      - title: "Introduction to C++"
        description: "C vs C++, compilers, and the C++ standards timeline"
      - title: "Variables & Types"
        description: "auto, decltype, references (&), const, and constexpr"
      - title: "Namespaces"
        description: "namespace, using declarations, and avoiding name collisions"
      - title: "I/O Streams"
        description: "cin, cout, cerr, stringstream, and formatting"
      - title: "Control Flow"
        description: "Range-based for, structured bindings, and if-with-initializer"
  - section: "OOP in C++"
    description: "Classes, inheritance, and polymorphism."
    items:
      - title: "Classes"
        description: "Constructors, destructors, member functions, access specifiers"
      - title: "Inheritance"
        description: "Single, multiple, virtual inheritance, and diamond problem"
      - title: "Polymorphism"
        description: "Virtual functions, vtable, pure virtual, override, final"
      - title: "Operator Overloading"
        description: "Overloading arithmetic, comparison, I/O, and subscript operators"
      - title: "RAII"
        description: "Resource Acquisition Is Initialization — deterministic cleanup"
  - section: "Templates & Generic Programming"
    description: "Compile-time polymorphism and metaprogramming."
    items:
      - title: "Function Templates"
        description: "Template parameters, type deduction, and specialization"
      - title: "Class Templates"
        description: "Generic containers, non-type parameters, and variadic templates"
      - title: "Concepts (C++20)"
        description: "Constraining templates with semantic requirements"
      - title: "SFINAE & constexpr if"
        description: "Compile-time branching and template metaprogramming"
  - section: "STL"
    description: "The Standard Template Library — containers, algorithms, iterators."
    items:
      - title: "Containers"
        description: "vector, map, unordered_map, set, deque, array"
      - title: "Algorithms"
        description: "sort, find, transform, accumulate, and ranges (C++20)"
      - title: "Iterators"
        description: "Iterator categories, begin/end, and reverse iterators"
      - title: "Smart Pointers"
        description: "unique_ptr, shared_ptr, weak_ptr, and make_unique/shared"
  - section: "Modern C++ (17/20/23)"
    description: "Latest features for safer, more expressive code."
    items:
      - title: "std::optional & std::variant"
        description: "Sum types and nullable values without pointers"
      - title: "Structured Bindings"
        description: "auto [x, y] = pair; — decomposing composite types"
      - title: "Ranges & Views"
        description: "Lazy, composable range adaptors (C++20)"
      - title: "Coroutines"
        description: "co_await, co_yield, co_return (C++20)"
      - title: "Modules"
        description: "import/export replacing header files (C++20)"
---

## Overview

C++ is a general-purpose programming language created as an extension of C. It has imperative, object-oriented, and generic programming features while also providing facilities for low-level memory manipulation. Modern C++ (C++17/20/23) has evolved significantly, offering smart pointers, lambda expressions, concepts, ranges, and modules that make it both safer and more expressive while maintaining its performance edge.

## Key Features

- **Zero-overhead abstractions** — Templates and inlining eliminate runtime cost of abstractions
- **RAII** — Resource Acquisition Is Initialization for deterministic resource management
- **Templates & generics** — Compile-time polymorphism and metaprogramming
- **Standard Template Library (STL)** — Rich containers, algorithms, and iterators
- **Multi-paradigm** — Supports OOP, procedural, functional, and generic styles

## Code Example

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <ranges>

int main() {
    std::vector<int> nums = {5, 3, 8, 1, 9, 2, 7};

    auto evens = nums
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; });

    for (int n : evens) {
        std::cout << n << " ";
    }
}
```

## Learning Resources

- [cppreference.com](https://en.cppreference.com/)
- [LearnCpp.com](https://www.learncpp.com/)
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
