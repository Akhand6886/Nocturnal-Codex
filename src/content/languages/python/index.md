---
id: python
name: Python
slug: python
description: >-
  A versatile and beginner-friendly language for web development, data science,
  automation, and more.
iconName: python
year: 1991
creator: Guido van Rossum
paradigm:
  - Object-Oriented
  - Functional
  - Procedural
useCases:
  - Web Development
  - Data Science
  - Machine Learning
  - Automation
  - Scripting
website: 'https://python.org'
category: General Purpose
featured: true
difficulty: Beginner
topics:
  - section: Basics
    description: 'Python fundamentals — syntax, variables, and control flow.'
    items:
      - title: Introduction to Python
        description: 'History, philosophy (PEP 20), and the Python ecosystem'
        slug: introduction-to-python
      - title: Installation & Setup
        description: 'Python versions, virtual environments, pip, and IDE setup'
        slug: installation-setup
      - title: Variables & Data Types
        description: 'int, float, str, bool, None, type() and dynamic typing'
        slug: variables-data-types
      - title: Operators & Expressions
        description: 'Arithmetic, comparison, logical, walrus operator (:=)'
        slug: operators-expressions
      - title: Input/Output
        description: 'print(), input(), f-strings, and string formatting'
        slug: input-output
      - title: Control Flow
        description: 'if/elif/else, for, while, match-case (3.10+), break, continue'
        slug: control-flow
  - section: Data Structures
    description: Python's built-in collection types.
    items:
      - title: Lists
        description: 'Creation, slicing, comprehensions, methods, and iteration'
        slug: lists
      - title: Tuples
        description: 'Immutable sequences, named tuples, and unpacking'
        slug: tuples
      - title: Dictionaries
        description: 'Key-value pairs, dict comprehensions, and defaultdict'
        slug: dictionaries
      - title: Sets
        description: 'Unique collections, set operations, and frozenset'
        slug: sets
      - title: Strings
        description: 'String methods, slicing, regex, and Unicode handling'
        slug: strings
  - section: Functions & Modules
    description: Code organization and reuse.
    items:
      - title: Functions
        description: 'def, arguments, return values, *args, **kwargs, type hints'
        slug: functions
      - title: Lambda & Closures
        description: 'Anonymous functions, map/filter/reduce, and closures'
        slug: lambda-closures
      - title: Decorators
        description: 'Function wrappers, @property, @staticmethod, @classmethod'
        slug: decorators
      - title: Generators
        description: 'yield, generator expressions, and lazy evaluation'
        slug: generators
      - title: Modules & Packages
        description: 'import system, __init__.py, relative imports, and pip packages'
        slug: modules-packages
  - section: Object-Oriented Programming
    description: 'Classes, inheritance, and Python''s object model.'
    items:
      - title: Classes & Objects
        description: 'class, __init__, self, attributes, and methods'
        slug: classes-objects
      - title: Inheritance
        description: 'Single, multiple, MRO, super(), and mixins'
        slug: inheritance
      - title: Magic Methods
        description: '__str__, __repr__, __eq__, __hash__, __iter__, and more'
        slug: magic-methods
      - title: Data Classes
        description: '@dataclass, field(), frozen classes, and slots'
        slug: data-classes
      - title: Abstract Base Classes
        description: 'abc module, @abstractmethod, and interface patterns'
        slug: abstract-base-classes
  - section: Error Handling & Testing
    description: Robust code with exceptions and testing frameworks.
    items:
      - title: Exceptions
        description: 'try/except/else/finally, raising exceptions, custom exceptions'
        slug: exceptions
      - title: Logging
        description: 'logging module, log levels, handlers, and formatters'
        slug: logging
      - title: Unit Testing
        description: 'unittest, pytest, fixtures, mocking, and test-driven development'
        slug: unit-testing
      - title: Debugging
        description: 'pdb, breakpoint(), and IDE debugging tools'
        slug: debugging
  - section: Advanced Topics
    description: Deep Python techniques for experienced developers.
    items:
      - title: Concurrency
        description: 'threading, multiprocessing, asyncio, and the GIL'
        slug: concurrency
      - title: Context Managers
        description: 'with statement, __enter__/__exit__, and contextlib'
        slug: context-managers
      - title: Metaclasses
        description: 'type(), __new__, __init_subclass__, and class creation hooks'
        slug: metaclasses
      - title: Type Hints
        description: 'typing module, generics, Protocol, TypeVar, and mypy'
        slug: type-hints
      - title: C Extensions
        description: 'ctypes, Cython, pybind11, and FFI for performance'
        slug: c-extensions
---

## Overview

Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming. It is often described as a "batteries included" language due to its comprehensive standard library.

## Key Features

- **Readable syntax** — Clean, English-like code that's easy to learn and maintain
- **Extensive standard library** — Rich built-in modules for I/O, networking, text processing, and more
- **Dynamic typing** — No need to declare variable types; flexibility at the cost of runtime checks
- **Cross-platform** — Runs on Windows, macOS, Linux, and many other platforms
- **Massive ecosystem** — PyPI hosts over 400,000 packages covering every domain imaginable

## Common Use Cases

- **Web Development** — Django, Flask, FastAPI
- **Data Science & Analytics** — Pandas, NumPy, Matplotlib
- **Machine Learning** — TensorFlow, PyTorch, scikit-learn
- **DevOps & Automation** — Ansible, scripting, CI/CD tooling
- **Scientific Computing** — SciPy, Jupyter Notebooks

## Code Example

```python
# A simple function demonstrating Python's clean syntax
def fibonacci(n):
    """Generate first n Fibonacci numbers."""
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(fibonacci(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Learning Resources

- [Official Python Tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/)
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/)
