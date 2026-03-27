---
title: "Inline Functions"
description: "Compiler hints for function inlining and performance"
---

## What Are Inline Functions?

The `inline` keyword suggests to the compiler that it should replace function calls with the function's body directly at the call site. This eliminates the overhead of a function call (pushing arguments, jumping, returning) for small, frequently called functions.

```c
#include <stdio.h>

inline int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int result = max(10, 20);  // Compiler may replace with: (10 > 20) ? 10 : 20
    printf("Max: %d\n", result);
    return 0;
}
```

## When to Use `inline`

Inline functions are most beneficial for:
- **Small functions** (1–5 lines)
- **Frequently called** functions (inside loops)
- **Performance-critical** sections

```c
// Good candidates for inline
inline int square(int x) { return x * x; }
inline int clamp(int val, int min, int max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

// Bad candidate — too large
inline void sort_array(int *arr, int n) {
    // 50 lines of sorting code...
    // Inlining this would bloat the binary
}
```

> **Important:** `inline` is a *hint*, not a command. The compiler is free to ignore it. Modern compilers with `-O2` or higher often inline functions automatically, even without the keyword.

## `inline` vs Macros

Before C99 introduced `inline`, developers used macros for "inline" behavior:

```c
// Macro approach — dangerous
#define SQUARE(x) ((x) * (x))

// Problem: x is evaluated TWICE
int a = 5;
int result = SQUARE(a++);  // Undefined behavior! a++ happens twice

// Inline function — safe
inline int square(int x) { return x * x; }
int result2 = square(a++);  // Safe: a++ evaluated once
```

| Feature | `inline` function | `#define` macro |
|---------|------------------|-----------------|
| Type checking | ✅ Yes | ❌ No |
| Debugging | ✅ Has symbol | ❌ No symbol |
| Side effects | ✅ Safe | ❌ Double evaluation |
| Scope | ✅ Respects scope | ❌ Textual substitution |

> **Best Practice:** Prefer `inline` functions over macros for anything that behaves like a function. Use macros only for constants and conditional compilation.

## `static inline` — The Common Pattern

In practice, `inline` functions in header files should be `static inline` to avoid linker errors:

```c
// math_utils.h
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

static inline int min(int a, int b) {
    return (a < b) ? a : b;
}

static inline int abs_val(int x) {
    return (x < 0) ? -x : x;
}

#endif
```

Without `static`, including the header in multiple `.c` files causes "multiple definition" linker errors.

## Summary

- `inline` suggests the compiler replace calls with function body
- Best for small, hot functions
- The compiler may ignore the hint — and that's fine
- Use `static inline` in headers to avoid linker issues
- Prefer `inline` functions over function-like macros
