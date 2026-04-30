---
title: "Header Files"
description: "Include guards, forward declarations, and API design"
---

## What Are Header Files?

Header files (`.h`) declare the *interface* of your code — function prototypes, type definitions, constants, and macros. Other `.c` files `#include` them to use your code without seeing the implementation.

## Anatomy of a Good Header

```c
// math_utils.h
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

// Type definitions
typedef struct {
    double x, y;
} Vec2;

// Function prototypes
Vec2 vec2_add(Vec2 a, Vec2 b);
Vec2 vec2_scale(Vec2 v, double s);
double vec2_length(Vec2 v);

// Constants
#define VEC2_ZERO ((Vec2){0.0, 0.0})

#endif // MATH_UTILS_H
```

```c
// math_utils.c — the implementation
#include "math_utils.h"
#include <math.h>

Vec2 vec2_add(Vec2 a, Vec2 b) {
    return (Vec2){a.x + b.x, a.y + b.y};
}

double vec2_length(Vec2 v) {
    return sqrt(v.x * v.x + v.y * v.y);
}
```

## Include Guards vs `#pragma once`

```c
// Traditional (100% portable)
#ifndef MY_HEADER_H
#define MY_HEADER_H
// ...
#endif

// Modern (supported by all major compilers)
#pragma once
// ...
```

## What Goes in a Header

| ✅ Put in header | ❌ Don't put in header |
|---|---|
| Function prototypes | Function bodies |
| `typedef` and `struct` definitions | Variable definitions |
| `#define` constants | `static` variables |
| `extern` variable declarations | Large data arrays |
| `static inline` functions | — |

## Forward Declarations

Declare a type exists without defining it — useful for breaking circular dependencies:

```c
// In header A
struct NodeB;  // Forward declaration
struct NodeA {
    struct NodeB *partner;
};
```

## Summary

- Headers define the **interface**, source files define the **implementation**
- Always use include guards or `#pragma once`
- Never put variable definitions in headers
- Use forward declarations to break circular dependencies
