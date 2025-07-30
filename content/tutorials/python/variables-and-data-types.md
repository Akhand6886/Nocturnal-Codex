---
title: "Python Variables and Data Types"
slug: "python-variables-data-types"
order: 2
description: "Learn about variables, naming conventions, and fundamental data types in Python."
category: "Fundamentals"
---

## Variables

In Python, variables are used to store data values. Python has no command for declaring a variable; a variable is created the moment you first assign a value to it.

```python
x = 5       # x is of type int
y = "Hello" # y is of type str
print(x)
print(y)
```

### Naming Variables

- A variable name must start with a letter or the underscore character.
- A variable name cannot start with a number.
- A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ ).
- Variable names are case-sensitive (age, Age and AGE are three different variables).

## Data Types

Python has various built-in data types. Here are some fundamental ones:

- **Text Type**: `str`
- **Numeric Types**: `int`, `float`, `complex`
- **Sequence Types**: `list`, `tuple`, `range`
- **Mapping Type**: `dict`
- **Set Types**: `set`, `frozenset`
- **Boolean Type**: `bool`
- **Binary Types**: `bytes`, `bytearray`, `memoryview`

### Example of Data Types

```python
my_string = "Python is fun"      # str
my_integer = 100                 # int
my_float = 3.14                  # float
my_list = ["apple", "banana"]    # list
my_dict = {"name": "Alice", "age": 30} # dict
my_boolean = True                # bool

print(type(my_string))
print(type(my_integer))
print(type(my_float))
```

Understanding variables and data types is crucial for writing any Python program.
