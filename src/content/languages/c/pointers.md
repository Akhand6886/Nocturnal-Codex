---
title: "Pointers"
description: "Address-of, dereference, pointer arithmetic, NULL, void pointers"
---

## What Are Pointers?

A pointer is a variable that stores the **memory address** of another variable. Pointers are the most powerful — and most dangerous — feature of C. They enable dynamic memory management, efficient data structures, and direct hardware access.

```c
#include <stdio.h>

int main() {
    int x = 42;
    int *ptr = &x;   // ptr holds the ADDRESS of x
    
    printf("Value of x:     %d\n", x);        // 42
    printf("Address of x:   %p\n", (void*)&x); // 0x7fff...
    printf("Value of ptr:   %p\n", (void*)ptr); // Same address
    printf("Value at ptr:   %d\n", *ptr);       // 42 (dereference)
    
    *ptr = 100;  // Modify x through the pointer
    printf("x is now:       %d\n", x);          // 100
    
    return 0;
}
```

## The Two Core Operators

| Operator | Name | Purpose |
|----------|------|---------|
| `&` | Address-of | Gets the memory address of a variable |
| `*` | Dereference | Accesses the value at a memory address |

```c
int num = 10;
int *p = &num;    // & gets address, * in declaration means "pointer to"

*p = 20;          // * dereferences: writes to the address p holds
printf("%d\n", num); // 20
```

## Pointer Arithmetic

Pointers can be incremented and decremented. The compiler automatically scales the offset by the size of the pointed-to type:

```c
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

printf("%d\n", *p);       // 10
printf("%d\n", *(p + 1)); // 20
printf("%d\n", *(p + 4)); // 50

p += 2;
printf("%d\n", *p);       // 30

// Pointer subtraction gives the number of elements between them
int *start = &arr[0];
int *end = &arr[4];
printf("Distance: %ld elements\n", end - start);  // 4
```

> **Key Insight:** `arr[i]` is exactly equivalent to `*(arr + i)`. Array indexing IS pointer arithmetic with syntactic sugar.

## NULL Pointers

A NULL pointer points to nothing. Always initialize pointers and check before dereferencing:

```c
int *p = NULL;

if (p != NULL) {
    printf("%d\n", *p);  // Safe
} else {
    printf("Pointer is NULL\n");
}
```

> **Critical:** Dereferencing a NULL pointer is **undefined behavior** — usually a segfault crash. Always validate pointers before use.

## Void Pointers

`void*` is a generic pointer that can point to any type. It's used extensively in C standard library functions like `malloc`, `qsort`, and `memcpy`.

```c
#include <stdio.h>

void print_value(void *ptr, char type) {
    switch (type) {
        case 'i': printf("%d\n", *(int*)ptr); break;
        case 'f': printf("%.2f\n", *(float*)ptr); break;
        case 'c': printf("%c\n", *(char*)ptr); break;
    }
}

int main() {
    int i = 42;
    float f = 3.14f;
    char c = 'X';
    
    print_value(&i, 'i');  // 42
    print_value(&f, 'f');  // 3.14
    print_value(&c, 'c');  // X
    return 0;
}
```

> **Note:** You cannot dereference a `void*` directly — you must cast it first.

## Pointers to Pointers

A pointer can point to another pointer, creating multiple levels of indirection:

```c
int x = 5;
int *p = &x;
int **pp = &p;

printf("%d\n", **pp);  // 5 (double dereference)
**pp = 99;
printf("%d\n", x);     // 99
```

This is commonly used for dynamically allocated 2D arrays and for modifying a pointer inside a function.

## Common Mistakes

```c
// 1. Using an uninitialized pointer
int *p;          // Garbage address!
*p = 10;         // CRASH (or silent corruption)

// 2. Dangling pointer — pointing to freed/expired memory
int *bad_func() {
    int local = 42;
    return &local;  // WARNING: local is destroyed when function returns
}

// 3. Forgetting the & in scanf
int x;
scanf("%d", x);    // WRONG — should be &x
scanf("%d", &x);   // CORRECT
```

## Summary

| Concept | Syntax | Purpose |
|---------|--------|---------|
| Declare | `int *p;` | Pointer to int |
| Address-of | `p = &x;` | Get address of x |
| Dereference | `*p = 10;` | Access/modify value at address |
| NULL | `int *p = NULL;` | Pointer to nothing |
| Void pointer | `void *p;` | Generic pointer |
| Arithmetic | `p + 1` | Next element (scaled by type) |
| Double pointer | `int **pp;` | Pointer to a pointer |
