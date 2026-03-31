---
title: "C Extensions"
description: "ctypes, Cython, pybind11, and FFI for performance"
---

## Why Python C Extensions?

Python is an excellent language for high-level logic and rapid development, but it's not the fastest for compute-heavy tasks like image processing, cryptography, or heavy mathematical simulations. **C Extensions** allow you to write performance-critical code in a fast language like C, C++, or Rust, and then use it *directly* in your Python script.

```python
# The standard Python loop: 0.1s
# The C Extension loop: 0.0001s
```

## 1. Using `ctypes` (No Compilation Needed)

The built-in **`ctypes`** module is the easiest way to call existing functions from shared library files (`.so` on Linux, `.dll` on Windows).

```python
import ctypes

# 1. Load the standard C math library (Linux/macOS)
libc = ctypes.CDLL("libc.dylib")

# 2. Call a C function: printf
# This is physically calling C's printf function!
libc.printf(b"Hello from C's printf!\n")

# 3. Call math functions
libc.sin.restype = ctypes.c_double
libc.sin.argtypes = [ctypes.c_double]
print(libc.sin(1.0))
```

## 2. Using Cython: Python + C

**Cython** is a superset of Python that compiles directly to C code. It’s the most popular way to speed up your code. By simply adding type declarations, you can get near-C performance!

```python
# simple.pyx (Cython Code)
def fast_sum(int n):
    cdef int i
    cdef long total = 0
    for i in range(n):
        total += i
    return total
```

To use it:
1.  **Compile** it using a `setup.py` file.
2.  **Import** it as a normal module in Python!

## 3. Using `pybind11`: The Modern Way (C++)

If you have a large C++ library, **`pybind11`** is the current industry standard. It's used by major projects like **PyTorch** and **TensorFlow** because it allows you to expose C++ 11 (or newer) classes and functions to Python with very little boilerplate.

```cpp
// math.cpp (C++ with pybind11)
#include <pybind11/pybind11.h>

int add(int i, int j) {
    return i + j;
}

PYBIND11_MODULE(example, m) {
    m.doc() = "pybind11 example plugin";
    m.def("add", &add, "A function that adds two numbers");
}
```

## 4. FFI (Foreign Function Interface)

**FFI** tools like `cffi` provide a bridge for calling C code from Python. They are often more robust and easier to use than the low-level `ctypes`.

```python
from cffi import FFI
ffi = FFI()

# Define the C function signature!
ffi.cdef("int printf(const char *format, ...);")
C = ffi.dlopen(None)
C.printf(b"Hello from CFFI!\n")
```

## When to Use C Extensions?

1.  **Performance Bottlenecks**: You've profiled your Python code and found a function that's running millions of times.
2.  **Existing Libraries**: You want to use a powerful library written in C (like SQLite, OpenSSL, or Game Engines) that doesn't have a Python version.
3.  **Encapsulation**: You want to hide certain logic in a compiled binary.

## Summary

| Term | Description |
| :--- | :--- |
| **ctypes** | Built-in, simplest way to call shared libraries |
| **Cython** | Superset of Python; compiles code to C binaries |
| **pybind11**| Industry standard for exposing C++ code to Python |
| **FFI** | Bridge for calling functions in other languages |
| **Performance**| Up to 100x speedups for CPU-bound tasks |
| **GIL** | C extensions can release the GIL for true parallelism |
| **Best For** | Math, Images, Cryptography, Gaming |
| **Shared Lib** | `.so` or `.dll` files |
| **FFI Generator** | Tool like `cffi` to generate code bindings |
| **C-API** | Python’s internal C interface (very complex!) |
| **Extension** | A compiled binary file imported like a module (`.pyd` or `.so`) |
| **Setup.py** | Script to compile and install your C extensions |
| **Cythonized**| Code transformed from Python to C by Cython |
| **Static Linking** | Binary contains the entire library in one file |
| **Dynamic Linking**| Binary refers to other library files on the system |
