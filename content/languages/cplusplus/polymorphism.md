---
title: "Polymorphism"
description: "Virtual functions, pure virtual functions, and VTables"
---

## What is Polymorphism in C++?

**Polymorphism** (meaning "many forms") is the ability of an object to behave differently depending on its actual type, even when accessed through a general pointer or reference. In **C++**, this is achieved through **Virtual Functions**.

```cpp
class Animal {
public:
    // virtual: Ready to be overridden!
    virtual void speak() { std::cout << "..." << std::endl; }
};

class Dog : public Animal {
public:
    void speak() override { std::cout << "Bark!" << std::endl; }
};

Animal* a = new Dog(); // A Dog treated as an Animal!
a->speak(); // Output: "Bark!" (NOT "...")
```

## Comparisons: Compile-time vs Run-time Polymorphism

Wait! C++ has two types of polymorphism:

1.  **Compile-time (Static)**: Function overloading and **Templates**. This is much faster but less flexible.
2.  **Run-time (Dynamic)**: Inheritance and **Virtual Functions**. This is slightly slower but allows for powerful plugin-style systems.

## Abstract Classes & Pure Virtual Functions

Sometimes your base class is just a placeholder and shouldn't actually exist on its own. A **Pure Virtual Function** is one that has no implementation in the base class.

```cpp
class Shape {
public:
    // Pure Virtual: Subclasses MUST implement this!
    virtual void draw() = 0; 
};

// Shape s; // ERROR: Cannot create an object of an abstract class!
```

## The "VTable" (How it Works Under the Hood)

C++ achieves dynamic polymorphism using a **Virtual Method Table (VTable)**. For every class with virtual functions, the compiler creates a table of function pointers. Each object stores a hidden "vptr" pointing to its class's VTable.

| Task | Action | Result |
| :--- | :--- | :--- |
| **Object Call** | Follow `vptr` | Jumps to the correct function address. |
| **Performance** | +1 Pointer Dereference | Slightly slower than a normal function call. |

## Important: Virtual Destructors!

If your base class has **any** virtual functions, it MUST have a **virtual destructor**. Otherwise, when you delete a child through a parent pointer, the child's destructor won't be called, causing a **memory leak!**

```cpp
class Base {
public:
    virtual ~Base() {} // Essential for safety!
};
```

## Summary

| Term | Description |
| :--- | :--- |
| **virtual** | Method that can be overridden at runtime |
| **override** | Explicitly tell the compiler it's an override |
| **final** | Prevent a class/method from being overridden |
| **= 0** | Pure virtual; makes class "Abstract" |
| **Base Class** | The parent providing the vtable entry |
| **Best For** | Plugin architectures, generic collections, UI systems |
| **VTable** | The hidden function lookup table |
| **vptr** | The hidden pointer inside every object |
| **Cost** | One extra pointer lookup per call |
| **Size** | Objects with virtual functions are 1 pointer larger! |
| **C++20** | Added the `constexpr virtual` feature! |
| **Static** | Cannot use `virtual` for `static` methods! |
| **Binding** | Late-binding (Run-time) vs Early-binding (Compile-time!) |
| **Reference** | Works exactly like pointers for polymorphism |
| **Templates** | The alternative to virtual functions for high performance |
| **Safe Delete** | Always use a virtual destructor in the base class! |
