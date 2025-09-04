---
title: "Python Decorators"
slug: "python-decorators"
order: 19
description: "An introduction to decorators in Python, a powerful feature that allows you to add functionality to existing functions dynamically without changing their source code."
category: "Intermediate Concepts"
---

## What is a Decorator?

A decorator in Python is a design pattern that allows you to add new functionality to an existing object (like a function) without modifying its structure. Decorators are a powerful and reusable way to wrap another function, executing code before and after the wrapped function runs.

This concept is part of a more advanced topic called "metaprogramming."

### **Functions are Objects**

To understand decorators, it's crucial to remember that in Python, functions are first-class objects. This means you can:

  * Assign a function to a variable.
  * Pass a function as an argument to another function.
  * Return a function from another function.

-----

## A Simple Decorator

Let's build a simple decorator that logs when a function is about to be executed.

```python
# This is our decorator function
def log_function_call(func):
  # 'wrapper' is the function that will wrap our original function
  def wrapper():
    print(f"Calling function: {func.__name__}")
    func() # This is where the original function gets called
    print(f"Finished function: {func.__name__}")
  return wrapper

# Now, let's decorate a function
def say_hello():
  print("Hello, World!")

# The "classic" way to decorate
say_hello = log_function_call(say_hello)

say_hello()
```

**Output:**

```text
Calling function: say_hello
Hello, World!
Finished function: say_hello
```

-----

## The `@` Syntax Sugar

Python provides a much cleaner and more readable way to apply decorators using the `@` symbol, often called "syntactic sugar."

The code below is exactly equivalent to the "classic" way shown above.

```python
# The decorator is the same
def log_function_call(func):
  def wrapper():
    print(f"Calling function: {func.__name__}")
    func()
    print(f"Finished function: {func.__name__}")
  return wrapper

# Using the '@' syntax to apply the decorator
@log_function_call
def say_hello():
  print("Hello, World!")

say_hello()
```

**Output:**

```text
Calling function: say_hello
Hello, World!
Finished function: say_hello
```

-----

## Common Use Cases for Decorators

Decorators are used extensively in Python frameworks and libraries. Common use cases include:

  * **Logging**: To log information about function calls, such as arguments and return values.
  * **Authentication**: In web frameworks like Flask and Django, decorators are used to check if a user is logged in before allowing them to access a specific page.
  * **Timing**: To measure how long a function takes to execute.
  * **Caching**: To store the results of expensive function calls and return the cached result when the same inputs occur again.

While they may seem complex at first, decorators are a powerful tool for writing clean, reusable, and maintainable Python code.