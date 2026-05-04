---
title: "Smart Pointers & RAII"
description: "Eliminating memory leaks with modern resource management patterns"
---

## What is RAII?

**Resource Acquisition Is Initialization (RAII)** is the single most important pattern in C++. It states that a resource (memory, file handle, socket) should be tied to the lifetime of an object. 
- When the object is created, it acquires the resource.
- When the object goes out of scope, its destructor automatically releases the resource.

## Modern Smart Pointers

Since C++11, you should almost **never** use `new` or `delete` manually. Smart pointers provide RAII for heap memory.

## 1. `std::unique_ptr`

Represents **Exclusive Ownership**. A `unique_ptr` cannot be copied, only moved. When it goes out of scope, the memory is deleted.

```cpp
#include <memory>

void example() {
    auto p = std::make_unique<int>(42);
    // No need to call 'delete'!
} // 'p' is destroyed here
```

## 2. `std::shared_ptr`

Represents **Shared Ownership**. Multiple `shared_ptr` instances can point to the same object. It uses **Reference Counting**; when the last pointer is destroyed, the object is deleted.

```cpp
auto p1 = std::make_shared<Data>();
auto p2 = p1; // Count is 2
```

## 3. `std::weak_ptr`

A non-owning reference to an object managed by `shared_ptr`. It is used to break **Cyclic Dependencies** (which cause memory leaks in reference counting).

```cpp
class Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev; // Use weak_ptr to avoid a cycle
};
```

## 4. Why use Smart Pointers?

1.  **Safety**: Prevents memory leaks, double-frees, and dangling pointers.
2.  **Exception Safety**: If an exception is thrown, the destructors still run, ensuring resources are freed.
3.  **Clarity**: The choice of pointer (`unique` vs `shared`) clearly documents the ownership intent of the code.

## 5. Performance Note

- `unique_ptr`: Zero overhead. It is as fast as a raw pointer.
- `shared_ptr`: Small overhead due to atomic reference counting and a control block.

## Summary Checklist
- [x] RAII: Bind resources to object lifetimes.
- [x] Use `unique_ptr` by default for exclusive ownership.
- [x] Use `shared_ptr` only when multiple owners are truly required.
- [x] Use `weak_ptr` to prevent circular references.
- [x] Use `std::make_unique` and `std::make_shared` for safety and performance.
- [x] Never use `delete` in modern C++.
---
