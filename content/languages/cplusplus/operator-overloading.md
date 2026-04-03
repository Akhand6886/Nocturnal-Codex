---
title: "Operator Overloading"
description: "Defining custom behavior for +, -, ==, and more"
---

## What is Operator Overloading?

In **C++**, you can redefine how standard operators like `+`, `-`, `==`, or `<<` behave when used with your custom classes. This allows your objects to look and feel like built-in types (like `int` or `double`).

```cpp
class Vector2 {
public:
    float x, y;

    // Define x + x, y + y!
    Vector2 operator+(const Vector2& other) const {
        return {x + other.x, y + other.y};
    }
};

Vector2 v1{1, 2}, v2{3, 4};
Vector2 sum = v1 + v2; // Calls operator+!
```

## How to Overload Operators

Most operators are overloaded as member functions, while some (like `<<` for streams) should be overloaded as global **friend** functions.

### 1. Member Overloading

Use this when the left side of the operator is your class.

```cpp
bool operator==(const Vector2& other) const {
    return (x == other.x && y == other.y);
}
```

### 2. Stream Overloading (`<<`)

Wait! To print your object with `std::cout`, you must overload the `<<` operator as a global function.

```cpp
friend std::ostream& operator<<(std::ostream& os, const Vector2& v) {
    os << "(" << v.x << ", " << v.y << ")";
    return os;
}
```

## Comparisons: The Modern Spaceship (`<=>`)

In **C++20**, you only have to define **ONE** operator to get all six comparisons (`<`, `>`, `<=`, `>=`, `==`, `!=`). This is the **Spaceship Operator**!

```cpp
#include <compare>

class Point {
public:
    int x, y;

    // Use auto to let the compiler build ALL comparisons!
    auto operator<=>(const Point&) const = default;
};
```

## Overloadable Operators

| Category | Operators |
| :--- | :--- |
| **Arithmetic** | `+`, `-`, `*`, `/`, `%` |
| **Bitwise** | `&`, `|`, `^`, `<<`, `>>` |
| **Comparison** | `==`, `!=`, `<`, `>`, `<=`, `>=`, `<=>` |
| **Access** | `[]`, `->`, `*` |
| **Logical** | `&&`, `||`, `!` |
| **Allocation**| `new`, `delete` |

> **Warning**: Never overload the `&&` or `||` operators or the comma operator `,`, as it destroys the "Short-Circuiting" logic that developers expect!

## Summary

| Feature | Description |
| :--- | :--- |
| **operator+** | Define addition behavior |
| **operator==**| Define equality logic |
| **operator<<**| Define stream output (Use `friend`!) |
| **operator[]**| Access like an array |
| **operator()**| Make the object "Callable" (Functor) |
| **operator<=>**| Modern all-in-one comparison (C++20) |
| **Best For** | Math types, collections, smart pointers, strings |
| **const** | Almost all overloaded operators should be `const`! |
| **Reference** | Pass inputs by `const&` (high performance!) |
| **Intuitive** | Don't make `+` do subtraction! (Keep it logical!) |
| **Member** | Used when the object itself changes or is the target |
| **Non-member**| Used for symmetric operations (e.g., `1 + v` vs `v + 1`) |
| **Template** | Combine with templates for generic math libraries |
| **This Binding**| Member operators have a hidden `this` pointer! |
| **Prefix** | `operator++()` (Like `++i`) |
| **Postfix** | `operator++(int)` (Like `i++` - takes a dummy int!) |
| **Precedence** | Overloading DOES NOT change the order of operations! |
| **Assign** | `operator=` should return a reference `*this`! |
| **Conversion**| `operator int()` (Convert object to another type!) |
| **Safe Use** | Use sparingly! Too many overloads make code hard to read! |
| **Check** | Use `assert()` to catch logic errors (e.g., divide by zero!) |
| **Standards** | Keep your overloads consistent with existing types! |
