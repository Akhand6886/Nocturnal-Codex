---
title: "Python Functions"
slug: "python-functions"
order: 13
description: "Learn how to write and use functions in Python to create reusable, organized, and more readable code. Understand parameters, arguments, and return values."
category: "Program Flow and Functions"
---

## What is a Function?

A function is a reusable block of code that performs a specific task. Functions help you organize your code into manageable pieces, prevent you from repeating yourself (a principle known as DRY - Don't Repeat Yourself), and make your code easier to read and debug.

You define a function using the `def` keyword, followed by a function name, parentheses `()`, and a colon `:`.

```python
# A simple function definition
def greet_user():
  """This function greets the user."""
  print("Hello, welcome to the Nocturnal Codex!")

# Calling the function to execute its code
greet_user()
```

**Output:**

```text
Hello, welcome to the Nocturnal Codex!
```

-----

## Parameters and Arguments

You can pass data into a function to make it more flexible. A **parameter** is the variable listed inside the parentheses in the function definition. An **argument** is the value that is sent to the function when it is called.

```python
# 'name' is a parameter
def greet(name):
  print(f"Hello, {name}!")

# "Alice" and "Bob" are arguments
greet("Alice")
greet("Bob")
```

**Output:**

```text
Hello, Alice!
Hello, Bob!
```

You can define functions with multiple parameters:

```python
def add_numbers(x, y):
  sum = x + y
  print(f"The sum is: {sum}")

add_numbers(5, 3) # Output: The sum is: 8
```

-----

## The `return` Statement

So far, our functions have only printed output. The `return` statement is used to make a function send a value back to where it was called. This allows you to store the function's result in a variable and use it in other parts of your code.

```python
def square(number):
  return number * number

# Call the function and store its result
result = square(5)
print(result)
```

**Output:**

```text
25
```

A function stops executing as soon as a `return` statement is reached. You can return any data type, including lists, dictionaries, or booleans.

```python
def is_even(number):
  if number % 2 == 0:
    return True
  else:
    return False

print(is_even(10)) # Output: True
print(is_even(7))  # Output: False
```

-----

## Default Parameter Values

You can provide a default value for a parameter. If the function is called without an argument for that parameter, it will use the default value.

```python
# 'country' has a default value of "Norway"
def my_function(country = "Norway"):
  print("I am from " + country)

my_function("Sweden")
my_function() # This will use the default value
```

**Output:**

```text
I am from Sweden
I am from Norway
```

Functions are a core concept in Python. Mastering them will dramatically improve the quality, readability, and reusability of your code.