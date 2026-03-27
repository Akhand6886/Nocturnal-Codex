---
title: "Dynamic Allocation"
description: "malloc, calloc, realloc, free — and when to use each"
---

## Why Dynamic Allocation?

Local arrays have fixed sizes determined at compile time. Dynamic allocation lets you request memory at runtime — essential for data structures, user-driven data, and programs that don't know their data size in advance.

## The Big Four: `malloc`, `calloc`, `realloc`, `free`

### `malloc` — Allocate Memory

```c
#include <stdlib.h>

int *arr = (int *)malloc(10 * sizeof(int));
if (arr == NULL) {
    fprintf(stderr, "Allocation failed!\n");
    exit(1);
}
// arr now points to space for 10 ints (UNinitialized — contains garbage)
```

### `calloc` — Allocate and Zero-Initialize

```c
int *arr = (int *)calloc(10, sizeof(int));
// arr now points to space for 10 ints, ALL set to 0
```

### `realloc` — Resize Allocated Memory

```c
int *arr = malloc(5 * sizeof(int));
// Need more space...
arr = realloc(arr, 10 * sizeof(int));
// arr now has room for 10 ints, original 5 values preserved
```

> **Warning:** `realloc` may move the block to a new address. Always reassign: `arr = realloc(arr, new_size)`. But never do `ptr = realloc(ptr, size)` without error checking — if it fails, you lose the original pointer!

```c
// Safe realloc pattern
int *temp = realloc(arr, new_size);
if (temp == NULL) {
    // Handle error — arr is still valid
    free(arr);
    exit(1);
}
arr = temp;
```

### `free` — Release Memory

```c
free(arr);
arr = NULL;  // Prevent dangling pointer
```

> **Critical Rules:**
> - Always `free()` what you `malloc()`
> - Never `free()` the same pointer twice (double-free)
> - Never use memory after `free()` (use-after-free)
> - Set pointer to `NULL` after freeing

## Practical Example: Dynamic Array

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} DynArray;

DynArray* da_create(int initial_cap) {
    DynArray *da = malloc(sizeof(DynArray));
    da->data = malloc(initial_cap * sizeof(int));
    da->size = 0;
    da->capacity = initial_cap;
    return da;
}

void da_push(DynArray *da, int value) {
    if (da->size >= da->capacity) {
        da->capacity *= 2;
        da->data = realloc(da->data, da->capacity * sizeof(int));
    }
    da->data[da->size++] = value;
}

void da_free(DynArray *da) {
    free(da->data);
    free(da);
}

int main() {
    DynArray *arr = da_create(4);
    for (int i = 0; i < 20; i++) da_push(arr, i * 10);
    for (int i = 0; i < arr->size; i++) printf("%d ", arr->data[i]);
    printf("\n");
    da_free(arr);
    return 0;
}
```

## Summary

| Function | Purpose | Initialized? |
|----------|---------|-------------|
| `malloc(size)` | Allocate bytes | ❌ Garbage |
| `calloc(n, size)` | Allocate and zero | ✅ Zeroed |
| `realloc(ptr, size)` | Resize allocation | Preserved |
| `free(ptr)` | Release memory | — |
