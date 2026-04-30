---
title: "Generators"
description: "yield, generator expressions, and lazy evaluation"
---

## What are Python Generators?

A **generator** is a special type of function that returns an *iterator*. Unlike a regular function that returns its entire result at once, a generator returns values **one by one**, using the `yield` keyword. This makes them highly memory-efficient for large datasets!

```python
# Regular function (Eager: Memory intensive!)
def first_n(n):
    return [i for i in range(n)]

# Generator function (Lazy: Memory efficient!)
def first_n_gen(n):
    for i in range(n):
        yield i

gen = first_n_gen(1000000)
# No million-item list is created in RAM!
print(next(gen))  # 0
print(next(gen))  # 1
```

## How `yield` Works

When a generator function is called, it returns a generator object *without* executing the function body. The function only starts running when you call `next()` or iterate over it.

1.  **Starts running** until it hits `yield`.
2.  **Returns the value** and **pauses** exactly where it is (remembers its local variables!).
3.  **Resumes exactly where it left off** when the next value is requested.

## Generator Expressions: One-Line Generators!

Just like list comprehensions, but using **parentheses `()`** instead of square brackets `[]`. This is perfect for simple transformations.

```python
# List Comprehension (CREATES LIST IN RAM)
squares_list = [x**2 for x in range(100)]

# Generator Expression (CREATES GENERATOR)
squares_gen = (x**2 for x in range(100))

# Iterate like a list
print(next(squares_gen))  # 0
print(next(squares_gen))  # 1
```

## Why Generators? (The "Lazy" Benefit)

Generators perform **Lazy Evaluation**. That means they only compute and yield the *next* item when it's absolutely needed.

1.  **Extreme Memory Efficiency**: Processing a 10GB log file? A list would crash your computer; a generator would use only a few MBs of RAM by processing one line at a time.
2.  **Infinite Sequences**: You can represent infinite data!

```python
# Infinite Fibonacci generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

f = fibonacci()
for _ in range(5):
    print(next(f)) # 0, 1, 1, 2, 3
```

## Sending Data to Generators: `send()`

Generators are not just one-way! You can send data *back* into a generator using the `.send(value)` method.

```python
def tracker():
    total = 0
    while True:
        value = yield total  # Yields total, then waits for value
        if value is not None:
            total += value

t = tracker()
next(t)  # "Prime" the generator (start it up)
print(t.send(10)) # 10
print(t.send(20)) # 30
```

## Standard Library Generators: `itertools`

The `itertools` module contains many useful generator-based utilities for efficient iteration.

```python
import itertools

# Infinite count
for i in itertools.count(start=10, step=5):
    if i > 25: break
    print(i) # 10, 15, 20, 25

# Combine lists
for item in itertools.chain([1, 2], [3, 4]):
    print(item) # 1, 2, 3, 4
```

## Summary

| Feature | Description |
| :--- | :--- |
| **Yield** | Pause function and return a value |
| **Iterate** | Use `next()` or `for item in generator:` |
| **Memory** | O(1) space complexity — items generated on the fly |
| **Lazy** | Only computes what's needed |
| **Infinite** | Can represent data that never ends |
| **Best For** | Large files, streams, infinite series |
| **Comprehension** | `(x for x in seq)` |
