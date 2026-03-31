---
title: "Dictionaries"
description: "Key-value pairs, dict comprehensions, and defaultdict"
---

## Python Dictionaries: Key-Value Maps

A **dictionary** is an *ordered* (as of Python 3.7+), mutable collection of key-value pairs. Keys must be **immutable** (string, number, or tuple), but values can be anything! It is one of Python's most powerful data structures for structured data.

```python
# Create a dictionary
user = {
    "id": 1,
    "name": "Alpha",
    "is_active": True,
    "tags": ["python", "ai"]
}

print(user["name"])  # Alpha
# print(user["age"])  # ERROR: KeyError!
```

## Creating Dicts

```python
# Using dict() constructor
config = dict(host="localhost", port=8080)

# From list of tuples
pairs = [("A", 1), ("B", 2)]
data = dict(pairs)  # {'A': 1, 'B': 2}
```

## Accessing and Modifying

| Method | Action | Example |
| :--- | :--- | :--- |
| **dict[key]** | Access (raises ERROR if missing) | `user["id"]` |
| **.get(key, default)** | Access (safe, returns None if missing) | `user.get("age", 25)` |
| **.update(other)** | Combine with another dict | `user.update({"age": 25})` |
| **.pop(key)** | Remove and return item | `val = user.pop("id")` |
| **del dict[key]** | Remove key | `del user["tags"]` |

```python
# Safe access
age = user.get("age", "Not Found")
print(age)  # Not Found
```

## Iteration: Keys, Values, Items

```python
# Over keys (default)
for key in user:
    print(key)

# Over values
for val in user.values():
    print(val)

# Over both (most common)
for key, value in user.items():
    print(f"{key}: {value}")
```

## Dict Comprehensions

Similar to list comprehensions, but for generating dictionaries!

```python
# Simple transformation
nums = [1, 2, 3, 4]
squares = {x: x**2 for x in nums}
# {1: 1, 2: 4, 3: 9, 4: 16}

# Filtering
even_squares = {x: x**2 for x in nums if x % 2 == 0}
# {2: 4, 4: 16}
```

## Advanced Dict Utilities: `collections`

### 1. `defaultdict`

Avoids `KeyError` by providing a default value for new keys.

```python
from collections import defaultdict

# Use int as the default factory (returns 0)
counts = defaultdict(int)
words = ["apple", "banana", "apple"]

for word in words:
    counts[word] += 1  # No KeyError!

print(counts["apple"])  # 2
print(counts["cherry"]) # 0 (created automatically)
```

### 2. `OrderedDict`

Though regular dicts now preserve order, `OrderedDict` provides additional sub-classing and re-ordering capabilities.

## Merging Dictionaries (Python 3.9+)

Use the union operators to merge dictionaries easily!

```python
a = {"x": 1, "y": 2}
b = {"y": 3, "z": 4}

# Union operator (create new dict)
c = a | b  # {'x': 1, 'y': 3, 'z': 4}
# Update operator (in-place)
a |= b
```

> **Warning**: If keys overlap, the value from the *right-hand* dictionary wins!

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Safe Access** | `.get(key, default)` |
| **Remove** | `.pop(key)`, `del d[key]` |
| **Iterate** | `.items()`, `.keys()`, `.values()` |
| **Construct** | `{k:v for ...}` |
| **Merge** | `d1 | d2` (3.9+) |
| **Default** | `defaultdict(factory)` |
| **Best For** | Structured data, JSON-like maps |
