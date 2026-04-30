---
title: "Variables & Data Types"
description: "int, float, str, bool, None, type() and dynamic typing"
---

## Dynamic Typing in Python

In Python, you don't need to declare variable types. The interpreter infers them at runtime. But don't be fooled—it's still **strongly typed**, meaning `1 + "2"` will raise an error.

```python
x = 5          # Integer
y = 3.14       # Float
name = "Alpha" # String
is_valid = True # Boolean
result = None  # None (null)
```

## Built-in Data Types

### Numeric Types

-   **int**: For whole numbers. No limit on their size!
-   **float**: For decimal numbers (double precision).
-   **complex**: For imaginary numbers (e.g., `3 + 4j`).

```python
# Large integer
pop = 8_000_000_000  # Underscores for readability
print(pop)  # 8000000000
```

### Text Type (str)

Strings are immutable sequences of characters. You can use single or double quotes.

```python
msg = "Python is cool"
# Multi-line string
long_msg = """This is a
multi-line
string."""
```

### Boolean Type (bool)

Represents `True` or `False`. Used in logical expressions and control flow.

```python
is_admin = False
# Logic
if not is_admin:
    print("Access Denied")
```

### The None Type (NoneType)

Used to represent "nothing" or "null". Often the default value for optional arguments or the return value of functions that don't explicitly return anything.

```python
result = None
if result is None:
    print("No result found")
```

## Type Checking and Conversion

Use `type()` to check a variable's type and built-in functions for conversion (casting).

```python
num = 10
print(type(num))  # <class 'int'>

# Casting
age_str = "25"
age_int = int(age_str)  # String to int
price = float(10)       # Int to float
items = str(5)          # Int to string
```

## Variable Naming (PEP 8)

Follow these conventions for clean, readable code:

-   Use **snake_case** for variables and functions (e.g., `user_count`).
-   Use **PascalCase** for classes (e.g., `UserManager`).
-   Use **UPPER_CASE** for constants (e.g., `MAX_RETRIES`).

> **Warning**: Avoid using built-in names like `list`, `int`, or `type` as variable names. It will shadow the built-ins and cause bugs.

## Summary

| Type | Example | Use Case |
| :--- | :--- | :--- |
| **int** | `10` | Whole numbers |
| **float** | `3.14` | Decimals |
| **str** | `"Hi"` | Text |
| **bool** | `True` | Logic |
| **None** | `None` | Null |
