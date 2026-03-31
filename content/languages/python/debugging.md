---
title: "Debugging"
description: "pdb, breakpoint(), and IDE debugging tools"
---

## What is Debugging?

**Debugging** is the process of identifying, tracing, and resolving bugs (errors) in your code. While `print()` is the most common way to debug, it's often inefficient for complex problems. Python provides a suite of specialized tools for deep, interactive debugging.

```python
# Create a script with a bug!
def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    # Wait! There's no else... score 65 returns None!
    # How would we find this?

print(calculate_grade(65)) # None (not what we wanted!)
```

## The Interactive Debugger: `pdb`

Python has a built-in interactive debugger called **`pdb`**. It allows you to pause your code, inspect variables, and step through it line-by-line.

```python
import pdb

def process_data(data):
    # Set a "breakpoint" exactly where you want to pause!
    pdb.set_trace()
    return data["value"] * 10

process_data({"value": 5})
```

## Modern Debugging: `breakpoint()` (Python 3.7+)

Instead of importing `pdb`, you can use the built-in `breakpoint()` function. It's cleaner and can be configured to use different debuggers (like `ipdb` or `pudb`).

```python
def tricky_math(a, b):
    # Pause here!
    breakpoint()
    return (a + b) / (a - b)

tricky_math(10, 10) # DivisionByZero! Use breakpoint to see why!
```

## Common `pdb` Commands

Once your code is paused, you can control its execution with these one-letter commands:

| Command | Action | Description |
| :--- | :--- | :--- |
| **l** (list) | Show Code | Display the lines around where you're currently paused. |
| **n** (next) | Next Line | Execute the current line and stop at the next one. |
| **s** (step) | Step Into | If the current line is a function call, "step into" it. |
| **c** (continue)| Continue | Run until the next breakpoint or the end. |
| **p** (print)| Print Variable | `p x` will show the current value of x. |
| **q** (quit) | Quit | Immediately exit the debugger. |
| **u** (up) | Go Up | Move up one level in the stack (parent function). |
| **d** (down) | Go Down | Move down one level in the stack (child function). |

## Using Logging for Debugging

Sometimes a debugger isn't ideal — like in production or with timing-sensitive code. The **`logging`** module is perfect for tracing how data flows through your system.

```python
import logging
logging.basicConfig(level=logging.DEBUG)

def process_order(order_id):
    logging.debug(f"Starting order: {order_id}")
    # ... logic ...
    logging.info(f"Order {order_id} processed successfully.")
```

## Visual Debugging: IDE Tools

If you're using **VS Code** or **PyCharm**, you don't even need to write `breakpoint()`.

1.  **Click to the left of the line number** in your IDE to set a red dot (breakpoint).
2.  **Press F5 (or the Bug icon)** to start debugging.
3.  **Use the UI panel** to step through, inspect local variables, and view the call stack in real-time.

## Debugging with `traceback`

If your code crashes, Python prints a **traceback**. This is a map of exactly what functions were running when the crash happened. **Read from bottom to top** to find where the error actually occurred!

```python
import traceback

try:
    1 / 0
except ZeroDivisionError:
    # Print the full error path even if we catch it!
    traceback.print_exc()
```

## Summary

| Tool | Description |
| :--- | :--- |
| **pdb** | Built-in interactive command-line debugger |
| **breakpoint()**| Modern, cleaner way to set breakpoints (3.7+) |
| **IDE Debugger** | Visual control with mouse clicks & variable panels |
| **print()** | Simple but inefficient for deep bugs |
| **logging** | Best for production and long-running systems |
| **traceback** | Shows the chain of calls leading to an error |
| **Best For** | Bug fixing, code discovery, logical error analysis |
| **Post-Mortem** | Use `pdb.pm()` to debug *after* a crash occurred |
| **Remote Debugging**| Debugging code running on another server (e.g., `rpdb`) |
| **Inspect** | Use the `dir(obj)` and `vars(obj)` to see what an object contains |
| **Type Checking** | Use `isinstance(obj, type)` to verify variable types |
