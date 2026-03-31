---
title: "Data Classes"
description: "@dataclass, field(), frozen classes, and slots"
---

## What are Python Data Classes?

Introduced in **Python 3.7**, the `@dataclass` decorator automates the creation of boilerplate code for classes that primarily exist to store data. It automatically generates `__init__`, `__repr__`, `__eq__`, and other useful methods based on your type hints!

```python
# Regular Class (Boilerplate!)
class User:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"User(id={self.id}, name='{self.name}')"

# Data Class (Modern!)
from dataclasses import dataclass

@dataclass
class User:
    id: int
    name: str

u = User(1, "Alpha")
print(u) # User(id=1, name='Alpha')
# Automatic equality!
print(u == User(1, "Alpha")) # True
```

## Default Values and Factories

Like regular functions, you can provide default values for attributes.

```python
@dataclass
class Config:
    host: str = "localhost" # Simple default
    port: int = 8080
    tags: list = None # WAITING! Don't do this (mutable default!)

# Correct way for lists/dicts!
from dataclasses import field

@dataclass
class Config:
    host: str = "localhost"
    tags: list = field(default_factory=list) # Create a NEW list for each object!
```

## Post-Initialization Logic: `__post_init__`

Sometimes you need to perform additional setup or validation *after* the `__init__` has run.

```python
@dataclass
class Rectangle:
    width: float
    height: float

    def __post_init__(self):
        # Calculate area automatically!
        self.area = self.width * self.height
        if self.width <= 0:
            raise ValueError("Width must be positive!")

r = Rectangle(10, 5)
print(r.area) # 50
```

## Immutable Data Classes: `frozen=True`

If you want your object to be immutable (read-only), you can "freeze" it. This also makes the object **hashable**, meaning you can use it as a key in a dictionary.

```python
@dataclass(frozen=True)
class Point:
    x: int
    y: int

p = Point(1, 2)
# p.x = 10 # ERROR: dataclasses.FrozenInstanceError!

# Now it can be used in a set!
points = {p, Point(3, 4)}
```

## Memory Optimization: `slots=True` (Python 3.10+)

By default, Python objects use a dictionary (`__dict__`) to store their attributes, which can use a lot of memory. Creating a class with `slots` tells Python to use a fixed, efficient space for attributes.

```python
@dataclass(slots=True)
class FastPoint:
    x: int
    y: int

# MUCH better performance and memory usage for millions of objects!
```

## Converting to Dict and Tuple

The `dataclasses` module provides helper functions to convert your objects to other Python types (useful for JSON serialization).

```python
from dataclasses import asdict, astuple

p = Point(1, 2)
print(asdict(p))  # {'x': 1, 'y': 2}
print(astuple(p)) # (1, 2)
```

## Summary

| Feature | Syntax | Purpose |
| :--- | :--- | :--- |
| **Decorator** | `@dataclass` | Automate boilerplate methods |
| **Defaults** | `attr: int = 0` | Initial values |
| **Factory** | `field(default_factory=f)` | Defaults for mutable items |
| **Post-Init** | `def __post_init__(self):` | Setup after __init__ |
| **Immutable** | `frozen=True` | Make read-only and hashable |
| **Optimize** | `slots=True` (3.10+) | Minimize memory usage |
| **Best For** | Record-like objects, Configs, DTOs |
| **asdict()** | `asdict(obj)` | Convert to dictionary |
| **astuple()** | `astuple(obj)` | Convert to tuple |
