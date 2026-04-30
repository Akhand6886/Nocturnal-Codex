---
title: "Lists"
description: "Creation, slicing, comprehensions, methods, and iteration"
---

## Python Lists: The Swiss Army Knife

A `list` is a mutable, ordered sequence of items. It's one of Python's most frequently used data structures. You can put items of different types in a single list, though we usually keep them consistent.

```python
# Simple list
fruits = ["apple", "banana", "cherry"]
# Mixed type list
data = [1, "two", 3.0, [4, 5]]
```

## Creating Lists

```python
# From a sequence
numbers = list(range(5))  # [0, 1, 2, 3, 4]

# Multiply to initialize (CAUTION: don't use this for mutable items!)
zeros = [0] * 5  # [0, 0, 0, 0, 0]
```

## Accessing and Slicing

Python's indexing is zero-based, and it also supports negative indexing for accessing items from the end.

```python
nums = [10, 20, 30, 40, 50, 60]

print(nums[0])  # 10
print(nums[-1]) # 60 (last item)

# Slicing: [start:stop:step]
print(nums[1:4])  # [20, 30, 40]
print(nums[:3])   # [10, 20, 30] (from start)
print(nums[3:])   # [40, 50, 60] (to end)
print(nums[::2])  # [10, 30, 50] (every 2nd item)
print(nums[::-1]) # [60, 50, ..., 10] (REVERSE!)
```

## Modifying Lists: Most Common Methods

| Method | Action | Example |
| :--- | :--- | :--- |
| **.append(x)** | Add x to the end | `nums.append(100)` |
| **.extend(list)** | Concatenate list | `nums.extend([2, 3])` |
| **.insert(i, x)** | Insert x at index i | `nums.insert(0, 5)` |
| **.remove(x)** | Remove first item x | `nums.remove(40)` |
| **.pop(i)** | Remove and return item i | `val = nums.pop()` |
| **.sort()** | Sort in place | `nums.sort(reverse=True)` |
| **.index(x)** | Get index of x | `idx = nums.index(30)` |

```python
# Concatenation (+) vs .extend()
a = [1, 2]
b = [3, 4]
c = a + b  # Create new list [1, 2, 3, 4]
```

## List Comprehensions: The Pythonic Way!

This allows you to create lists using a concise, readable syntax. It's often faster than a standard `for` loop.

```python
# Simple transformation: squaring numbers
squares = [n**2 for n in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Filtering with 'if'
evens = [n for n in range(10) if n % 2 == 0]
# [0, 2, 4, 6, 8]

# Complex example: uppercase words
words = ["hello", "python", "world"]
upper_words = [w.upper() for w in words if len(w) > 5]
# ['PYTHON']
```

## Sorting and Ordering

- **list.sort()**: Modifies the list directly.
- **sorted(list)**: Returns a *new* sorted list (works on any iterable).

```python
unsorted = [30, 10, 40, 20]
sorted_new = sorted(unsorted)  # [10, 20, 30, 40]
print(unsorted)  # Still [30, 10, 40, 20]
```

## List Unpacking (Python 3.5+)

```python
first, second, *rest = [1, 2, 3, 4, 5]
print(first) # 1
print(rest)  # [3, 4, 5]
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Add** | `.append()`, `.extend()`, `.insert()` |
| **Remove** | `.pop()`, `.remove()`, `del list[i]` |
| **Search** | `.index()`, `.count()`, `x in list` |
| **Copy** | `list[:]` or `.copy()` |
| **Construct** | `[x for x in seq]` |
