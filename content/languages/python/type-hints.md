---
title: "Type Hints"
description: "typing module, generics, Protocol, TypeVar, and mypy"
---

## What are Python Type Hints?

While Python is a **dynamically typed** language (variables don't need a declared type), **type hints** were introduced in **Python 3.5** (PEP 484) to allow developers to formally declare the expected types for function arguments, return values, and variables.

**Wait!** Python does *not* enforce these types at runtime. They are purely for **documentation**, **IDE auto-completion**, and **static analysis** tools like `mypy`.

```python
# Simple type hints
def greet(name: str, age: int) -> str:
    # This says: name is a string, age is an int, function returns a string!
    return f"Hi {name}, you are {age} years old."

greet("Alpha", 25)
# greet("Alpha", "Twenty Five") # This won't throw an error! (Python is dynamic)
```

## Complex Type Hints: Use `typing`

For more advanced scenarios, use the built-in **`typing`** module.

```python
from typing import List, Dict, Tuple, Optional, Union

# List of integers!
numbers: List[int] = [1, 2, 3]

# Map string keys to list values!
data: Dict[str, List[int]] = {"scores": [10, 20]}

# Optional: Can be a string OR None!
def find_user(id: int) -> Optional[str]:
    return "Alpha" if id == 1 else None

# Union: Can be an integer OR a float!
def square(x: Union[int, float]) -> Union[int, float]:
    return x * x
```

## Modern Type Hints (Python 3.10+)

You no longer need to import `List`, `Dict`, or `Union`. You can use built-in types and the pipe operator `|`.

```python
# The modern way!
def process(data: list[int] | None) -> float:
    return float(sum(data)) if data else 0.0
```

## Structural Typing: `Protocol` (Python 3.8+)

Sometimes you don't care *what* an object is, but *how* it behaves (Duck Typing). A **Protocol** is like an interface in Java — it defines a set of methods an object must have.

```python
from typing import Protocol

# If it can wrap, it follows the Wrapper protocol!
class Wrapper(Protocol):
    def wrap(self) -> str:
        ...

def process_item(item: Wrapper):
    # This function accepts ANY object as long as it has a .wrap() method!
    print(item.wrap())
```

## Generics: `TypeVar`

If a function handles multiple types but the return type depends on the input type, use **`TypeVar`**.

```python
from typing import TypeVar, List

# Define a generic type variable!
T = TypeVar("T")

def get_first(items: List[T]) -> T:
    # Returns an item of the same type as the input list!
    return items[0]

print(get_first([1, 2, 3]))    # Returns int
print(get_first(["A", "B"]))  # Returns str
```

## Static Analysis with `mypy`

The most powerful way to use type hints is with a tool called **`mypy`**. It scans your whole project and points out where you've used a variable of the wrong type!

```bash
pip install mypy
# Scan your file!
mypy myscript.py
```

## Summary

| Feature | Syntax | Purpose |
| :--- | :--- | :--- |
| **Simple Hint** | `name: str` | Basic type declaration |
| **Return Hint** | `-> int` | Function output type |
| **Optional** | `str | None` | Value can be null |
| **Union** | `int | float` | Multiple possible types |
| **Generic** | `List[T]` / `list[T]` | Type that depends on another type |
| **Protocol** | `class P(Protocol):` | Formal interface mapping |
| **Best For** | IDE support, Documentation, Large refactors |
| **Mypy** | `mypy project/` | The tool that checks types staticly |
| **TypeAlias** | `Scores = list[int]` | Give a type a new name |
| **Final** | `x: Final = 10` | Declare as constant |
| **Literal** | `mode: Literal["read", "write"]`| Restricted value set |
