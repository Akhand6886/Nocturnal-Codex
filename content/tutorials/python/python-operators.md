---
title: "Python Operators"
slug: "python-operators"
order: 5
description: "Learn about the different types of operators in Python, including arithmetic, assignment, comparison, and logical operators, to perform various operations."
category: "Getting Started"
---

## What are Operators?

Operators are special symbols in Python that carry out arithmetic or logical computation. The value that the operator works on is called the operand. For example, in the expression `10 + 5`, `10` and `5` are operands and `+` is the operator.

Python includes a rich set of operators to perform a wide variety of operations.

-----

### **1. Arithmetic Operators**

Arithmetic operators are used to perform mathematical operations like addition, subtraction, multiplication, etc.

| Operator | Name | Example |
| :--- | :--- | :--- |
| `+` | Addition | `x + y` |
| `-` | Subtraction | `x - y` |
| `*` | Multiplication | `x * y` |
| `/` | Division | `x / y` |
| `%` | Modulus | `x % y` (remainder) |
| `**` | Exponentiation | `x ** y` (x to the power of y) |
| `//` | Floor Division | `x // y` (rounds down) |

```python
a = 10
b = 3

print("Addition:", a + b)       # Output: 13
print("Division:", a / b)       # Output: 3.333...
print("Exponent:", a ** b)      # Output: 1000
print("Floor Division:", a // b) # Output: 3
```

-----

### **2. Assignment Operators**

Assignment operators are used to assign values to variables.

| Operator | Example | Equivalent to |
| :--- | :--- | :--- |
| `=` | `x = 5` | `x = 5` |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 3` | `x = x - 3` |
| `*=` | `x *= 3` | `x = x * 3` |
| `/=` | `x /= 3` | `x = x / 3` |

```python
count = 5
count += 2  # count is now 7
print(count)
```

-----

### **3. Comparison Operators**

Comparison operators are used to compare two values and return a Boolean result (`True` or `False`).

| Operator | Name | Example |
| :--- | :--- | :--- |
| `==` | Equal | `x == y` |
| `!=` | Not equal | `x != y` |
| `>` | Greater than | `x > y` |
| `<` | Less than | `x < y` |
| `>=` | Greater than or equal to | `x >= y` |
| `<=` | Less than or equal to | `x <= y` |

```python
x = 10
y = 12

print("Is x equal to y?", x == y)      # Output: False
print("Is x less than y?", x < y)        # Output: True
```

-----

### **4. Logical Operators**

Logical operators are used to combine conditional statements.

| Operator | Description | Example |
| :--- | :--- | :--- |
| `and` | Returns `True` if both statements are true | `x < 5 and x < 10` |
| `or` | Returns `True` if one of the statements is true | `x < 5 or x < 4` |
| `not` | Reverses the result, returns `False` if the result is true | `not(x < 5 and x < 10)` |

```python
age = 22
has_license = True

if age > 18 and has_license:
  print("You are eligible to drive.")
```

Understanding how to use these operators is essential for performing calculations, making decisions, and controlling the logic of your Python programs.