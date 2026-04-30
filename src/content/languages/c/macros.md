---
title: "Macros"
description: "Object-like vs function-like macros, pitfalls, and best practices"
---

## Object-Like Macros

Simple text substitution — used for constants:

```c
#define PI 3.14159265
#define BUFFER_SIZE 4096
#define VERSION "2.1.0"
```

## Function-Like Macros

```c
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define ABS(x) ((x) < 0 ? -(x) : (x))
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))
```

## The Parenthesization Rule

Without proper parentheses, macros produce subtle bugs:

```c
// BAD
#define DOUBLE(x) x * 2
int result = DOUBLE(3 + 1);  // Expands to: 3 + 1 * 2 = 5 (not 8!)

// GOOD
#define DOUBLE(x) ((x) * 2)
int result = DOUBLE(3 + 1);  // Expands to: ((3 + 1) * 2) = 8
```

## Multi-Line Macros

Use `do { ... } while(0)` for statement macros:

```c
#define LOG_ERROR(msg) do { \
    fprintf(stderr, "[ERROR] %s:%d: %s\n", __FILE__, __LINE__, msg); \
} while(0)

// Safe to use in if/else without braces
if (error)
    LOG_ERROR("Something failed");
else
    printf("All good\n");
```

## Stringification and Token Pasting

```c
// # turns argument into a string
#define STRINGIFY(x) #x
printf("%s\n", STRINGIFY(hello));  // Prints: hello

// ## concatenates tokens
#define MAKE_FUNC(name) void func_##name() { printf(#name "\n"); }
MAKE_FUNC(test)   // Creates: void func_test() { printf("test\n"); }
```

## Variadic Macros (C99)

```c
#define DEBUG_LOG(fmt, ...) \
    fprintf(stderr, "[DEBUG] " fmt "\n", ##__VA_ARGS__)

DEBUG_LOG("Connection to %s on port %d", "localhost", 8080);
```

## When to Use (and Avoid) Macros

**Use macros for:**
- Compile-time constants
- Conditional compilation
- `ARRAY_SIZE` and similar utility patterns

**Prefer inline functions for:**
- Anything that behaves like a function
- Type safety is important
- Arguments might have side effects

## Summary

| Type | Example | Pitfall |
|------|---------|---------|
| Object-like | `#define SIZE 100` | None |
| Function-like | `#define MAX(a,b) ((a)>(b)?(a):(b))` | Double evaluation |
| Multi-line | `do { ... } while(0)` | Missing backslash |
| Stringify | `#x` | — |
| Concat | `a##b` | — |
