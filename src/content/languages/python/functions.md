---
title: "Functions"
description: "def, arguments, return values, *args, **kwargs, type hints"
---

## Defining Functions in Python

Functions are the building blocks of reusable code. Use the `def` keyword to define one. Significant indentation defines the body of the function.

```python
# Simple function
def greet():
    print("Welcome to Python!")

# Function with arguments and return
def add(a, b):
    return a + b

# Usage
greet()
total = add(10, 5) # 15
```

## Function Arguments: Positional and Keyword

Python functions are incredibly flexible with how they receive data.

```python
def user_info(name, age, city="New York"):
    print(f"{name} is {age} years old and lives in {city}")

# Positional (order matters)
user_info("Alpha", 25, "Delhi")

# Keyword (order doesn't matter!)
user_info(city="London", name="Beta", age=30)

# With default value (city="New York")
user_info("Gamma", 22)
```

## Arbitrary Arguments: `*args` and `**kwargs`

What if you don't know how many arguments will be passed?

### 1. `*args` (Non-keyword arguments as a tuple)

```python
def sum_all(*nums):
    total = sum(nums)
    print(f"Total of {len(nums)} numbers: {total}")

sum_all(1, 2, 3) # Total of 3 numbers: 6
sum_all(10, 20)  # Total of 2 numbers: 30
```

### 2. `**kwargs` (Keyword arguments as a dictionary)

```python
def print_profile(**details):
    for key, value in details.items():
        print(f"{key.capitalize()}: {value}")

print_profile(name="Alpha", role="Agent", status="Active")
```

## Positional-Only and Keyword-Only Arguments (Python 3.8+)

Use `/` for positional-only and `*` for keyword-only.

```python
# Force name as positional, city as keyword
def bio(name, /, *, city):
    print(name, city)

bio("Alpha", city="Tokyo") # bio("Alpha", "Tokyo") would raise TypeError!
```

## Type Hints (Python 3.5+)

While Python is dynamically typed, type hints make your intentions clear to other developers and IDEs. **Note**: Python does *not* enforce these at runtime.

```python
def calculate_area(width: float, height: float) -> float:
    return width * height

# Use 'Optional' or 'Union' for complex types
from typing import List, Optional

def find_user(users: List[str], name: str) -> Optional[str]:
    return name if name in users else None
```

## Docstrings: Documenting Your Code

A triple-quoted string at the top of a function is its docstring. You can view it by typing `help(function_name)`.

```python
def multiply(a: int, b: int) -> int:
    """
    Multiply two numbers and return the result.
    
    Args:
        a (int): The first number.
        b (int): The second number.
        
    Returns:
        int: The product of a and b.
    """
    return a * b
```

## Scopes: Local vs Global

Variables created inside a function are local to it. To modify a global variable inside a function, use the `global` keyword (though this is often discouraged).

```python
count = 0

def increment():
    global count
    count += 1

increment()
print(count) # 1
```

## Summary

| Feature | Syntax | Purpose |
| :--- | :--- | :--- |
| **Declaration** | `def name():` | Create function |
| **Return** | `return val` | Output from function |
| **Default Arg** | `def f(x=10):` | Optional parameter |
| **Multiple Arg** | `*args` | Arbitrary positional args |
| **Named Arg** | `**kwargs` | Arbitrary keyword args |
| **Type Hint** | `def f(x: int):` | Document input types |
| **Docstring** | `"""Docs here"""` | Internal help/documentation |
| **Best For** | Reusable logic, abstraction |
