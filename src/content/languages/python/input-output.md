---
title: "Input/Output"
description: "print(), input(), f-strings, and string formatting"
---

## Standard Input & Output in Python

I/O operations are the most basic way for a program to communicate with the user. Python processes these through the standard output (`stdout`) and standard input (`stdin`) streams.

## Output with `print()`

The `print()` function sends text or data to the console.

```python
name = "Alpha"
age = 25

# Basic usage
print("Hello, user!")
# Automatic space insertion
print(name, "is", age, "years old")
```

### Custom `sep` and `end`

By default, `print()` separates arguments with a space and ends with a newline (`\n`). You can change this behavior:

```python
# Custom separator
print("A", "B", "C", sep="|")  # A|B|C

# Custom end (to prevent newline)
print("Loading", end="...")
print(" [Done]")  # Loading... [Done]
```

## Input with `input()`

The `input()` function pauses your program and waits for the user to type something. **Wait!** The value returned is *always* a string.

```python
# Ask user for their name
user_name = input("Enter your name: ")
print(f"Hi {user_name}!")

# Ask for a number (needs casting)
age_str = input("What is your age? ")
age = int(age_str)  # Convert to integer
print(f"You will be {age + 1} next year.")
```

> **Warning**: Use `try/except` for safety when casting user input to a number!

## Formatting with F-Strings (Python 3.6+)

F-strings (formatted string literals) are the modern and preferred way to format strings. They're fast, readable, and allow you to embed Python expressions directly into strings.

```python
# Basic f-string
print(f"The result is {10 * 5}")

# Precision formatting
price = 12.345678
print(f"Price: {price:.2f}")  # Price: 12.35

# Width and alignment
label = "Total"
value = 100
print(f"{label:<10}: {value:>5}")  # Left: 10, Right: 5
```

## Older Formatting Methods

While f-strings are the standard, you might see these in older codebases:

### 1. `str.format()` Method

```python
msg = "User {0} is {1} years old".format(name, age)
# Named arguments
msg_named = "Hi {n}, you are {a}".format(n="Alpha", a=25)
print(msg)
```

### 2. `%` Operator (Legacy)

Commonly used in Python 2, this is similar to C's `printf`.

```python
# %s for string, %d for integer
print("Hello %s, you have %d eggs" % ("Alpha", 12))
```

## Complex Output: Pretty Print

For nested dictionaries or large lists, use the built-in `pprint` module for readable console output.

```python
import pprint

data = {"users": [{"id": 1, "name": "A"}, {"id": 2, "name": "B"}]}
pprint.pprint(data, indent=2)
```

> **Direct File I/O**: You can also use `print()` to write directly to a file:
> ```python
> with open("log.txt", "w") as f:
>     print("System started", file=f)
> ```

## Summary

| Feature | Usage | Purpose |
| :--- | :--- | :--- |
| **print()** | `print(val)` | Show data |
| **input()** | `input("?")` | Get user data |
| **f-strings** | `f"{val}"` | Modern formatting |
| **.format()** | `"{0}".format(v)` | Older formatting |
| **pprint** | `pprint(data)` | Human-readable output |
