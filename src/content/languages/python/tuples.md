---
title: "Tuples"
description: "Immutable sequences, named tuples, and unpacking"
---

## What are Tuples?

A **tuple** is an *immutable* collection. It's essentially a list that cannot be changed after creation. This makes them faster and safer for data that shouldn't be modified, like records or fixed configurations.

```python
# Simple tuple
point = (10, 20)
# Multi-type tuple
user = ("Alpha", 25, True)
# No parenthesis (tuple packing)
colors = "red", "green", "blue"
```

## Creating Tuples

Wait! Creating a tuple with a single item requires a trailing comma. Otherwise, Python treats it as an expression in parentheses.

```python
# Create tuple with 1 item
single = ("Alpha",)
print(type(single))  # <class 'tuple'>

# Incorrect
not_single = ("Alpha")
print(type(not_single))  # <class 'str'>
```

## Tuple Unpacking

This is a powerful Python feature for extracting tuple values into variables in one line.

```python
# Standard unpacking
x, y = (10, 20)
print(x, y)  # 10 20

# With the '*' operator (extended unpacking)
first, *middle, last = (1, 2, 3, 4, 5)
print(first)  # 1
print(middle) # [2, 3, 4] (captured as a list!)
print(last)   # 5

# Common use case: swapping variables!
a, b = 10, 20
a, b = b, a
print(a, b)  # 20 10
```

## Immutable but not entirely?

While the tuple itself can't be changed, it *can* contain mutable items like lists. Modifying the list *inside* the tuple is allowed.

```python
# Nested lists in a tuple
complex_tuple = (1, [2, 3])
complex_tuple[1].append(4)
# (1, [2, 3, 4]) — this works!
```

## Named Tuples (collections)

Classic tuples access data by index (e.g., `user[0]`), which isn't very descriptive. **Named tuples** allow you to assign names to each position, similar to a simple class or a C `struct`.

```python
from collections import namedtuple

# Define the named tuple type
User = namedtuple("User", ["id", "name", "email"])

# Create an instance
alice = User(id=1, name="Alice", email="alice@example.com")

print(alice.name)  # Access by name!
print(alice[1])    # Still works like a tuple!
```

> **Python 3.7+ Typed Alternative**: Use `typing.NamedTuple` for class-based syntax with type hints.
> ```python
> from typing import NamedTuple
> class Point(NamedTuple):
>     x: int
>     y: int
> ```

## Why Use Tuples Instead of Lists?

1.  **Performance**: Faster to iterate and construct.
2.  **Safety**: Prevents accidental data alteration.
3.  **Dictionary Keys**: Only immutable objects (like tuples) can be used as keys in a Python dictionary.

## Summary

| Feature | Description |
| :--- | :--- |
| **Immutability** | Constant size and content |
| **Unpacking** | Store values into multiple variables |
| **Trailing Comma** | Required for single-item tuples |
| **NamedTuple** | Self-documenting records |
| **Best For** | Data records, fixed data structures |
