---
title: "Exceptions"
description: "try/except/else/finally, raising exceptions, custom exceptions"
---

## What are Python Exceptions?

In Python, an **exception** is a special object that represents an error that occurred during the execution of your program. If not "caught" or "handled", it will cause the program to crash. Exceptions provide a powerful way to manage errors gracefully.

```python
# Simple error (ZeroDivisionError!)
# result = 10 / 0

# Handle it!
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
# Output: "Cannot divide by zero!" (Program continues!)
```

## Handling Multiple Exceptions

You can have multiple `except` blocks to handle different types of errors uniquely.

```python
try:
    data = {"id": 1}
    # This key doesn't exist!
    name = data["name"]
except KeyError:
    print("Key not found in dictionary!")
except Exception as e:
    # Catch any other generic exception
    print(f"An unexpected error occurred: {e}")
```

> **Warning**: Avoid using a bare `except:`. It will catch *every* possible error, including `SystemExit` and `KeyboardInterrupt` (`Ctrl+C`), which can make it impossible to stop your script!

## The `else` and `finally` Clauses

-   **`else`**: Runs only if **no exceptions** were raised in the `try` block.
-   **`finally`**: Runs **no matter what**, whether an exception occurred or not. This is perfect for cleanup (like closing files or DB connections).

```python
try:
    file = open("data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
else:
    # Runs ONLY if the file was successfully read!
    print("File read successfully")
finally:
    # Always runs!
    print("Cleaning up resources...")
    # if 'file' in locals(): file.close()
```

## Raising Exceptions: `raise`

Sometimes you want to explicitly trigger an error because a certain condition isn't met.

```python
def set_age(age):
    if age < 0:
        # Trigger an exception manually!
        raise ValueError("Age cannot be negative!")
    print(f"Age set to: {age}")

try:
    set_age(-5)
except ValueError as e:
    print(f"Error: {e}")
```

## Creating Custom Exceptions

For larger projects, it's often helpful to define your own exception types to make your code's error messages more specific.

```python
# Create a custom exception by inheriting from 'Exception'
class DatabaseConnectionError(Exception):
    """Exception raised when DB connection fails."""
    pass

def connect_to_db():
    raise DatabaseConnectionError("Could not reach DB server at localhost")

try:
    connect_to_db()
except DatabaseConnectionError as e:
    print(f"System Alert: {e}")
```

## Built-in Exception Hierarchy (Most Common)

| Exception | Purpose |
| :--- | :--- |
| **TypeError** | Operation applied to wrong data type (e.g., `1 + "2"`) |
| **ValueError** | Value is wrong *type* but inappropriate (e.g., `int("abc")`) |
| **AttributeError** | Object doesn't have the attribute you called |
| **IndexError** | Index out of range for a list |
| **KeyError** | Dictionary key not found |
| **SyntaxError** | Typos in your Python code |
| **ImportError** | Module could not be found |

## Summary

| Feature | Description |
| :--- | :--- |
| **try** | Block of code to monitor for errors |
| **except** | Block that "catches" and handles errors |
| **else** | Runs only if there were NO errors |
| **finally** | Always runs (used for cleanup) |
| **raise** | Manually trigger an exception |
| **Custom** | Create a class inheriting from `Exception` |
| **Best For** | Error handling, input validation, resource cleanup |
| **Attribute Access** | Use `as e` to access the exception message |
| **Exception Hierarchy** | All exceptions inherit from `BaseException` |
| **StopIteration** | Special exception used to end generators/iterators |
| **KeyboardInterrupt** | Raised when user presses `Ctrl+C` |
| **SystemExit** | Raised by `sys.exit()` to quit program |
