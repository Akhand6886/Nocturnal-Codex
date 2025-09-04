---
title: "Python List Comprehensions"
slug: "python-list-comprehensions"
order: 18
description: "Learn the elegant and efficient 'Pythonic' way to create lists using list comprehensions, a concise alternative to traditional for loops."
category: "Intermediate Concepts"
---

## What is a List Comprehension?

List comprehension offers a shorter, more readable syntax for creating a new list based on the values of an existing list or another iterable. It's considered a more "Pythonic" way to create lists compared to using a standard `for` loop.

### **The Traditional Way**

Let's say we want to create a new list containing the squares of the numbers in an existing list. Using a standard `for` loop, the code would look like this:

```python
numbers = [1, 2, 3, 4, 5]
squares = []
for n in numbers:
  squares.append(n * n)

print(squares)
```

**Output:**

```text
[1, 4, 9, 16, 25]
```

This works perfectly fine, but list comprehension allows us to achieve the same result in a single, elegant line of code.

### **The List Comprehension Way**

Here is the same task accomplished with a list comprehension:

```python
numbers = [1, 2, 3, 4, 5]
squares = [n * n for n in numbers]

print(squares)
```

**Output:**

```text
[1, 4, 9, 16, 25]
```

-----

## The Syntax

A list comprehension consists of brackets containing an expression followed by a `for` clause.

`new_list = [expression for item in iterable]`

The `expression` is the current item in the iteration, but it's also the outcome, which you can manipulate before it ends up in the new list.

-----

## Adding a Condition

List comprehensions can also contain an `if` condition to filter the items from the original iterable.

### **Example: Get Only Even Numbers**

Let's create a new list that contains only the even numbers from our original list.

**The Traditional Way:**

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = []
for n in numbers:
  if n % 2 == 0:
    evens.append(n)

print(evens)
```

**The List Comprehension Way:**

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]

print(evens)
```

In both cases, the output is:

```text
[2, 4, 6, 8, 10]
```

The syntax for a list comprehension with a condition is:

`new_list = [expression for item in iterable if condition]`

List comprehensions are a powerful feature of Python that can make your code more concise and easier to read once you get used to the syntax.