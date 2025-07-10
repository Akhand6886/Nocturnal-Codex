---
title: "Mastering F-Strings in Python"
slug: "python-f-strings"
order: 3
description: "Learn how to use f-strings for powerful and readable string formatting in Python."
---

## What are F-Strings?

Introduced in Python 3.6, f-strings (formatted string literals) provide a concise and convenient way to embed expressions inside string literals for formatting. They are prefixed with an 'f' or 'F' and allow you to embed Python expressions directly inside `{}` braces.

## Basic Usage

The syntax is simple. Just place an `f` before the opening quote of your string, and then you can place any valid Python expression inside curly braces `{}`.

```python
name = "Alice"
age = 30
greeting = f"Hello, my name is {name} and I am {age} years old."
print(greeting)
# Output: Hello, my name is Alice and I am 30 years old.
```

## Expressions Inside F-Strings

You can put any valid Python expression inside the braces, including function calls, arithmetic operations, and more.

```python
# Arithmetic operation
print(f"Five plus ten is {5 + 10}.")
# Output: Five plus ten is 15.

# Function call
def get_name():
    return "Bob"

print(f"His name is {get_name()}.")
# Output: His name is Bob.

# Accessing dictionary values
person = {"name": "Charlie", "age": 25}
print(f"{person['name']} is {person['age']} years old.")
# Output: Charlie is 25 years old.
```

## Formatting Specifiers

F-strings also support format specifiers, which follow a colon `:` inside the braces. This allows for fine-grained control over the output.

### Formatting Numbers
You can control decimal precision, padding, and alignment.

```python
pi = 3.14159265

# Format to 2 decimal places
print(f"The value of pi is approximately {pi:.2f}.")
# Output: The value of pi is approximately 3.14.

# Add padding
number = 42
print(f"The number is {number:05}.") # Pad with leading zeros to a width of 5
# Output: The number is 00042.
```

### Formatting Dates

You can format `datetime` objects easily.

```python
import datetime
today = datetime.datetime.now()

print(f"Today is {today:%Y-%m-%d}.")
# Output: Today is 2024-07-10. (Will vary based on current date)
```

F-strings are the modern, preferred way to format strings in Python due to their readability and performance.
