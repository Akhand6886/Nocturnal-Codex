---
title: "Python Tuples"
slug: "python-tuples"
order: 8
description: "Explore tuples in Python, an immutable data structure. Learn how to create tuples, access their elements, and understand when to use them over lists."
category: "Core Data Structures"
---

## What is a Tuple?

A tuple is a collection of ordered and **immutable** elements. "Immutable" means that once a tuple is created, you cannot change its values—you cannot add, remove, or change items. Tuples are created by placing a comma-separated sequence of items inside parentheses `()`.

```python
# A tuple of integers
numbers = (1, 2, 3, 4, 5)

# A tuple of strings
fruits = ("apple", "banana", "cherry")

# A tuple with mixed data types
mixed_tuple = ("hello", 3.14, True, 40)

print(fruits)
```

**Output:**

```text
('apple', 'banana', 'cherry')
```

### **Tuple with One Item**

To create a tuple with only one item, you have to add a comma after the item, otherwise Python will not recognize it as a tuple.

```python
single_item_tuple = ("apple",)
not_a_tuple = ("apple")

print(type(single_item_tuple)) # Output: <class 'tuple'>
print(type(not_a_tuple))     # Output: <class 'str'>
```

-----

## Accessing Tuple Items

Accessing items in a tuple is exactly the same as with a list. You use the index number in square brackets `[]`. Remember that indexing starts at `0`.

```python
fruits = ("apple", "banana", "cherry")

# Access the first item
print(fruits[0]) # Output: 'apple'

# Access the last item using negative indexing
print(fruits[-1]) # Output: 'cherry'
```

-----

## The Immutability of Tuples

The key difference between a list and a tuple is that tuples cannot be changed after they are created.

```python
numbers = (1, 2, 3)

# This will cause an error!
# numbers[0] = 10 
# TypeError: 'tuple' object does not support item assignment
```

Because of this immutability, tuples are faster and more memory-efficient than lists.

-----

## When to Use a Tuple?

  * **For Data That Shouldn't Change**: If you have a collection of items that you want to remain constant throughout your program, a tuple is the perfect choice. Examples include days of the week, months of the year, or geographic coordinates.

  * **As Dictionary Keys**: Since tuples are immutable, they can be used as keys in a dictionary, whereas lists cannot.

```python
# Using a tuple as a dictionary key
locations = {
    (35.6895, 139.6917): "Tokyo",
    (40.7128, -74.0060): "New York"
}
```

While lists are more common for general-purpose collections, tuples provide a safe and efficient way to handle data that you intend to be permanent.