---
title: "CGo"
description: "Calling C code from Go and performance considerations"
---

## What is CGo?

**CGo** is a bridge that allows **Go** packages to call C code. It is useful for using existing high-performance C libraries or interacting with low-level OS APIs that don't have a Go equivalent.

```go
package main

/*
#include <stdio.h>
#include <stdlib.h>

void myPrint(char* s) {
    printf("%s\n", s);
}
*/
import "C"
import "unsafe"

func main() {
    cs := C.CString("Hello from C!")
    defer C.free(unsafe.Pointer(cs))
    C.myPrint(cs)
}
```

Wait! The comment block immediately above `import "C"` is actual C code. This is a special Go directive.

## The Cost of CGo

While CGo is powerful, it comes with several significant downsides:

1.  **Performance**: Crossing the boundary between Go and C is expensive (it takes ~50ns to 200ns per call).
2.  **Compilation**: Slows down build times significantly because it requires a C compiler (GCC/Clang).
3.  **Deployment**: You can no longer build a simple "static binary." Your app now depends on the specific C libraries installed on the host OS.
4.  **Debugging**: Memory errors in C code are invisible to Go's safety tools and can crash your whole app.

## When to use CGo?

-   **Graphics**: Using libraries like OpenGL or Vulkan.
-   **Audio**: Using specialized audio processing libraries.
-   **Crypto**: Using highly optimized C-based cryptographic libraries (if Go's standard lib isn't enough).
-   **OS APIs**: Accessing non-standard platform features.

> [!TIP]
> "CGo is not Go." Before using CGo, check if there is a pure-Go alternative. Pure-Go code is easier to maintain, faster to compile, and more portable.

## Summary

| Term | Description |
| :--- | :--- |
| **import "C"** | The magic directive that enables CGo |
| **Preamble** | The C code written in comments above `import "C"` |
| **unsafe** | Package used to convert Go pointers to C pointers |
| **Memory** | You MUST manually free memory allocated by C! |
| **Portability**| Reduced; requires C toolchain on target machine |
| **Best For** | Heavy math, graphics, system libraries |
| **Worst For** | Simple tasks that Go can do natively |
| **Logic** | C code runs outside the Go runtime and scheduler |
| **Safety** | Bypasses all of Go's memory safety guarantees |
| **Tooling** | Requires `CGO_ENABLED=1` environment variable |
| **Binary** | Often results in a dynamically linked binary |
| **Standard** | `net` and `os/user` packages can use CGo for DNS/User lookups |
