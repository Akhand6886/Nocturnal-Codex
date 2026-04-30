---
title: "Modules (C++20)"
description: "The modern replacement for header (#include) files"
---

## What are C++ Modules?

Introduced in **C++20**, **Modules** are a huge update to how **C++** code is organized and compiled. Prior to this, C++ relied on the pre-processor and `#include` headers, which were slow, prone to name collisions, and very repetitive.

Modules solve these problems by allowing you to **export** specific entities (like functions or classes) from one file and **import** them into another. This is much more modern and can dramatically speed up compilation times!

```cpp
// math.ixx (Module Define!)
export module Math;

export int add(int a, int b) {
    return a + b;
}
```

## Comparisons: Header File (#include) vs. Module (import)

| Feature | Header File | Module |
| :--- | :--- | :--- |
| **Logic** | Text copy-paste by pre-processor | Pre-compiled binary representation |
| **Speed** | Slow (Same code re-compiled every time!) | FAST (Compiled once and reused!) |
| **Privacy** | Everything in a header is "public" | Only things with `export` are "public." |
| **Order** | Include order matters! | Import order doesn't matter. |

## How to use Modules

Wait! Most modern C++ projects use a mixture of old headers and new modules while transitioning.

1.  **Define**: Use the **`export module`** keyword at the top of a file.
2.  **Export**: Put **`export`** in front of any function or class you want others to use.
3.  **Import**: Use **`import`** to bring that logic into another file.

```cpp
import Math; // Brining in our custom module!

int main() {
    int result = add(5, 10);
    return 0;
}
```

## Why Use Modules?

1.  **Speed**: Massive improvement in build times for large-scale projects.
2.  **Isolation**: Prevents "Macro Bleeding" (Where a macro in one file randomly breaks another file!).
3.  **Encapsulation**: It's much easier to hide internal logic that people shouldn't be using.

## Summary

| Feature | Syntax | Purpose |
| :--- | :--- | :--- |
| **Module** | `export module` | Define the module's identity |
| **Export** | `export int f()` | Make an entity public |
| **Import** | `import M` | Load a pre-compiled module |
| **Best For** | Code separation, compilation performance |
| **Modern** | C++20 required! |
| **Binary** | Modules are stored in a special binary format |
| **Private** | Code inside a module is hidden unless exported |
| **Header** | Modules can also wrap old header files! |
| **Library** | Standard library is now available as `std` module! |
| **Wait** | Use `import std;` in C++23 for everything! |
| **Standard** | Replacing the fragile `#include` system |
| **Safety** | No risk of circular dependencies between modules! |
| **Clean** | No more manual `#ifndef` header guards! |
| **Tooling** | Requires modern compilers and build systems |
| **Speed** | 5x to 10x faster builds in some cases! |
| **Scope** | Modules provide true code isolation! |
| **Path** | Most build tools use `.ixx` or `.cppm` for modules |
| **Legacy** | Fully compatible with existing `#include` code |
| **Future** | The primary way all future C++ code will be written |
| **Namespace** | Modules and Namespaces work perfectly together |
| **Partition** | Split a single module into multiple files (`Math:Add`) |
