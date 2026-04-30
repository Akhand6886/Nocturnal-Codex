---
title: "Modules & Packages"
description: "import system, __init__.py, relative imports, and pip packages"
---

## What are Python Modules?

A **module** is simply a `.py` file containing Python code — such as variables, functions, and classes. Modules allow you to organize your code into logically related pieces.

```python
# Create a module: my_math.py
def add(a, b):
    return a + b

PI = 3.14159
```

## Importing Modules

Use the `import` keyword to bring code from another file into your current script.

```python
# Method 1: Import the whole module
import my_math
print(my_math.add(10, 5))

# Method 2: Import specific parts
from my_math import add, PI
print(add(1, 2))

# Method 3: Import with an alias
import numpy as np
# np.array(...)
```

## Using `__name__ == "__main__"`

Python executes *all* code in a module when it's imported. To prevent certain code from running during an import (like tests or a main script), wrap it in a special `if` block.

```python
# utils.py
def helper():
    print("Helping...")

if __name__ == "__main__":
    # Runs ONLY if utils.py is executed directly
    # DOES NOT run if utils.py is imported elsewhere!
    print("Running utils directly")
    helper()
```

## Python Packages: Code Organizations

A **package** is a collection of modules organized in a directory. Any directory containing an `__init__.py` file is treated as a Python package.

```
my_project/
├── main.py
└── auth/
    ├── __init__.py   # Marks the folder as a package
    ├── login.py
    └── register.py
```

```python
# main.py
from auth.login import authenticate
authenticate("user", "pass")
```

## `__init__.py`: Package Initialization

This file is executed when the package is imported. It can be empty, or used to:
-   **Control exports**: Expose sub-modules for easier access.
-   **Initialize global state**: Setup needed whenever the package is used.

```python
# auth/__init__.py
from .login import authenticate
from .register import sign_up

__all__ = ["authenticate", "sign_up"]
```

## Relative vs Absolute Imports

-   **Absolute**: `from my_project.utils import helper` (Always starts from project root).
-   **Relative**: `from . import helper` or `from ..auth import login`. (Uses **dots `.`** to represent parent or sibling directories).

> **Best Practice**: Use absolute imports whenever possible. They are clearer and less prone to breaking if you move your scripts.

## Finding Modules: The `sys.path`

When you `import something`, Python looks for it in these locations (in order):
1.  **Current Directory** (where the script is running).
2.  **PYTHONPATH**: Environment variable with additional paths.
3.  **Standard Library**: Built-in modules like `os`, `sys`, `math`.
4.  **Site-Packages**: Third-party libraries installed with `pip`.

```python
import sys
print(sys.path)  # View your module search paths
```

## External Packages with `pip`

The [Python Package Index (PyPI)](https://pypi.org/) hosts hundreds of thousands of open-source libraries.

-   **Install**: `pip install requests`
-   **Install specific version**: `pip install Flask==2.0.1`
-   **Freeze requirements**: `pip freeze > requirements.txt` (Save your project's dependencies!)

## Summary

| Term | Description |
| :--- | :--- |
| **Module** | A single `.py` file |
| **Package** | A folder of modules + `__init__.py` |
| **Standard Library**| Built-in modules (`os`, `sys`, `json`) |
| **PyPI** | Online repository of Python packages |
| **Pip** | Command-line tool to install packages |
| **Relative Import** | Import using `.` (sibling) or `..` (parent) |
| **PYTHONPATH** | Environment variable for search paths |
