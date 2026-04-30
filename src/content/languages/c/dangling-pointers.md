---
title: "Dangling Pointers"
description: "Use-after-free, double-free, and defensive patterns"
---

## What Is a Dangling Pointer?

A dangling pointer points to memory that has been freed or is no longer valid. Dereferencing it is **undefined behavior** — it may crash, return garbage, or silently corrupt data.

## The Three Main Causes

### 1. Use-After-Free

```c
int *p = malloc(sizeof(int));
*p = 42;
free(p);
printf("%d\n", *p);  // UNDEFINED BEHAVIOR — p is dangling!

// Fix: set to NULL after free
free(p);
p = NULL;
```

### 2. Returning Local Variable Address

```c
int *bad_function() {
    int local = 42;
    return &local;  // local is destroyed when function returns
}

int *p = bad_function();
printf("%d\n", *p);  // Dangling — stack frame is gone!
```

### 3. Double-Free

```c
int *p = malloc(100);
free(p);
free(p);  // UNDEFINED BEHAVIOR — double free!

// Fix: NULL after free
free(p);
p = NULL;
free(p);  // Safe: free(NULL) is a no-op
```

## Defensive Patterns

```c
// Safe free macro
#define SAFE_FREE(ptr) do { free(ptr); (ptr) = NULL; } while(0)

int *data = malloc(100);
SAFE_FREE(data);
// data is now NULL — safe to check
```

## Summary

| Bug | Cause | Prevention |
|-----|-------|-----------|
| Use-after-free | Accessing freed memory | Set to NULL after free |
| Dangling return | Returning local address | Use malloc or static |
| Double-free | Freeing twice | NULL after free |
