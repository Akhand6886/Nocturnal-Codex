---
title: "Smart Pointers"
description: "std::unique_ptr, std::shared_ptr, and std::weak_ptr"
---

## What are Smart Pointers?

In **Modern C++ (C++11+)**, you should almost **never** use the `new` and `delete` keywords manually. They are dangerous and lead to **memory leaks** (forgetting to delete) or **dangling pointers** (deleting twice). Instead, we use **Smart Pointers**, which automatically handle memory cleanup using the principle of **RAII**.

```cpp
#include <memory>

// Modern Safe way!
auto ptr = std::make_unique<int>(10);
// Memory is deleted automatically when 'ptr' goes out of scope!
```

## Comparisons: Which one to use?

| Pointer Type | Ownership | Behavior |
| :--- | :--- | :--- |
| **std::unique_ptr** | Sole Owner | Cannot be copied; only moved. (90% use case!) |
| **std::shared_ptr** | Multiple Owners | Uses "Reference Counting." Deleted when count is 0. |
| **std::weak_ptr** | Observation | Links to a shared_ptr without increasing its count. |

## 1. `std::unique_ptr` (The 90% Solution!)

Use this for any object where there's only **one** clear owner. It's the most high-performance smart pointer since it adds **zero** speed or memory overhead compared to a raw pointer.

```cpp
auto user = std::make_unique<User>("Alpha");
// user.reset(); // Manually delete!
// auto copy = user; // ERROR: Cannot copy!
auto moved = std::move(user); // Move the owner!
```

## 2. `std::shared_ptr` (Multiple Owners)

Use this when you have an object that is shared between many different parts of your program, and you're not sure which one will finish last.

```cpp
auto data = std::make_shared<Data>();
auto client1 = data; // Reference count: 2
auto client2 = data; // Reference count: 3
// When all clients are destroyed, so is 'Data'!
```

## 3. `std::weak_ptr` (Breaking Cycles)

Wait! If two `shared_ptr` objects point to **each other**, their reference counts will never hit zero, and they'll never be deleted! This is a memory leak. Use **`weak_ptr`** to break these cycles.

```cpp
std::shared_ptr<Node> a = std::make_shared<Node>();
std::shared_ptr<Node> b = std::make_shared<Node>();

a->next = b;
b->prev = a; // DANGER: Cycle! 
// If 'prev' is a weak_ptr, the cycle is broken!
```

## Why use `make_` functions?

Always use **`std::make_unique`** and **`std::make_shared`** instead of passing `new` to the constructor.

1.  **Safety**: Prevents memory leaks if an exception occurs during construction.
2.  **Performance**: `make_shared` is faster because it does one memory allocation instead of two.

## Summary

| Term | Description |
| :--- | :--- |
| **RAII** | Resource Acquisition Is Initialization |
| **unique_ptr** | One owner; no overhead (Use by default!) |
| **shared_ptr** | Shared owner; small reference-count overhead |
| **weak_ptr** | Break reference cycles; safely observe objects |
| **make_unique** | Standard way to create a unique_ptr (C++14+) |
| **make_shared** | Standard way to create a shared_ptr (C++11+) |
| **Best For** | Memory safety, modern C++, leak prevention |
| **Move** | Transfer ownership using `std::move()` |
| **nullptr** | All smart pointers are `nullptr` if uninitialized |
| **reset()** | Hand delete the managed object |
| **get()** | Access the raw pointer (Use sparingly!) |
| **deref** | Use `*` or `->` just like a raw pointer! |
| **Release** | Transfer ownership BACK to a raw pointer |
| **Array** | `std::unique_ptr<int[]>` handles arrays! |
| **Count** | `ptr.use_count()` (For shared pointers only!) |
| **Expired** | `wptr.expired()` (Check if weak object is gone!) |
| **Lock** | `wptr.lock()` (Convert weak to shared BEFORE use!) |
| **Custom** | You can provide your own "Deleter" logic! |
| **Efficiency** | Same size as a regular pointer (unique_ptr) |
| **Security** | Zero risk of "Use-after-free" errors |
