---
title: "C Extensions"
description: "ctypes, Cython, pybind11, and FFI for performance"
---

## Why Python C Extensions?

Python is an excellent language for high-level logic and rapid development, but it's not the fastest for compute-heavy tasks like image processing, cryptography, or heavy mathematical simulations. **C Extensions** allow you to write performance-critical code in a fast language like C, C++, or Rust, and then use it *directly* in your Python script.

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

To use it, you'd compile it using a `setup.py` file and import it as a normal module.

## 3. Using `pybind11`: The Modern Way (C++)

If you have a large C++ library, **`pybind11`** is the current industry standard. It's used by major projects like **PyTorch** and **TensorFlow** because it allows you to expose C++ features to Python with minimal effort.

## Summary

| Term | Description |
| :--- | :--- |
| **ctypes** | Simple way to call shared libraries |
| **Cython** | Superset of Python; compiles code to C binaries |
| **pybind11**| Industry standard for exposing C++ code to Python |
| **FFI** | Bridge for calling functions in other languages |
| **Performance**| Up to 100x speedups for CPU-bound tasks |
| **GIL** | C extensions can release the GIL for true parallelism |
| **Best For** | Math, Images, Cryptography, Gaming |
