---
title: "Arrays"
description: "One-dimensional, multi-dimensional arrays, and array decay"
---

## What Are Arrays?

An array is a contiguous block of memory holding a fixed number of elements of the same type. Unlike dynamic collections in higher-level languages, C arrays have a **fixed size** determined at compile time.

```c
#include <stdio.h>

int main() {
    int scores[5] = {95, 87, 76, 92, 88};
    
    for (int i = 0; i < 5; i++) {
        printf("Score %d: %d\n", i + 1, scores[i]);
    }
    
    return 0;
}
```

## Declaration and Initialization

```c
// Declaration with size
int numbers[10];

// Declaration with initializer (size deduced)
int primes[] = {2, 3, 5, 7, 11};  // Size = 5

// Partial initialization (remaining elements become 0)
int data[10] = {1, 2, 3};  // {1, 2, 3, 0, 0, 0, 0, 0, 0, 0}

// Zero-initialize all elements
int zeros[100] = {0};

// Designated initializers (C99)
int sparse[10] = {[0] = 1, [5] = 50, [9] = 99};
```

> **Warning:** Uninitialized local arrays contain **garbage values** — whatever happened to be in that memory. Always initialize your arrays.

## Accessing Elements

Array indexing starts at **0** and goes to **size - 1**:

```c
int arr[5] = {10, 20, 30, 40, 50};

printf("%d\n", arr[0]);    // 10 (first element)
printf("%d\n", arr[4]);    // 50 (last element)

arr[2] = 99;               // Modify the third element
printf("%d\n", arr[2]);    // 99
```

> **Critical:** C does **not** check array bounds. Accessing `arr[5]` or `arr[-1]` is **undefined behavior** — it may crash, corrupt data, or appear to work. This is one of the most common sources of security vulnerabilities in C programs.

## Getting the Array Length

```c
int arr[] = {1, 2, 3, 4, 5};
int length = sizeof(arr) / sizeof(arr[0]);
printf("Length: %d\n", length);  // 5
```

> **Important:** This trick only works where the array is declared. Once passed to a function, the array decays to a pointer, and `sizeof` returns the pointer size instead.

## Multi-Dimensional Arrays

```c
// 2D array (3 rows × 4 columns)
int matrix[3][4] = {
    {1,  2,  3,  4},
    {5,  6,  7,  8},
    {9, 10, 11, 12}
};

// Access: matrix[row][col]
printf("%d\n", matrix[1][2]);  // 7

// Iterate
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        printf("%3d ", matrix[i][j]);
    }
    printf("\n");
}
```

## Array Decay

When you use an array name in most contexts, it **decays** to a pointer to its first element:

```c
int arr[5] = {10, 20, 30, 40, 50};

int *ptr = arr;         // arr decays to &arr[0]
printf("%d\n", *ptr);   // 10
printf("%d\n", ptr[2]); // 30 (pointer arithmetic)
```

This is why arrays are always passed by pointer to functions — the function receives `int*`, not a copy of the array.

## Practical Example: Finding Min and Max

```c
#include <stdio.h>

void find_min_max(const int arr[], int size, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main() {
    int data[] = {34, 12, 78, 5, 91, 23, 67};
    int size = sizeof(data) / sizeof(data[0]);
    int min, max;
    
    find_min_max(data, size, &min, &max);
    printf("Min: %d, Max: %d\n", min, max);  // Min: 5, Max: 91
    return 0;
}
```

## Summary

| Concept | Key Point |
|---------|-----------|
| Fixed size | Determined at compile time |
| Indexing | Zero-based: `0` to `size - 1` |
| No bounds checking | Out-of-bounds access is undefined behavior |
| Decay | Array name becomes a pointer in most contexts |
| 2D arrays | `arr[row][col]`, stored row-major in memory |
| Size trick | `sizeof(arr) / sizeof(arr[0])` — only at declaration site |
