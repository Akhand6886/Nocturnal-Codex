---
title: "Operators & Expressions"
description: "Arithmetic, comparison, logical, walrus operator (:=)"
---

## Arithmetic Operators

Python supports the standard math operations you're familiar with:

| Operator | Name | Example | Result |
| :--- | :--- | :--- | :--- |
| **+** | Addition | `10 + 5` | `15` |
| **-** | Subtraction | `10 - 5` | `5` |
| **\*** | Multiplication | `10 * 5` | `50` |
| **/** | Division | `10 / 3` | `3.33` (float) |
| **//** | Floor Division | `10 // 3` | `3` (int) |
| **%** | Modulo (Remainder) | `10 % 3` | `1` |
| **\*\*** | Exponentiation | `10 ** 2` | `100` |

```python
# Modulo for even/odd
if 10 % 2 == 0:
    print("Even")

# Exponentiation
print(2 ** 10)  # 1024
```

## Comparison Operators

Use these to compare values and get a boolean (`True` or `False`).

| Operator | Description | Example |
| :--- | :--- | :--- |
| **==** | Equal to | `10 == 10` (True) |
| **!=** | Not equal | `10 != 5` (True) |
| **>** | Greater than | `10 > 5` (True) |
| **<** | Less than | `10 < 5` (False) |
| **>=** | Greater or equal | `10 >= 10` (True) |
| **<=** | Less or equal | `10 <= 5` (False) |

```python
name = "Alpha"
if name == "Alpha":
    print("Welcome back")
```

## Logical Operators

Used for boolean logic. Note use of English keywords!

| Operator | Description | Example |
| :--- | :--- | :--- |
| **and** | Both true | `(5 > 3) and (2 < 4)` (True) |
| **or** | At least one true | `(5 > 3) or (2 > 10)` (True) |
| **not** | Inverts boolean | `not (5 > 3)` (False) |

```python
is_logged_in = True
has_auth = False

if is_logged_in and has_auth:
    print("Open Dashboard")
```

## The Walrus Operator (Assignment Expression)

Introduced in **Python 3.8**, the walrus operator (`:=`) allows you to assign a value to a variable *inside* an expression.

```python
# Without Walrus
data = get_data()
if data:
    process_data(data)

# With Walrus
if (data := get_data()):
    process_data(data)
```

**Common Use Case (Loops)**: Read lines from a file until an empty line appears.

```python
while (line := file.readline()) != "":
    print(line)
```

## Assignment and Membership

```python
# Assignment
x = 10
x += 5  # Same as x = x + 5

# Membership (in)
nums = [1, 2, 3]
if 2 in nums:
    print("Found 2")

# Identity (is) - used for None and True/False
if x is None:
    print("x is null")
```

> **Important**: Use `==` for comparing values and `is` for comparing identity (memory address), specifically with `None`.

## Summary

| Category | Example | Purpose |
| :--- | :--- | :--- |
| **Arithmetic** | `x + y` | Math operations |
| **Comparison** | `x == y` | Logic checks |
| **Logical** | `a and b` | Combined logic |
| **Assignment** | `x = 10` | Store data |
| **Walrus** | `(x := 5)` | Inline assignment |
