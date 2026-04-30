---
title: "Inheritance"
description: "Public, protected, and private inheritance + function overriding"
---

## What is Inheritance in C++?

**Inheritance** allows one class (the **subclass** or **derived class**) to derive its attributes and methods from another class (the **superclass** or **base class**). This is fundamental for promoting code reuse and establishing hierarchies between related objects.

```cpp
class Animal {
public:
    void eat() { std::cout << "Eating..." << std::endl; }
};

// Derived class!
class Dog : public Animal {
public:
    void bark() { std::cout << "Barking!" << std::endl; }
};

Dog d;
d.eat(); // Inherited from Animal!
d.bark();
```

## Comparisons: The Three Types of Inheritance

Wait! In C++, you can choose how the base class members are visible to the derived class.

| Base Member | `public` Inherit | `protected` Inherit | `private` Inherit |
| :--- | :--- | :--- | :--- |
| **public** | `public` | `protected` | `private` |
| **protected**| `protected` | `protected` | `private` |
| **private** | **Hidden** | **Hidden** | **Hidden** |

> **Best Practice**: Use `public` inheritance ($99\%$ of the time). Any other type is extremely rare and usually indicates a complex design pattern.

## Using `protected` for Subclasses

A **`protected`** member is private from the outside world, but can still be used by its **subclasses**. This is ideal for base class logic that children need to access.

```cpp
class Base {
protected:
    int id = 123;
};

class Child : public Base {
public:
    void showId() { std::cout << id << std::endl; } // This WORKS!
};
```

## Overriding vs. Overloading

-   **Overloading**: Multiple functions with the same name but different parameters (within the same class).
-   **Overriding**: A derived class providing its own version of a function that already exists in the base class.

```cpp
class Shape {
public:
    virtual void draw() { std::cout << "Drawing shape..." << std::endl; }
};

class Circle : public Shape {
public:
    // Overriding the draw() function!
    void draw() override { std::cout << "Drawing circle..." << std::endl; }
};
```

## Multiple Inheritance: Is it Possible?

Yes! Unlike Java or C#, C++ allows a single class to inherit from **multiple** parent classes.

```cpp
class Flyer { public: void fly() {} };
class Swimmer { public: void swim() {} };

class Duck : public Flyer, public Swimmer {};
```

> **Warning**: Multiple inheritance can lead to the "Diamond Problem" (ambiguous paths). C++ solves this with `virtual` inheritance, but it's best avoided unless necessary.

## Summary

| Feature | Description |
| :--- | :--- |
| **Public** | "is-a" relationship (Inherit all) |
| **Private** | "implemented-in-terms-of" (Hidden) |
| **Virtual** | Required for polymorphism (See Polymorphism) |
| **super** | C++ doesn't have `super`; use `Parent::method()`! |
| **Best For** | Code reuse, building object hierarchies |
| **override** | Keyword to tell the compiler you're overriding! |
| **final** | Keyword to prevent further inheritance! |
| **Composition**| Prefer "has-a" over "is-a" for complex objects! |
| **Base Class** | The parent providing the features |
| **Derived** | The child receiving the features |
| **CTOR** | Base class constructor runs BEFORE the derived one! |
| **DTOR** | Derived class destructor runs BEFORE the base one! |
| **Diamond** | Resolved by `class B : virtual public A` |
| **Access** | Control who sees your internal parent logic |
| **Method** | Inherit behavior; not just data! |
| **Polymorphism**| The ability to treat children as parents (See below!) |
