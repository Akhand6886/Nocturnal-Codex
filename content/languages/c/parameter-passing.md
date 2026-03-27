---
title: "Parameter Passing"
description: "Pass by value vs. pass by pointer (simulated pass by reference)"
---

## How C Passes Arguments

C has only one mechanism for passing arguments: **pass by value**. Every function receives a *copy* of the argument. However, by passing **pointers**, you can simulate pass by reference and modify the caller's data.

## Pass by Value

```c
#include <stdio.h>

void try_to_modify(int x) {
    x = 999;  // Modifies the LOCAL copy only
    printf("Inside function: %d\n", x);
}

int main() {
    int num = 42;
    try_to_modify(num);
    printf("After function: %d\n", num);  // Still 42
    return 0;
}
```

The function works with a completely independent copy. The original variable is untouched.

## Pass by Pointer (Simulated Pass by Reference)

To modify the caller's variable, pass a **pointer** to it:

```c
#include <stdio.h>

void modify(int *x) {
    *x = 999;  // Dereference: modifies what x POINTS TO
    printf("Inside function: %d\n", *x);
}

int main() {
    int num = 42;
    modify(&num);   // Pass the ADDRESS of num
    printf("After function: %d\n", num);  // Now 999!
    return 0;
}
```

### The Classic Swap Example

The swap function is the textbook example of why pointers are needed:

```c
// WRONG: swaps local copies, no effect on caller
void bad_swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

// CORRECT: swaps through pointers
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    
    bad_swap(x, y);
    printf("After bad_swap: x=%d, y=%d\n", x, y);  // 10, 20 (unchanged)
    
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\n", x, y);  // 20, 10 (swapped!)
    return 0;
}
```

## Passing Arrays

Arrays in C **always** decay to pointers when passed to functions. This means functions can modify the original array, but you lose size information.

```c
void zero_fill(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        arr[i] = 0;  // Modifies the ORIGINAL array
    }
}

int main() {
    int data[] = {1, 2, 3, 4, 5};
    zero_fill(data, 5);
    // data is now {0, 0, 0, 0, 0}
    return 0;
}
```

> **Important:** You MUST pass the array size separately. Inside the function, `sizeof(arr)` gives the pointer size (4 or 8 bytes), not the array size.

## Passing Structs

### By Value (Copy)

```c
typedef struct {
    double x, y;
} Point;

// Receives a COPY — expensive for large structs
double distance_from_origin(Point p) {
    return sqrt(p.x * p.x + p.y * p.y);
}
```

### By Pointer (Efficient)

```c
// Receives a POINTER — cheap, can modify the original
void translate(Point *p, double dx, double dy) {
    p->x += dx;  // Arrow operator for pointer-to-struct
    p->y += dy;
}

// Use const to prevent modification (read-only access)
void print_point(const Point *p) {
    printf("(%.2f, %.2f)\n", p->x, p->y);
}
```

> **Best Practice:** For structs larger than a pointer (8 bytes on 64-bit), always pass by pointer. Use `const` if you don't intend to modify it.

## Returning Multiple Values

Since C functions can only return one value, use output parameters (pointers) for multiple results:

```c
#include <stdio.h>

// Returns quotient via return, remainder via pointer
int divide(int a, int b, int *remainder) {
    *remainder = a % b;
    return a / b;
}

int main() {
    int rem;
    int quot = divide(17, 5, &rem);
    printf("17 / 5 = %d remainder %d\n", quot, rem);
    // Output: 17 / 5 = 3 remainder 2
    return 0;
}
```

## `const` Correctness

Use `const` to signal that a function will not modify data through a pointer:

```c
// Promise: we won't modify the string
int count_vowels(const char *str) {
    int count = 0;
    for (int i = 0; str[i]; i++) {
        char c = str[i] | 0x20;  // to lowercase
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
            count++;
    }
    return count;
}
```

> **Tip:** Always use `const` for pointer parameters you don't modify. It documents intent, prevents accidental writes, and enables compiler optimizations.

## Summary

| Method | Syntax | Can Modify Original? |
|--------|--------|---------------------|
| By value | `void f(int x)` | ❌ No |
| By pointer | `void f(int *x)` | ✅ Yes |
| Array | `void f(int arr[], int n)` | ✅ Yes (always a pointer) |
| Struct by value | `void f(Point p)` | ❌ No (expensive copy) |
| Struct by pointer | `void f(Point *p)` | ✅ Yes (efficient) |
| Read-only pointer | `void f(const int *x)` | ❌ Compiler-enforced |
