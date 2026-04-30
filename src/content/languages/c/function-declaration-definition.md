---
title: "Function Declaration & Definition"
description: "Prototypes, parameters, return types, and calling conventions"
---

## What Are Functions?

Functions are the building blocks of modular C programs. A function encapsulates a reusable piece of logic that takes inputs (parameters), performs operations, and optionally returns a result.

```c
#include <stdio.h>

// Function definition
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 3);
    printf("5 + 3 = %d\n", result);  // 8
    return 0;
}
```

## Declaration vs Definition

### Function Declaration (Prototype)

A **declaration** tells the compiler that a function exists, what parameters it takes, and what it returns — without providing the body. Declarations typically go in header files or at the top of a source file.

```c
// Declaration (prototype) — note the semicolon, no body
int add(int a, int b);
double calculate_area(double radius);
void print_greeting(const char *name);
```

### Function Definition

A **definition** provides the actual implementation:

```c
// Definition — includes the body
int add(int a, int b) {
    return a + b;
}
```

> **Why separate them?** In multi-file projects, the prototype goes in a `.h` header file so other files can call the function. The definition goes in a single `.c` file. This prevents duplicate definitions while allowing cross-file access.

## Return Types

Every function specifies what type of value it returns:

```c
int get_age() {
    return 25;
}

double get_pi() {
    return 3.14159265;
}

char get_grade(int score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'F';
}

// void means "returns nothing"
void say_hello() {
    printf("Hello!\n");
    // No return statement needed (or use bare 'return;')
}
```

> **Warning:** If a non-void function doesn't execute a `return` statement, the behavior is **undefined**. The compiler may warn you, but won't stop you.

## Parameters

### Pass by Value

In C, all arguments are passed **by value** — the function receives a copy. Modifying the parameter inside the function doesn't affect the original variable.

```c
void double_it(int x) {
    x = x * 2;  // Only modifies the local copy
    printf("Inside: %d\n", x);  // 10
}

int main() {
    int num = 5;
    double_it(num);
    printf("Outside: %d\n", num);  // Still 5!
    return 0;
}
```

### Arrays as Parameters

When you pass an array to a function, it **decays to a pointer**. This means the function can modify the original array, but it loses size information.

```c
// These three are equivalent:
void process(int arr[], int size);
void process(int arr[10], int size);  // Size is ignored!
void process(int *arr, int size);     // What actually happens

void fill_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] = i * 10;
    }
}

int main() {
    int data[5];
    fill_array(data, 5);
    // data is now {0, 10, 20, 30, 40}
    return 0;
}
```

> **Tip:** Always pass the array size as a separate parameter. There's no way to recover the size inside the function — `sizeof(arr)` will give you the pointer size, not the array size.

## Forward Declaration

If you define functions *after* `main()`, the compiler won't know about them when it encounters the call. Use forward declarations to fix this:

```c
#include <stdio.h>

// Forward declarations
int factorial(int n);
void print_result(int n, int result);

int main() {
    int n = 5;
    int result = factorial(n);
    print_result(n, result);
    return 0;
}

// Definitions come later
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

void print_result(int n, int result) {
    printf("%d! = %d\n", n, result);
}
```

## Practical Example: String Utilities

```c
#include <stdio.h>

// Count characters in a string (reimplementing strlen)
int str_length(const char *s) {
    int len = 0;
    while (s[len] != '\0') {
        len++;
    }
    return len;
}

// Convert string to uppercase in-place
void str_upper(char *s) {
    for (int i = 0; s[i]; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] -= 32;  // ASCII trick
        }
    }
}

int main() {
    char greeting[] = "Hello, World!";
    printf("Length: %d\n", str_length(greeting));
    str_upper(greeting);
    printf("Upper: %s\n", greeting);  // HELLO, WORLD!
    return 0;
}
```

## Summary

| Concept | Key Point |
|---------|-----------|
| Declaration | Tells the compiler about the function signature |
| Definition | Provides the actual implementation |
| Return type | `int`, `double`, `void`, etc. |
| Pass by value | Functions get copies of arguments |
| Array decay | Arrays become pointers when passed |
| Forward declaration | Declare before `main`, define after |
