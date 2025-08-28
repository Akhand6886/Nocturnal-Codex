---
title: "Python Lists"
slug: "python-lists"
order: 7
description: "Learn how to use lists, one of Python's most versatile data structures. Discover how to create, access, modify, and loop through list items."
category: "Core Data Structures"
---

## What is a List?

A list is a data structure in Python that is a mutable, or changeable, ordered sequence of elements. Lists are one of the most used data types in Python and are very flexible. You can define a list by placing a comma-separated sequence of items inside square brackets `[]`.

```python
# A list of integers
numbers = [1, 2, 3, 4, 5]

# A list of strings
fruits = ["apple", "banana", "cherry"]

# A list with mixed data types
mixed_list = ["hello", 3.14, True, 40]

print(fruits)
```

**Output:**

```text
['apple', 'banana', 'cherry']
```

-----

## Accessing List Items

You can access an item in a list by referring to its index number. Python uses zero-based indexing, which means the first item is at index `0`, the second is at index `1`, and so on.

```python
fruits = ["apple", "banana", "cherry"]

# Access the first item
print(fruits[0]) # Output: 'apple'

# Access the third item
print(fruits[2]) # Output: 'cherry'

# Negative indexing means beginning from the end
# -1 refers to the last item
print(fruits[-1]) # Output: 'cherry'
```

-----

## Modifying Lists

Since lists are mutable, you can change their content.

### **Changing an Item**

You can change the value of a specific item by referring to its index:

```python
colors = ["red", "green", "blue"]
colors[1] = "yellow" # Change the second item
print(colors)
```

**Output:**

```text
['red', 'yellow', 'blue']
```

### **Adding Items**

  * **`append()`**: Adds an item to the end of the list.
    ```python
    colors.append("orange")
    print(colors) # Output: ['red', 'yellow', 'blue', 'orange']
    ```
  * **`insert()`**: Adds an item at a specified index.
    ```python
    colors.insert(1, "purple")
    print(colors) # Output: ['red', 'purple', 'yellow', 'blue', 'orange']
    ```

### **Removing Items**

  * **`remove()`**: Removes the first occurrence of a specified value.
    ```python
    colors.remove("blue")
    print(colors) # Output: ['red', 'purple', 'yellow', 'orange']
    ```
  * **`pop()`**: Removes the item at a specified index, or the last item if the index is not specified.
    ```python
    colors.pop(1) # Removes 'purple'
    print(colors) # Output: ['red', 'yellow', 'orange']
    ```

-----

## Looping Through a List

You can loop through all the items in a list using a `for` loop.

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print(fruit)
```

**Output:**

```text
apple
banana
cherry
```

Lists are a fundamental part of Python, and their flexibility makes them essential for storing and manipulating collections of data.
