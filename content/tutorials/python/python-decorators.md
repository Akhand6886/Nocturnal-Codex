
---
title: "Understanding Python Decorators"
slug: "python-decorators"
order: 6
description: "A practical guide to understanding and using decorators in Python."
---

## What are Decorators?

In Python, a decorator is a design pattern that allows you to add new functionality to an existing object (like a function or method) without modifying its structure. Decorators are a form of metaprogramming, where a part of the program tries to modify another part of the program at compile time. They are often used for logging, access control, instrumentation, and more.

## Basic Decorator Syntax

A decorator is typically a function that takes another function as an argument (the decorated function), adds some functionality, and then returns another function.

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Something is happening before the function is called.")
        result = func(*args, **kwargs)
        print("Something is happening after the function is called.")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")

say_hello("World")
```

This will output:
```
Something is happening before the function is called.
Hello, World!
Something is happening after the function is called.
```

## Using `functools.wraps`

When you use decorators, you are essentially replacing the original function with the wrapper function. This can obscure the original function's metadata (like its name, docstring, etc.). The `functools.wraps` decorator can be used to preserve this metadata.

```python
import functools

def my_better_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("Wrapper executing pre-call actions.")
        value = func(*args, **kwargs)
        print("Wrapper executing post-call actions.")
        return value
    return wrapper

@my_better_decorator
def greet(name):
    """Greets a person."""
    return f"Greetings, {name}!"

print(greet("Pythonista"))
print(greet.__name__) # Output: greet (thanks to @functools.wraps)
print(greet.__doc__)  # Output: Greets a person. (thanks to @functools.wraps)
```

Decorators are a very useful tool in Python for writing cleaner and more modular code.

    