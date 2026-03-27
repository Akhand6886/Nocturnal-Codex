---
title: "Memory Layout"
description: "Stack, heap, data segment, BSS, and text segment"
---

## How C Programs Use Memory

When a C program runs, the operating system divides its memory into distinct segments. Understanding this layout is crucial for debugging crashes, optimizing performance, and mastering pointers.

## The Five Memory Segments

From low addresses to high addresses:

```
+------------------+  High addresses
|      Stack       |  ← Local variables, function calls (grows DOWN)
+------------------+
|        ↓         |
|   Free space     |
|        ↑         |
+------------------+
|       Heap       |  ← Dynamic allocation (grows UP)
+------------------+
|       BSS        |  ← Uninitialized global/static variables
+------------------+
|       Data       |  ← Initialized global/static variables
+------------------+
|       Text       |  ← Your compiled code (read-only)
+------------------+  Low addresses
```

## The Stack

The stack stores **local variables**, **function parameters**, and **return addresses**. It's managed automatically — memory is allocated when a function is called and freed when it returns.

```c
void foo() {
    int x = 10;    // Pushed onto the stack
    int arr[100];  // 400 bytes on the stack
}                  // x and arr are automatically freed here
```

> **Warning:** The stack has a limited size (typically 1–8 MB). Declaring very large local arrays or deep recursion can cause a **stack overflow**.

## The Heap

The heap is for **dynamic memory** — allocated at runtime with `malloc` and freed with `free`. It's the largest region and persists until explicitly freed.

```c
int *p = malloc(1000 * sizeof(int));  // Allocated on the heap
// ... use p ...
free(p);  // Manually freed
```

## Data and BSS Segments

```c
int initialized = 42;       // Data segment (has a value)
int uninitialized;           // BSS segment (zero-initialized by OS)
static int counter = 0;     // Data segment (static)
const char *msg = "Hello";  // Pointer in data, string in text (read-only)
```

## Practical Demonstration

```c
#include <stdio.h>
#include <stdlib.h>

int global_init = 10;     // Data segment
int global_uninit;         // BSS segment

int main() {
    int local = 5;                        // Stack
    static int local_static = 20;         // Data segment
    int *heap_ptr = malloc(sizeof(int));   // Heap
    
    printf("Text:   %p (main function)\n", (void*)main);
    printf("Data:   %p (global_init)\n", (void*)&global_init);
    printf("BSS:    %p (global_uninit)\n", (void*)&global_uninit);
    printf("Heap:   %p (malloc'd)\n", (void*)heap_ptr);
    printf("Stack:  %p (local var)\n", (void*)&local);
    
    free(heap_ptr);
    return 0;
}
```

## Summary

| Segment | Contents | Managed By | Lifetime |
|---------|----------|-----------|----------|
| Text | Compiled code | OS | Program duration |
| Data | Initialized globals/statics | Compiler | Program duration |
| BSS | Uninitialized globals/statics | OS (zeroed) | Program duration |
| Heap | `malloc`'d memory | Programmer | Until `free()` |
| Stack | Local variables, call frames | Compiler | Until function returns |
