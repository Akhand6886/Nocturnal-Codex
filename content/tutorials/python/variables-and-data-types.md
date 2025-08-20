---
title: "Python Variables and Data Types"
slug: "python-variables-data-types"
order: 2
description: "Learn about variables, naming conventions, and fundamental data types in Python."
category: "Fundamentals"
---

## Variables

In Python, variables are used to store data values. A variable is created the moment you first assign a value to it. Python has no command for declaring a variable in the way languages like C++ or Java do.

```python
x = 5       # x is an integer
y = "Hello" # y is a string
print(x)
print(y)
```

### Naming Variables (Identifiers)

- A variable name must start with a letter (a-z, A-Z) or an underscore character (`_`).
- It cannot start with a number.
- It can only contain alpha-numeric characters and underscores (A-z, 0-9, and `_`).
- Variable names are case-sensitive (`age`, `Age` and `AGE` are three different variables).

## Data Types

Python has various built-in data types. Here are some of the most fundamental ones:

- **Text Type**: `str`
- **Numeric Types**: `int`, `float`, `complex`
- **Sequence Types**: `list`, `tuple`, `range`
- **Mapping Type**: `dict`
- **Set Types**: `set`, `frozenset`
- **Boolean Type**: `bool`
- **Binary Types**: `bytes`, `bytearray`, `memoryview`

You can get the data type of any object by using the `type()` function:

```python
my_string = "Python is fun"
print(type(my_string))  # <class 'str'>
```

### Numeric Types

- **`int`**: Integer, for whole numbers. e.g., `100`, `-5`
- **`float`**: Floating Point Number, for numbers with a decimal point. e.g., `3.14`, `-0.01`
- **`complex`**: For complex numbers. e.g., `1 + 2j`

### Text Type

- **`str`**: String, for textual data. Enclosed in single (`'`) or double (`"`) quotes.

### Sequence Types

- **`list`**: An ordered and changeable collection. Allows duplicate members. e.g., `["apple", "banana"]`
- **`tuple`**: An ordered and unchangeable collection. Allows duplicate members. e.g., `("apple", "banana")`
- **`range`**: A sequence of numbers, often used for looping.

### Mapping Type

- **`dict`**: A collection of key-value pairs. Unordered, changeable, and indexed. No duplicate keys. e.g., `{"name": "Alice", "age": 30}`

### Set Types

- **`set`**: An unordered, unchangeable*, and unindexed collection. No duplicate members. e.g., `{"apple", "banana"}`
- **`frozenset`**: An immutable version of a set.

*\*Set items are unchangeable, but you can add or remove items.*

### Boolean Type

- **`bool`**: Represents one of two values: `True` or `False`.

Understanding variables and data types is the first crucial step in writing any Python program.
