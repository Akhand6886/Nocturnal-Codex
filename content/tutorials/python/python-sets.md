---
title: "Python Sets"
slug: "python-sets"
order: 10
description: "Discover Python sets, a unique data structure for storing unordered collections of unique items. Learn to create sets and perform powerful mathematical set operations."
category: "Core Data Structures"
---

## What is a Set?

A set is an **unordered** collection of **unique** items. This means that a set cannot have any duplicate elements, and the items within it are not stored in any particular order. Sets are written with curly braces `{}`.

```python
# A set of integers
numbers = {1, 2, 3, 4, 5}

# A set of strings
fruits = {"apple", "banana", "cherry"}

# Sets automatically remove duplicate values
duplicate_numbers = {1, 2, 2, 3, 3, 3}
print(duplicate_numbers)
```

**Output:**

```text
{1, 2, 3}
```

-----

## Adding and Removing Items

Although you can't change existing items in a set (since they are unordered and unindexed), you can add and remove items.

### **Adding Items**

  * **`add()`**: Adds a single element to the set.
    ```python
    fruits = {"apple", "banana"}
    fruits.add("cherry")
    print(fruits) # Output might be {'cherry', 'apple', 'banana'}
    ```
  * **`update()`**: Adds multiple items from another set, list, or tuple.
    ```python
    more_fruits = ["orange", "mango"]
    fruits.update(more_fruits)
    print(fruits)
    ```

### **Removing Items**

  * **`remove()`**: Removes the specified element. This will raise an error if the item does not exist.
    ```python
    fruits.remove("banana")
    print(fruits)
    ```
  * **`discard()`**: Also removes the specified element, but it will **not** raise an error if the item is not found.
    ```python
    fruits.discard("grape") # Does nothing, no error
    print(fruits)
    ```

-----

## Set Operations

Sets are powerful because they support mathematical set operations.

### **Union**

The union of two sets is a set containing all items from both sets. You can use the `|` operator or the `union()` method.

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

# Using the | operator
union_set = set_a | set_b
print(union_set) # Output: {1, 2, 3, 4, 5}

# Using the union() method
union_set_method = set_a.union(set_b)
print(union_set_method)
```

### **Intersection**

The intersection of two sets is a set containing only the items that are present in both sets. You can use the `&` operator or the `intersection()` method.

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

# Using the & operator
intersection_set = set_a & set_b
print(intersection_set) # Output: {3}
```

### **Difference**

The difference between two sets is a set containing items that are only in the first set, but not in the second. You can use the `-` operator or the `difference()` method.

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

# Using the - operator
difference_set = set_a - set_b
print(difference_set) # Output: {1, 2}
```

Sets are incredibly useful when you need to store a collection of unique items and perform membership tests or mathematical operations on them.