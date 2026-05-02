---
title: "Advanced Decorators"
description: "Mastering decorators with arguments and class-based patterns"
---

## What are Decorators?

At their core, decorators are functions that take another function as an argument and return a modified version of it. 

### Basic Decorator Recap
```python
def log_it(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper
```

## 1. Decorators with Arguments

Sometimes you want to pass configuration to your decorator (e.g., `@repeat(3)`). This requires **three levels** of nested functions.

1.  The outer function receives the decorator arguments.
2.  The middle function receives the target function.
3.  The inner function receives the actual `*args` and `**kwargs`.

```python
import functools

def repeat(times):
    def decorator(func):
        @functools.wraps(func) # Preserves metadata like func.__name__
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice") # Prints 3 times
```

## 2. Class-based Decorators

You can also use a class as a decorator by implementing the `__init__` and `__call__` methods. This is cleaner for decorators that need to maintain complex state.

```python
class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.num_calls = 0

    def __call__(self, *args, **kwargs):
        self.num_calls += 1
        print(f"Call {self.num_calls} of {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hi():
    print("Hi!")

say_hi()
say_hi() # Output: Call 2 of say_hi
```

## Using `functools.wraps`

Always use `@functools.wraps(func)` inside your decorators. Without it, the decorated function will lose its original name, docstring, and other metadata (it will look like "wrapper" to the debugger).

## Summary Checklist
- [x] Decorators wrap functions to add functionality.
- [x] Use 3 levels of nesting for decorators with arguments.
- [x] Use `__call__` for class-based decorators.
- [x] Always use `functools.wraps` to preserve function identity.
- [x] Perfect for logging, timing, authorization, and caching.
