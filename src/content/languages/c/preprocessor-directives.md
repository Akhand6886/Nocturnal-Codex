---
title: "Preprocessor Directives"
description: "#include, #define, #ifdef, #pragma, and conditional compilation"
---

## What Is the Preprocessor?

The C preprocessor runs **before** compilation. It performs textual transformations on your source code — including files, expanding macros, and conditionally compiling sections. All preprocessor directives start with `#`.

## `#include` — File Inclusion

```c
#include <stdio.h>      // System header (searches system paths)
#include "my_header.h"   // Local header (searches current directory first)
```

The preprocessor literally pastes the entire contents of the included file into your source.

## `#define` — Constants and Macros

```c
// Object-like macro (constant)
#define PI 3.14159265
#define MAX_SIZE 1024

// Function-like macro
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

double area = PI * r * r;
int result = SQUARE(5);  // Expands to ((5) * (5))
```

> **Warning:** Always parenthesize macro parameters and the whole expression to prevent operator precedence bugs.

## Conditional Compilation

```c
#define DEBUG 1

#ifdef DEBUG
    printf("Debug: x = %d\n", x);
#endif

#ifndef PRODUCTION
    // Development-only code
#endif

#if defined(LINUX) && !defined(MACOS)
    // Linux-specific code
#elif defined(MACOS)
    // macOS-specific code
#else
    // Generic fallback
#endif
```

## Include Guards

Prevent a header from being included multiple times:

```c
// my_header.h
#ifndef MY_HEADER_H
#define MY_HEADER_H

// Header contents here

#endif // MY_HEADER_H
```

Or use the non-standard but widely supported:

```c
#pragma once
```

## Predefined Macros

| Macro | Value |
|-------|-------|
| `__FILE__` | Current filename |
| `__LINE__` | Current line number |
| `__DATE__` | Compilation date |
| `__TIME__` | Compilation time |
| `__func__` | Current function name (C99) |

```c
printf("Error at %s:%d in %s()\n", __FILE__, __LINE__, __func__);
```

## `#pragma` — Compiler Directives

```c
#pragma once               // Include guard
#pragma pack(1)            // Remove struct padding
#pragma warning(disable: 4996)  // MSVC: suppress warning
```

## Summary

| Directive | Purpose |
|-----------|---------|
| `#include` | Paste file contents |
| `#define` | Create macros/constants |
| `#ifdef` / `#ifndef` | Conditional compilation |
| `#pragma` | Compiler-specific hints |
| `#undef` | Remove a macro definition |
| `#error` | Force a compile error |
