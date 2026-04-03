---
title: "Namespaces"
description: "Avoiding name collisions with std::, aliases, and anonymous namespaces"
---

## What are C++ Namespaces?

In a large project, different libraries might use the same name for a variable or function (e.g., `logger` or `init`). To prevent this **name collision**, C++ provides **Namespaces**. They act like a "prefix" or a "folder" for your code.

The most famous namespace is **`std`**, which contains everything from the **Standard Template Library**.

```cpp
#include <iostream>

// Standard Library lives in 'std'!
// std::cout
// std::vector
```

## Creating Your Own Namespace

Use the **`namespace`** keyword to wrap your code. You can even "nest" namespaces inside each other.

```cpp
namespace MyGame {
    namespace Physics {
        int gravity = 10;
        void update() {}
    }
}

// Access with the "Scope Resolution Operator" (::)
int g = MyGame::Physics::gravity;
```

## `using` Declaration vs. `using namespace`

1.  **`using` (Safe)**: Import only specific things from a namespace.
2.  **`using namespace` (DANGER!)**: Import EVERYTHING from a namespace.

```cpp
// Recommended: Clean and safe!
using std::cout;
using std::endl;

cout << "Hello" << endl; 

// AVOID THIS IN HEADERS: Potential name collisions!
using namespace std; 
```

> **Wait!** Never use `using namespace` in a header (`.h`) file. It will force that namespace onto every file that includes that header, creating unpredictable bugs.

## Namespace Aliases (C++11+)

If a namespace is too long, you can create a short "nickname" for it.

```cpp
namespace fs = std::filesystem;

fs::path p = "/home/user";
```

## Anonymous (Unnamed) Namespaces

Any code inside an **anonymous namespace** is only visible within the file it was defined in. This is a modern, better alternative to using the `static` keyword for global variables or functions.

```cpp
namespace {
    // This variable cannot be accessed from any OTHER file!
    int internalCounter = 0;
}
```

## Summary

| Feature | Description |
| :--- | :--- |
| **Namespace** | A named scope for code organization |
| **::** | The "Scope Resolution Operator" |
| **std::** | Prefix for all Standard Library tools |
| **using** | Import specific tools for easier access |
| **Alias** | Define a short nickname for a long namespace |
| **Anonymous** | Limit code visibility to a single file |
| **Best For** | Organizing libraries, preventing name collisions |
| **Nest** | Sub-namespaces like `Company::Project::Log` |
| **Inline** | `inline namespace` (C++11) for versioning! |
| **Global** | Code outside ANY namespace is in the "Global Namespace" |
| **Collision** | Occurs when same name used in same scope |
| **Search** | Compiler search order for names |
| **Modern** | Nested shortcuts: `namespace A::B { ... }` (C++17!) |
| **Header** | Be careful with `using` in header files! |
| **Standard** | `std` is the only one guaranteed to exist |
| **Prefix** | Use namespaces instead of prefixes like `GL_` or `SDL_` |
| **Clean** | Keeps your code modular and readable |
| **Lookup** | "Argument Dependent Lookup" (ADL/Koenig) |
| **Utility** | Use as specialized folders for your logic! |
