---
title: "Move Semantics"
description: "Optimizing resource management with Rvalue references and std::move"
---

## The Problem: Unnecessary Copies

In old C++ (C++98), returning a large object from a function or passing it by value often resulted in expensive "Deep Copies." The compiler would allocate new memory and copy every element, even if the original object was about to be destroyed anyway.

## The Solution: Move Semantics

Introduced in C++11, **Move Semantics** allow you to "steal" the resources (like heap memory or file handles) from a temporary object instead of copying them. This makes operations like returning a large `std::vector` nearly instantaneous.

## 1. Lvalues vs. Rvalues

- **Lvalue**: An object that has a name and an address (you can point to it).
- **Rvalue**: A temporary object that doesn't have a name (e.g., a return value from a function).

```cpp
int x = 10; // 'x' is an Lvalue
int y = x + 5; // 'x + 5' is an Rvalue
```

## 2. Rvalue References (`&&`)

An Rvalue reference can only bind to a temporary object. This is the key to identifying objects that are safe to "steal" from.

```cpp
void process(std::string& s);  // Takes Lvalue
void process(std::string&& s); // Takes Rvalue (can move from 's')
```

## 3. `std::move`

`std::move` doesn't actually move anything; it's a **cast** that tells the compiler: *"Treat this Lvalue as an Rvalue so I can move from it."*

```cpp
std::string s1 = "Hello";
std::string s2 = std::move(s1); // s1 is now empty; s2 owns the memory
```

## 4. The Move Constructor and Assignment

To make your class "move-aware," you implement the move constructor and move assignment operator.

```cpp
class Buffer {
    int* data;
public:
    // Move Constructor
    Buffer(Buffer&& other) noexcept : data(other.data) {
        other.data = nullptr; // Leave 'other' in a valid but empty state
    }

    // Move Assignment
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            other.data = nullptr;
        }
        return *this;
    }
};
```

## 5. Why use Move Semantics?

1.  **Performance**: Massive speedup for applications handling large amounts of data.
2.  **Move-only Types**: Allows for types like `std::unique_ptr` that cannot be copied but can be transferred.
3.  **Efficiency**: Reduces heap allocations and deallocations.

## Summary Checklist
- [x] Rvalues are temporary objects.
- [x] Use `&&` to create Rvalue references.
- [x] Use `std::move` to enable moving from named variables.
- [x] Always mark move constructors as `noexcept`.
- [x] After a move, the source object should be left in a "valid but unspecified" state.
- [x] Rule of Five: If you define a move constructor, you likely need a move assignment operator (and destructor/copy ops).
---
