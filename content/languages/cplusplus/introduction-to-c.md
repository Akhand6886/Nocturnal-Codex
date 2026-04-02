---
title: "Introduction to C++"
description: "From C with Classes to a modern, high-performance power-house"
---

## What is C++?

**C++** is a cross-platform, multi-paradigm programming language that is extremely fast, efficient, and flexible. It was originally designed as an extension of the **C language**, adding high-level "classes" while maintaining the low-level performance of C. This mix makes it the preferred choice for performance-critical systems like game engines, browsers, and high-frequency trading platforms.

```cpp
#include <iostream>

int main() {
    std::cout << "Welcome to the world of C++!" << std::endl;
    return 0;
}
```

## The Origin Story

Created in **1979** by **Bjarne Stroustrup** at Bell Labs, the language was initially called "C with Classes." It was renamed to **C++** in 1983 — the `++` being the increment operator in C, symbolizing that it's a step up from the original.

## Modern C++ (C++11 and Beyond)

For a long time, C++ was considered difficult and "manual." This changed with the release of **C++11**, which revolutionized the language with features like `auto`, smart pointers, and lambdas.

Today, the language is updated every three years: **C++14, C++17, C++20, and C++23**. These updates focus on making C++ safer, easier to write, and even faster.

## Why C++ is Unique?

1.  **Zero-Overhead Abstraction**: You only pay for what you use. High-level features (like classes or templates) don't slow down your code compared to writing it in low-level C.
2.  **Manual Memory Management**: Unlike Java or Python, C++ gives you complete control over your computer's RAM. (Though modern C++ uses Smart Pointers to handle this automatically!).
3.  **Standard Template Library (STL)**: A massive collection of ready-to-use data structures (vectors, maps) and algorithms (sort, search).
4.  **Hardware Level Access**: You can talk directly to the CPU and GPU, which is why almost all major games and operating systems are written in C++.

## The Modern Ecosystem

-   **Game Development**: Unreal Engine is entirely C++ based.
-   **Browsers**: Chrome, Firefox, and Safari engines (V8, WebKit) are all C++.
-   **Financial Systems**: High-frequency trading relies on C++'s nanosecond speed.
-   **Embedded Systems**: Cars, robots, and medical devices.

## Summary

| Feature | Description |
| :--- | :--- |
| **Creator** | Bjarne Stroustrup (1979) |
| **Standard** | ISO (International Organization for Standardization) |
| **Paradigm** | Multi-paradigm (Procedural, OOP, Generic, Functional) |
| **Strengths** | Extreme speed, memory control, massive library |
| **Best For** | Games, Browsers, AI/Math, Operating Systems |
| **Modern Era**| Starts with C++11 (Smart Pointers, Range-based loops) |
| **Performance** | Close to Assembly, better than almost everything else |
| **Compilers** | GCC, Clang, MSVC |
| **Learning Curve**| Steep, but incredibly rewarding! |
| **ISO Standard**| Updated every 3 years (20, 23, 26...) |
| **C Compatible** | Most C code runs perfectly in C++ |
| **Extension** | `.cpp`, `.h`, `.hpp` |
| **Compile Path** | Preprocessor -> Compiler -> Linker -> Executable |
