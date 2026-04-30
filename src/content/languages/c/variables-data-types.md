---
title: "Variables & Data Types"
description: "int, float, char, double, type modifiers, and sizeof"
---

## What Are Variables?

A variable is a named storage location in memory that holds a value. In C, every variable must be **declared with a type** before it can be used. The type tells the compiler how much memory to allocate and how to interpret the bits stored there.

```c
int age = 25;          // 4 bytes, stores an integer
float temperature = 36.6f; // 4 bytes, stores a decimal
char grade = 'A';      // 1 byte, stores a character
```

> **Important:** C is a statically-typed language. Once you declare a variable as `int`, it stays an `int` forever. There is no runtime type flexibility like Python or JavaScript.

## Fundamental Data Types

### Integer Types

| Type | Size (typical) | Range |
|------|---------------|-------|
| `char` | 1 byte | -128 to 127 |
| `short` | 2 bytes | -32,768 to 32,767 |
| `int` | 4 bytes | -2,147,483,648 to 2,147,483,647 |
| `long` | 4 or 8 bytes | Platform-dependent |
| `long long` | 8 bytes | ±9.2 × 10¹⁸ |

```c
#include <stdio.h>

int main() {
    char c = 'Z';           // Character (internally an integer)
    short s = 32000;         // Small integer
    int i = 2000000000;      // Standard integer
    long l = 9000000000L;    // Large integer
    long long ll = 9223372036854775807LL; // Very large integer

    printf("char: %c (%d bytes)\n", c, (int)sizeof(c));
    printf("short: %d (%d bytes)\n", s, (int)sizeof(s));
    printf("int: %d (%d bytes)\n", i, (int)sizeof(i));
    printf("long: %ld (%d bytes)\n", l, (int)sizeof(l));
    printf("long long: %lld (%d bytes)\n", ll, (int)sizeof(ll));

    return 0;
}
```

### Floating-Point Types

| Type | Size | Precision |
|------|------|-----------|
| `float` | 4 bytes | ~7 decimal digits |
| `double` | 8 bytes | ~15 decimal digits |
| `long double` | 12–16 bytes | ~18–33 decimal digits |

```c
float pi_approx = 3.14159f;    // 'f' suffix for float literals
double pi = 3.141592653589793;  // Default decimal literal type
long double pi_precise = 3.14159265358979323846L; // 'L' suffix

printf("float:       %.7f\n", pi_approx);
printf("double:      %.15f\n", pi);
printf("long double: %.20Lf\n", pi_precise);
```

> **Pitfall:** Never compare floating-point numbers with `==`. Due to precision limits, `0.1 + 0.2` does not equal `0.3` exactly. Use a tolerance threshold instead.

```c
// BAD
if (a == 0.3) { ... }

// GOOD
if (fabs(a - 0.3) < 0.00001) { ... }
```

### The `char` Type

`char` is technically an integer type that stores ASCII values. This duality is fundamental to understanding C strings.

```c
char letter = 'A';     // Stores 65 (ASCII value of 'A')
char newline = '\n';   // Escape sequence: newline character
char null = '\0';      // Null character (string terminator)

// Characters ARE numbers
printf("%c = %d\n", letter, letter);  // Output: A = 65
printf("%c\n", letter + 1);          // Output: B
```

## Type Modifiers

### `signed` vs `unsigned`

By default, integer types are `signed` (can hold negative values). The `unsigned` modifier shifts the range to non-negative values only, effectively doubling the positive range.

```c
signed int temperature = -10;      // Range: -2B to +2B
unsigned int population = 4000000000U; // Range: 0 to ~4.3B

// unsigned char is commonly used for raw byte data
unsigned char pixel = 255;  // Range: 0 to 255
```

### `const` — Immutable Variables

```c
const double PI = 3.14159265358979;
const int MAX_USERS = 1000;

// PI = 3.14;  // ERROR: assignment of read-only variable
```

## The `sizeof` Operator

`sizeof` returns the size of a type or variable in bytes. It's evaluated at **compile time**, not runtime.

```c
#include <stdio.h>

int main() {
    printf("char:      %zu bytes\n", sizeof(char));
    printf("int:       %zu bytes\n", sizeof(int));
    printf("float:     %zu bytes\n", sizeof(float));
    printf("double:    %zu bytes\n", sizeof(double));
    printf("pointer:   %zu bytes\n", sizeof(int*));
    
    int arr[10];
    printf("array:     %zu bytes\n", sizeof(arr));       // 40 bytes
    printf("elements:  %zu\n", sizeof(arr)/sizeof(arr[0])); // 10

    return 0;
}
```

> **Tip:** Always use `sizeof` instead of hardcoding sizes. Sizes can differ between platforms (32-bit vs 64-bit), so `sizeof(int)` is more portable than writing `4`.

## Type Conversion

### Implicit (Automatic) Conversion

C automatically converts types in expressions following a promotion hierarchy: `char` → `short` → `int` → `long` → `float` → `double`.

```c
int a = 5;
double b = 2.5;
double result = a + b;  // 'a' is promoted to double → 7.5

int x = 3.99;  // Truncated to 3 (no rounding!)
```

### Explicit Casting

```c
int a = 7, b = 2;

// Without cast: integer division
printf("%d\n", a / b);           // Output: 3

// With cast: floating-point division
printf("%.2f\n", (double)a / b); // Output: 3.50
```

## Fixed-Width Integer Types (C99+)

For portable code, use the exact-width types from `<stdint.h>`:

```c
#include <stdint.h>

int8_t   tiny   = -128;        // Exactly 8 bits, signed
uint8_t  byte   = 255;         // Exactly 8 bits, unsigned
int32_t  number = 2000000000;  // Exactly 32 bits, signed
uint64_t huge   = 18446744073709551615ULL; // 64 bits, unsigned
```

These guarantee exact sizes across all platforms — critical for network protocols, file formats, and embedded systems.

## Boolean Type (C99+)

C99 introduced `<stdbool.h>` for boolean values:

```c
#include <stdbool.h>

bool is_valid = true;
bool is_empty = false;

if (is_valid) {
    printf("Data is valid\n");
}
```

> **Note:** Before C99, C had no boolean type. Programmers used `int` with `0` for false and non-zero for true. This convention still appears in legacy code.

## Summary

| Concept | Key Point |
|---------|-----------|
| Declaration | Every variable needs a type: `int x = 5;` |
| Integer types | `char` < `short` < `int` < `long` < `long long` |
| Float types | `float` (7 digits) < `double` (15 digits) |
| `unsigned` | Doubles positive range, no negatives |
| `sizeof` | Returns size in bytes at compile time |
| Casting | `(double)x` forces type conversion |
| Fixed-width | Use `<stdint.h>` for portable exact sizes |
