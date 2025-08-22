---
title: "Input and Output in Python"
slug: "input-output"
order: 2
description: "Learn how to handle user input and display output in Python."
category: "Python Fundamentals"
---

## Input and Output in Python

Interacting with the user is a fundamental part of many programs. In Python, this is primarily done by taking input from the user and displaying output to them.

### Getting User Input

Python provides the built-in `input()` function to get input from the user. When this function is called, the program stops execution and waits for the user to type something and press the Enter key.

```python
# The string inside input() is a prompt shown to the user.
name = input("Please enter your name: ")
print(f"Hello, {name}!")
```

**Important Note:** The `input()` function always returns the user's input as a **string**. If you need to treat the input as a number, you must convert it using functions like `int()` or `float()`.

```python
age_str = input("What is your age? ")
age = int(age_str) # Convert the string to an integer

# You can perform calculations with the converted number
years_until_100 = 100 - age
print(f"You will be 100 years old in {years_until_100} years.")
```

### Displaying Output

The most common way to display output is using the `print()` function.

#### Basic Printing
You can print strings, numbers, or any other object.
```python
print("Hello, World!")
print(42)
```

#### Printing Multiple Items
You can pass multiple items to `print()`, separated by commas. By default, they will be separated by a single space.
```python
print("My name is", "Alice", "and my age is", 30)
# Output: My name is Alice and my age is 30
```

#### Changing the Separator and End Character
The `print()` function has optional parameters:
- `sep`: The separator between arguments. Default is a space (`' '`).
- `end`: The character printed at the end. Default is a newline (`'\n'`).

```python
# Using a custom separator
print("apple", "banana", "cherry", sep=", ")
# Output: apple, banana, cherry

# Using a custom end character
print("First line", end=" | ")
print("Second line")
# Output: First line | Second line
```

#### Formatted Output with F-Strings
F-strings (formatted string literals) are the modern and preferred way to format strings. They are easy to read and allow you to embed Python expressions directly inside a string.

```python
language = "Python"
version = 3.12
print(f"We are using {language} version {version}.")
# Output: We are using Python version 3.12

# You can also include expressions
a = 5
b = 10
print(f"The sum of {a} and {b} is {a + b}.")
# Output: The sum of 5 and 10 is 15.
```
