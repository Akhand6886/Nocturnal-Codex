---
title: "Context Managers"
description: "with statement, __enter__/__exit__, and contextlib"
---

## What are Context Managers?

In Python, a **context manager** is an object that handles the setup and teardown logic for a resource automatically. The most common use case is opening a file. Using a context manager ensures that the resource (like a file or database connection) is **closed correctly**, even if an error occurs.

```python
# The Traditional Way (Risk: Resource Leak!)
file = open("data.txt", "w")
file.write("Hello")
# If an error happens HERE, the next line is never called!
file.close()

# The Modern Way (Automatic Cleanup!)
with open("data.txt", "w") as file:
    file.write("Python is awesome!")
# File is CLOSED automatically when the 'with' block ends!
```

## How It Works: The `__enter__` and `__exit__` Methods

Any class can become a context manager by implementing these two magic methods.

1.  **`__enter__`**: Setup logic. Runs *at the start* of the `with` block.
2.  **`__exit__`**: Teardown logic. Runs *at the end* of the `with` block (and handles any exceptions!).

```python
class MyTimer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self # This becomes the object 'as timer'

    def __exit__(self, exc_type, exc_val, exc_tb):
        # Calculate time and cleanup!
        self.end = time.perf_counter()
        print(f"Elapsed: {self.end - self.start:.4f}s")
        # Returning True will "swallow" any exceptions!
        return False

with MyTimer():
    time.sleep(1) # Record this!
# Output: Elapsed: 1.0001s
```

## Using `contextlib`: The Shortcut!

Writing a class for every context manager can be overkill. The **`contextlib`** module provides a decorator that turns a **generator function** into a context manager using `yield`.

-   Code **before** `yield` is the setup (`__enter__`).
-   The **yielded** value is the object returned.
-   Code **after** `yield` is the teardown (`__exit__`).

```python
from contextlib import contextmanager

@contextmanager
def temporary_file(name):
    print(f"Creating {name}...")
    file = open(name, "w")
    try:
        # yield is where the developer's work happens!
        yield file
    finally:
        # Always runs even if there's an error in the 'with' block!
        print(f"Closing {name}...")
        file.close()

with temporary_file("test.log") as f:
    f.write("Log started")
```

## Other Common Use Cases

| Context Manager | Purpose |
| :--- | :--- |
| **with open()** | File handling |
| **with threading.Lock()** | Synchronization for concurrency |
| **with sqlite3.connect()** | Database transactions |
| **with decimal.localcontext()**| Floating-point precision Control |
| **with unittest.mock.patch()** | Temporary code replacement for testing |

## Why Use Context Managers?

1.  **Reliability**: Prevents resource leaks (memory, open files, network sockets).
2.  **Safety**: Ensures resources are cleaned up even if the program crashes.
3.  **Readability**: Makes it clear exactly where a resource is being used.
4.  **Standardization**: Everyone knows `with` means "I'm using this resource temporarily."

## Summary

| Term | Description |
| :--- | :--- |
| **with** | The keyword to activate a context manager |
| **__enter__** | Setup logic |
| **__exit__** | Cleanup/Teardown logic |
| **yield** | Used in `contextlib` to separate setup and teardown |
| **Best For** | File I/O, DB Connections, Locks, Timers |
| **Closing** | Handled automatically! |
| **Exception Handling** | `__exit__` handles errors for you |
| **Nested context** | `with open(a) as fa, open(b) as fb:` |
| **Resource Leak** | Not closing resources (avoid this with `with`!) |
| **Contextlib** | Library for building custom managers |
| **Exit Stack** | Manage a dynamic list of context managers (`contextlib.ExitStack`) |
| **Suppress** | `contextlib.suppress(Error)` to ignore specific errors |
| **Redirect** | `contextlib.redirect_stdout()` to capture print output |
