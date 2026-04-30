---
title: "Decorators"
description: "Function wrappers, @property, @staticmethod, @classmethod"
---

## What are Python Decorators?

A **decorator** is a function that takes *another function* as an argument and extends its behavior without modifying its source code. It's an elegant way to apply cross-cutting concerns like logging, timing, and access control.

```python
# Simple decorator: Log function calls
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Calling: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Done!")
        return result
    return wrapper

@logger
def greet(name):
    print(f"Hello, {name}!")

greet("Alpha")
# Calling: greet
# Hello, Alpha!
# Done!
```

## Creating Complex Decorators: Handling Arguments

The `*args` and `**kwargs` ensure that the decorator can handle any number of positional and keyword arguments passed to the wrapped function.

```python
import time

def timer(func):
    """Decorator to measure how long a function takes to run."""
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"Time taken: {end - start:.4f}s")
        return result
    return wrapper

@timer
def heavy_task(n):
    time.sleep(n)

heavy_task(1)  # Time taken: 1.0000s
```

## Built-in Decorators

Python comes with several useful decorators for specialized tasks.

### 1. `@property`

This turns a class method into a "getter" that you can access like a normal attribute. You can also define "setter" and "deleter" methods.

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        """Getter for radius."""
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius must be positive!")
        self._radius = value

c = Circle(5)
print(c.radius)  # Access like attribute (not c.radius())
c.radius = 10    # Modify like attribute
```

### 2. `@staticmethod` & `@classmethod`

-   **@staticmethod**: Defines a method that *doesn't* need access to `self` or `cls`. It's just a regular function that lives inside a class.
-   **@classmethod**: Recieves the class itself (`cls`) as the first argument instead of `self`. Useful for factory methods (creating new objects differently).

```python
class User:
    def __init__(self, name):
        self.name = name

    @classmethod
    def from_csv(cls, data):
        """Factory method to create User from CSV string."""
        name = data.split(",")[0]
        return cls(name)

    @staticmethod
    def is_valid_name(name):
        """Utility check that doesn't need class state."""
        return len(name) > 2

# Create user from CSV!
alice = User.from_csv("Alice,25,IT")
print(alice.name)  # Alice
```

## Why Use Decorators?

1.  **Don't Repeat Yourself (DRY)**: Apply logic (like auth or logging) in one place.
2.  **Clean Code**: Keep the core logic of your functions separate from utility logic.
3.  **Readability**: Makes the programmer's intent very clear as soon as they read the `@decorator`.

## Summary

| Feature | Syntax | Purpose |
| :--- | :--- | :--- |
| **Decorator** | `@my_decorator` | Extend function behavior |
| **Property** | `@property` | Data encapsulation / getters |
| **StaticMethod** | `@staticmethod` | Utility function in class |
| **ClassMethod** | `@classmethod` | Factory / class-level logic |
| **Wrapper** | `functools.wraps` | Preverses function metadata |
| **Best For** | Logging, Timing, Auth, Cache |
