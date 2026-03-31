---
title: "Sets"
description: "Unique collections, set operations, and frozenset"
---

## What are Python Sets?

A **set** is an *unordered* collection of **unique** items. This mirrors mathematical sets — duplicates are automatically removed. Sets are highly optimized for testing if an item is present (membership tests) in O(1) time complexity.

```python
# Simple set
fruits = {"apple", "banana", "apple"}
print(fruits)  # {'apple', 'banana'} (one apple removed!)

# Create from a sequence
nums = set([1, 2, 2, 3])
print(nums)  # {1, 2, 3}
```

## Creating Sets

Warning! Python represents an empty dictionary as `{}`. To create an **empty set**, you must use the `set()` constructor.

```python
# Empty set
empty = set()
print(type(empty))  # <class 'set'>

# Empty dictionary
not_empty = {}
print(type(not_empty))  # <class 'dict'>
```

## Important Methods

| Method | Action | Example |
| :--- | :--- | :--- |
| **.add(x)** | Add x to the set | `fruits.add("cherry")` |
| **.remove(x)** | Remove x (raises ERROR if missing) | `fruits.remove("apple")` |
| **.discard(x)** | Remove x (safe, no error if missing) | `fruits.discard("apple")` |
| **.pop()** | Remove and return an *arbitrary* item | `val = fruits.pop()` |
| **.clear()** | Remove all items | `fruits.clear()` |

```python
# Safe membership testing
nums = {1, 2, 3}
if 2 in nums:
    print("Found 2")
```

## Powerful Set Operations (Math Mode!)

This is where sets truly shine. You can compute the relationship between two sets using Python's intuitive operators.

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Union (both sets combined)
print(A | B)  # {1, 2, 3, 4, 5, 6} (A.union(B))

# Intersection (only items in BOTH)
print(A & B)  # {3, 4} (A.intersection(B))

# Difference (items in A NOT in B)
print(A - B)  # {1, 2} (A.difference(B))

# Symmetric Difference (items in ONE but not BOTH)
print(A ^ B)  # {1, 2, 5, 6} (A.symmetric_difference(B))
```

## Advanced Set Logic: Subsets and Supersets

```python
A = {1, 2}
B = {1, 2, 3}

# Check if A is a subset of B
print(A <= B)  # True (A.issubset(B))

# Check if B is a superset of A
print(B >= A)  # True (B.issuperset(A))

# Check if sets are disjoint (NO common items)
C = {4, 5}
print(A.isdisjoint(C))  # True
```

## Frozensets: Immutable Sets

A standard set is mutable, which means it **cannot** be used as a key in a dictionary or as an item in another set. **Frozenset** is the immutable version!

```python
# Immutable set
fs = frozenset([1, 2, 3])
# fs.add(4)  # ERROR: AttributeError!

# Now it can be a dictionary key!
config = {fs: "Authorized Users"}
```

## Summary

| Feature | Method / Syntax |
| :--- | :--- |
| **Uniqueness** | Automatic duplicate removal |
| **Add** | `.add(item)` |
| **Remove** | `.discard(item)` (safe), `.remove(item)` (error) |
| **Union** | `A | B` |
| **Intersection** | `A & B` |
| **Difference** | `A - B` |
| **Symmetric Diff** | `A ^ B` |
| **Membership** | `x in set` (high-performance!) |
| **Best For** | Membership tests, duplicate removal, math operations |
