---
title: "Classes"
description: "class vs struct, access specifiers, constructors, and the Big Five"
---

## What are C++ Classes?

In **C++**, a **class** is a user-defined data type that groups related variables (data members) and functions (member functions) into a single unit called an **object**. This is the foundation of Object-Oriented Programming (OOP) in C++.

```cpp
class User {
public:
    std::string name;
    int age;

    void greet() {
        std::cout << "Hi, I'm " << name << "!" << std::endl;
    }
};

User u;
u.name = "Alpha";
u.greet();
```

## Comparisons: `class` vs `struct`

In C++, there is only ONE technical difference between a class and a struct:

-   **`class`**: Members are **private** by default.
-   **`struct`**: Members are **public** by default.

> **Convention**: Use `struct` for simple data containers (POD - Plain Old Data) and `class` when you need complex logic or privacy.

## Access Specifiers: Controlling Privacy

| Level | Description |
| :--- | :--- |
| **public** | Accessible from anywhere. |
| **private** | Accessible ONLY from inside the class. (Default for `class`) |
| **protected**| Accessible from the class and its children (inheritance). |

```cpp
class BankAccount {
private:
    double balance = 0; // Hidden!

public:
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    double getBalance() const { return balance; }
};
```

## Constructors & Destructors

-   **Constructor**: A special function called automatically when you create an object. Same name as the class.
-   **Destructor**: Called automatically when the object is destroyed (goes out of scope). Starts with a tilde `~`.

```cpp
class Logger {
public:
    Logger() { std::cout << "Started!" << std::endl; }
    ~Logger() { std::cout << "Finished!" << std::endl; }
};
```

## The "Big Five" (Modern C++)

If your class manages memory manually (e.g., using `new`), you must define these five special methods for it to work correctly.

1.  **Destructor**: `~Class()`
2.  **Copy Constructor**: `Class(const Class&)`
3.  **Copy Assignment**: `operator=(const Class&)`
4.  **Move Constructor**: `Class(Class&&)` (C++11)
5.  **Move Assignment**: `operator=(Class&&)` (C++11)

> **Pro Tip**: In modern C++, follow the **"Rule of Zero"** — use smart pointers or `std::vector` so you don't have to define any of these!

## Summary

| Feature | Description |
| :--- | :--- |
| **Class** | The blueprint for your data |
| **Object** | The actual instance you use |
| **Public** | The "Interface" (What users see) |
| **Private** | The "Implementation" (The secret logic) |
| **this** | A pointer to the current object |
| **Best For** | Modeling real-world entities, managing complex state |
| **Constructor** | Used to initialize data members |
| **In-class Init**| `int x = 0;` (Prefer this in modern C++!) |
| **Explicit** | Use `explicit` on constructors with one argument! |
| **Const** | Use `const` on methods that don't change data! |
| **Inline** | Small methods defined inside the class are auto-inlined |
| **OOP** | Encapsulation, Abstraction, Inheritance, Polymorphism |
| **Memory** | Use `new Class()` for the heap; `Class obj` for the stack |
| **Static** | Shared across ALL instances of the class |
| **Friend** | Give external functions access to private data! |
| **Delegating** | `Class() : Class(0) {}` (Call one constructor from another!) |
| **Inherit** | `class Child : public Parent {}` |
| **Overload** | Define multiple constructors with different parameters |
| **Default** | `Class() = default;` (Force compiler to make one!) |
| **Delete** | `Class() = delete;` (Ban a specific constructor!) |
| **RAII** | Resource Acquisition Is Initialization |
| **VTable** | How polymorphism works under the hood |
| **Pointer** | Use `u->greet()` instead of `u.greet()` for pointers! |
| **Method** | A function that lives inside a class |
| **Member** | A variable that lives inside a class |
