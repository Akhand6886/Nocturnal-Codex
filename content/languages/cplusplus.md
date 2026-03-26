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
---

## Overview

C++ is a general-purpose programming language created as an extension of C. It has imperative, object-oriented, and generic programming features while also providing facilities for low-level memory manipulation. Modern C++ (C++17/20/23) has evolved significantly, offering smart pointers, lambda expressions, concepts, ranges, and modules that make it both safer and more expressive while maintaining its performance edge.

## Key Features

- **Zero-overhead abstractions** — Templates and inlining eliminate runtime cost of abstractions
- **RAII** — Resource Acquisition Is Initialization for deterministic resource management
- **Templates & generics** — Compile-time polymorphism and metaprogramming
- **Standard Template Library (STL)** — Rich containers, algorithms, and iterators
- **Multi-paradigm** — Supports OOP, procedural, functional, and generic styles

## Common Use Cases

- **Game Development** — Unreal Engine, Unity internals, custom engines
- **Systems Software** — Browsers (Chrome, Firefox), databases
- **High-Frequency Trading** — Low-latency financial systems
- **Embedded & IoT** — Resource-constrained devices
- **Scientific Computing** — Simulations, numerical analysis

## Code Example

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <ranges>

int main() {
    std::vector<int> nums = {5, 3, 8, 1, 9, 2, 7};

    // Modern C++20 ranges
    auto evens = nums
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; });

    for (int n : evens) {
        std::cout << n << " "; // 64 4
    }
}
```

## Learning Resources

- [cppreference.com](https://en.cppreference.com/)
- [LearnCpp.com](https://www.learncpp.com/)
- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/)
