---
title: "Magic Methods"
description: "__str__, __repr__, __eq__, __hash__, __iter__, and more"
---

## What are Magic Methods (Dunder Methods)?

In Python, **Magic Methods** (also known as **Dunder Methods** — short for "Double Under") are special methods that start and end with double underscores, such as `__init__`. They allow you to define how your objects behave with built-in Python features like operators (`+`, `-`), printing, and iteration.

```python
# A simple example: __str__
class User:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        # Human-readable string representation
        return f"User: {self.name}"

u = User("Alpha")
print(u) # User: Alpha
```

## String Representations: `__str__` vs `__repr__`

| Method | Audience | Purpose |
| :--- | :--- | :--- |
| **__str__** | End-User | Readable information (used by `print()`). |
| **__repr__** | Developer | Unambiguous description for debugging. |

```python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        # Developer-useful representation!
        return f"Point(x={self.x}, y={self.y})"

p1 = Point(10, 20)
print(repr(p1)) # Point(x=10, y=20)
```

## Comparisons: `__eq__`, `__lt__`, and `__gt__`

By default, objects are compared based on their identity (memory address). To compare objects based on their *data*, you must implement these methods.

```python
class Product:
    def __init__(self, name, price):
        self.name, self.price = name, price

    def __eq__(self, other):
        # Compare products by price!
        if isinstance(other, Product):
            return self.price == other.price
        return False

p1 = Product("Laptop", 1000)
p2 = Product("Smartphone", 1000)
print(p1 == p2) # True!
```

## Operators: `__add__`, `__sub__`, and `__mul__`

You can define how your objects behave when used with mathematical operators. This is called **Operator Overloading**.

```python
class Vector2:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        # Define x1 + x2, y1 + y2!
        return Vector2(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector2({self.x}, {self.y})"

v1 = Vector2(1, 2)
v2 = Vector2(3, 4)
print(v1 + v2) # Vector2(4, 6)
```

## Containers: `__len__`, `__getitem__`, and `__iter__`

Want to make your object behave like a list or dictionary?

```python
class Group:
    def __init__(self):
        self.users = ["Alice", "Bob", "Charlie"]

    def __len__(self):
        # Called by len(group)!
        return len(self.users)

    def __getitem__(self, index):
        # Called by group[index]!
        return self.users[index]

    def __iter__(self):
        # Called in loops!
        return iter(self.users)

g = Group()
print(len(g)) # 3
print(g[0])   # Alice
for u in g: print(u)
```

## The Callable Magic Method: `__call__`

This allows you to treat an object like a function!

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        # Multiply on call!
        return x * self.factor

double = Multiplier(2)
print(double(10)) # 20
```

## Summary

| Dunder Method | Triggered by... |
| :--- | :--- |
| **__init__** | `Class()` (Instantiation) |
| **__str__** | `str(obj)` or `print(obj)` |
| **__repr__** | `repr(obj)` (Debugging) |
| **__len__** | `len(obj)` |
| **__getitem__** | `obj[key]` |
| **__iter__** | `for x in obj:` |
| **__eq__** | `obj1 == obj2` |
| **__add__** | `obj1 + obj2` |
| **__call__** | `obj()` |
| **Best For** | Clean syntax, operator overloading, list-like objects |
| **__bool__** | `if obj:` |
| **__contains__** | `x in obj` |
| **__enter__ / __exit__** | `with obj:` (Context Manager) |
