---
title: "Function Pointers"
description: "Callbacks, dispatch tables, and polymorphism in C"
---

## What Are Function Pointers?

A function pointer stores the address of a function, allowing you to call functions indirectly. This enables callbacks, plugin systems, and runtime dispatch — the closest C gets to polymorphism.

```c
#include <stdio.h>

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }

int main() {
    // Declare a function pointer
    int (*operation)(int, int);
    
    operation = add;
    printf("5 + 3 = %d\n", operation(5, 3));  // 8
    
    operation = subtract;
    printf("5 - 3 = %d\n", operation(5, 3));  // 2
    
    return 0;
}
```

## Syntax Breakdown

```c
// Regular function
int my_func(int x, int y);

// Pointer to that function type
int (*func_ptr)(int, int);

// With typedef (much cleaner)
typedef int (*MathOp)(int, int);
MathOp op = add;
```

## Callbacks

Pass a function pointer as an argument to another function:

```c
#include <stdio.h>

void apply_to_array(int arr[], int size, int (*transform)(int)) {
    for (int i = 0; i < size; i++) {
        arr[i] = transform(arr[i]);
    }
}

int double_it(int x) { return x * 2; }
int square_it(int x) { return x * x; }

int main() {
    int data[] = {1, 2, 3, 4, 5};
    
    apply_to_array(data, 5, double_it);
    // data is now {2, 4, 6, 8, 10}
    
    apply_to_array(data, 5, square_it);
    // data is now {4, 16, 36, 64, 100}
    return 0;
}
```

## Dispatch Tables

Use an array of function pointers to replace long `switch` statements:

```c
#include <stdio.h>

typedef double (*CalcOp)(double, double);

double op_add(double a, double b) { return a + b; }
double op_sub(double a, double b) { return a - b; }
double op_mul(double a, double b) { return a * b; }
double op_div(double a, double b) { return b != 0 ? a / b : 0; }

int main() {
    CalcOp operations[] = {op_add, op_sub, op_mul, op_div};
    const char *symbols = "+-*/";
    
    double a = 10, b = 3;
    for (int i = 0; i < 4; i++) {
        printf("%.0f %c %.0f = %.2f\n", a, symbols[i], b, operations[i](a, b));
    }
    return 0;
}
```

## `qsort` — The Standard Library Callback

The C standard library's `qsort` uses a function pointer for custom comparisons:

```c
#include <stdio.h>
#include <stdlib.h>

int compare_asc(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int compare_desc(const void *a, const void *b) {
    return (*(int*)b - *(int*)a);
}

int main() {
    int arr[] = {42, 17, 93, 5, 28};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    qsort(arr, n, sizeof(int), compare_asc);
    // arr is now {5, 17, 28, 42, 93}
    
    qsort(arr, n, sizeof(int), compare_desc);
    // arr is now {93, 42, 28, 17, 5}
    return 0;
}
```

## Summary

| Concept | Key Point |
|---------|-----------|
| Syntax | `return_type (*name)(param_types)` |
| `typedef` | Makes syntax readable |
| Callbacks | Pass behavior as a parameter |
| Dispatch tables | Array of function pointers replaces `switch` |
| `qsort` | Standard library example of callbacks |
