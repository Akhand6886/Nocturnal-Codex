---
title: "Python Modules and Packages"
slug: "python-modules-and-packages"
order: 17
description: "Learn how to organize your Python code into modules and packages to create reusable and maintainable applications."
category: "Intermediate Concepts"
---

## What is a Module?

As your programs get larger, it's a good practice to break them down into smaller, more manageable files. In Python, each file containing Python code is a **module**. Modules allow you to logically organize your code, making it easier to read, reuse, and maintain.

For example, you could have a file named `my_functions.py` that contains several utility functions.

**`my_functions.py`:**

```python
def add(x, y):
  return x + y

def subtract(x, y):
  return x - y
```

### **Using the `import` Statement**

To use the functions from `my_functions.py` in another file (e.g., `main.py`), you need to import the module using the `import` statement.

**`main.py`:**

```python
# Import the entire 'my_functions' module
import my_functions

# Call a function from the module using module_name.function_name
result = my_functions.add(10, 5)
print(result)
```

**Output:**

```text
15
```

### **Importing Specific Functions**

If you only need a specific function from a module, you can import it directly using the `from` keyword. This allows you to call the function without the module name prefix.

```python
# Import only the subtract function
from my_functions import subtract

result = subtract(10, 5)
print(result) # Output: 5
```

-----

## What is a Package?

A package is a way of organizing related modules into a directory hierarchy. Think of a package as a folder that contains other folders and modules. This helps to prevent naming conflicts and keeps large projects well-structured.

To make Python treat a directory as a package, it must contain a file named `__init__.py`. This file can be empty, but its presence tells Python that the directory is a Python package.

### **Example Package Structure**

```
my_project/
|-- main.py
|-- my_package/
|   |-- __init__.py
|   |-- math_operations.py
|   `-- string_operations.py
```

In this structure, `my_package` is a package containing two modules: `math_operations.py` and `string_operations.py`.

### **Importing from a Package**

You can import modules from a package using dot notation.

**`main.py`:**

```python
# Import the math_operations module from my_package
from my_package import math_operations

# Import a specific function from the string_operations module
from my_package.string_operations import reverse_string

result = math_operations.multiply(5, 4)
reversed_text = reverse_string("hello")

print(result)
print(reversed_text)
```

By organizing your code into modules and packages, you can build large, complex applications that are easy to navigate, scale, and share with other developers.