---
title: "Functions in Python"
slug: "functions"
order: 5
description: "Understand how to define and use functions in Python for reusable code."
category: "Functions"
---

## Defining and Using Functions

A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result.

### Creating a Function

In Python a function is defined using the `def` keyword:

```python
def my_function():
  print("Hello from a function")

my_function() # Calling the function
```

### Parameters and Arguments

Information can be passed into functions as arguments.

```python
def greet(name):
  print(f"Hello, {name}!")

greet("Alice")
greet("Bob")
```

This tutorial explains Python functions in detail.
