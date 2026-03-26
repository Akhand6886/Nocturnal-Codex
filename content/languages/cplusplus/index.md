---
id: cplusplus
name: C++
slug: cplusplus
description: >-
  A powerful systems language extending C with object-oriented features,
  templates, and zero-overhead abstractions.
iconName: cplusplus
year: 1985
creator: Bjarne Stroustrup
paradigm:
  - Object-Oriented
  - Procedural
  - Functional
  - Generic
useCases:
  - Game Development
  - Systems Programming
  - High-Performance Computing
  - Embedded Systems
website: 'https://isocpp.org/'
category: Systems
featured: true
difficulty: Advanced
topics:
  - section: Basics
    description: C++ fundamentals building on C knowledge.
    items:
      - title: Introduction to C++
        description: 'C vs C++, compilers, and the C++ standards timeline'
        slug: introduction-to-c
      - title: Variables & Types
        description: 'auto, decltype, references (&), const, and constexpr'
        slug: variables-types
      - title: Namespaces
        description: 'namespace, using declarations, and avoiding name collisions'
        slug: namespaces
      - title: I/O Streams
        description: 'cin, cout, cerr, stringstream, and formatting'
        slug: i-o-streams
      - title: Control Flow
        description: 'Range-based for, structured bindings, and if-with-initializer'
        slug: control-flow
  - section: OOP in C++
    description: 'Classes, inheritance, and polymorphism.'
    items:
      - title: Classes
        description: 'Constructors, destructors, member functions, access specifiers'
        slug: classes
      - title: Inheritance
        description: 'Single, multiple, virtual inheritance, and diamond problem'
        slug: inheritance
      - title: Polymorphism
        description: 'Virtual functions, vtable, pure virtual, override, final'
        slug: polymorphism
      - title: Operator Overloading
        description: 'Overloading arithmetic, comparison, I/O, and subscript operators'
        slug: operator-overloading
      - title: RAII
        description: Resource Acquisition Is Initialization — deterministic cleanup
        slug: raii
  - section: Templates & Generic Programming
    description: Compile-time polymorphism and metaprogramming.
    items:
      - title: Function Templates
        description: 'Template parameters, type deduction, and specialization'
        slug: function-templates
      - title: Class Templates
        description: 'Generic containers, non-type parameters, and variadic templates'
        slug: class-templates
      - title: Concepts (C++20)
        description: Constraining templates with semantic requirements
        slug: concepts-c-20
      - title: SFINAE & constexpr if
        description: Compile-time branching and template metaprogramming
        slug: sfinae-constexpr-if
  - section: STL
    description: 'The Standard Template Library — containers, algorithms, iterators.'
    items:
      - title: Containers
        description: 'vector, map, unordered_map, set, deque, array'
        slug: containers
      - title: Algorithms
        description: 'sort, find, transform, accumulate, and ranges (C++20)'
        slug: algorithms
      - title: Iterators
        description: 'Iterator categories, begin/end, and reverse iterators'
        slug: iterators
      - title: Smart Pointers
        description: 'unique_ptr, shared_ptr, weak_ptr, and make_unique/shared'
        slug: smart-pointers
  - section: Modern C++ (17/20/23)
    description: 'Latest features for safer, more expressive code.'
    items:
      - title: 'std::optional & std::variant'
        description: Sum types and nullable values without pointers
        slug: std-optional-std-variant
      - title: Structured Bindings
        description: 'auto [x, y] = pair; — decomposing composite types'
        slug: structured-bindings
      - title: Ranges & Views
        description: 'Lazy, composable range adaptors (C++20)'
        slug: ranges-views
      - title: Coroutines
        description: 'co_await, co_yield, co_return (C++20)'
        slug: coroutines
      - title: Modules
        description: import/export replacing header files (C++20)
        slug: modules
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
