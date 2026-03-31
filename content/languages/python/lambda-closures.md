---
title: "Lambda & Closures"
description: "Anonymous functions, map/filter/reduce, and closures"
---

## Lambda Functions: Anonymous One-Liners

A **lambda function** is a small, anonymous function defined without a name. It's used for small, simple tasks. It can take any number of arguments but can only have **one expression**.

```python
# Simple lambda: square a number
square = lambda x: x**2
print(square(5))  # 25

# Multiple arguments
add = lambda a, b: a + b
print(add(10, 5)) # 15
```

## Functions as First-Class Citizens

In Python, functions are objects! You can pass them as arguments to other functions like `map()`, `filter()`, and `sorted()`.

```python
# Sorted with a lambda: sort by second item (index 1)
pairs = [(1, "A"), (2, "Z"), (3, "B")]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
print(sorted_pairs)  # [(1, 'A'), (3, 'B'), (2, 'Z')]
```

## Functional Programming: Map, Filter, Reduce

| Function | Action | Example |
| :--- | :--- | :--- |
| **map(f, seq)** | Apply f to all items | `list(map(lambda x: x*2, [1, 2]))` |
| **filter(f, seq)** | Keep items where f is True | `list(filter(lambda x: x > 5, [2, 10]))`|

```python
# Map: Square all numbers
nums = [1, 2, 3, 4]
squares = list(map(lambda x: x**2, nums))  # [1, 4, 9, 16]

# Filter: Only even numbers
evens = list(filter(lambda x: x % 2 == 0, nums))  # [2, 4]
```

**Reduce**: For summarizing a sequence into a single value, use `functools.reduce`.

```python
from functools import reduce
nums = [1, 2, 3, 4]
total = reduce(lambda a, b: a + b, nums)  # 10
```

## Closures: Functions that Remember

A **closure** is a nested function that "remembers" the variables from its enclosing (outer) function, even after the outer function has finished executing.

```python
def make_multiplier(n):
    # This is the inner function (closure)
    def multiply(x):
        return x * n
    return multiply

# Create specialized functions
double = make_multiplier(2)
triple = make_multiplier(3)

print(double(10))  # 20 (remembers n=2)
print(triple(10))  # 30 (remembers n=3)
```

## Closures with State: `nonlocal`

Use `nonlocal` to modify a variable from an outer function's scope.

```python
def counter_factory():
    count = 0
    def count_up():
        nonlocal count
        count += 1
        return count
    return count_up

# Create a counter instance
my_counter = counter_factory()
print(my_counter())  # 1
print(my_counter())  # 2
```

> **Wait!** Should I use lambda or def?
> - **Use `def`**: For larger logic, reusability, and easier testing/debugging.
> - **Use `lambda`**: For quick, throwaway functions as arguments (like in `sorted()` or `map()`).

## Summary

| Feature | Description |
| :--- | :--- |
| **Lambda** | Anonymous, single-expression function |
| **Sorted Key** | Use lambda to customize sorting logic |
| **Map/Filter** | Apply/filter sequences without loops |
| **Closure** | Function with persistent outer-scope state |
| **Nonlocal** | Modify outer-scope variable from within a closure |
| **Best For** | Functional patterns, event handlers, factory logic |
