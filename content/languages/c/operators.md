---
title: "Operators"
description: "Arithmetic, relational, logical, bitwise, assignment, and ternary operators"
---

## What Are Operators?

Operators are symbols that tell the compiler to perform specific mathematical, relational, or logical operations. C has one of the richest sets of operators among programming languages, giving you fine-grained control over data manipulation.

## Arithmetic Operators

The basic math operators work on numeric types:

```c
#include <stdio.h>

int main() {
    int a = 17, b = 5;

    printf("a + b = %d\n", a + b);   // Addition:       22
    printf("a - b = %d\n", a - b);   // Subtraction:    12
    printf("a * b = %d\n", a * b);   // Multiplication: 85
    printf("a / b = %d\n", a / b);   // Division:       3 (truncated!)
    printf("a %% b = %d\n", a % b);  // Modulus:        2 (remainder)

    return 0;
}
```

> **Critical Pitfall:** Integer division in C always **truncates** toward zero. `17 / 5` gives `3`, not `3.4`. If you need decimal results, cast one operand to `double`:
> ```c
> double result = (double)a / b;  // 3.400000
> ```

### Increment and Decrement

```c
int x = 5;

// Prefix: increment THEN use
printf("%d\n", ++x);  // Prints 6, x is now 6

// Postfix: use THEN increment
printf("%d\n", x++);  // Prints 6, x is now 7
printf("%d\n", x);    // Prints 7
```

> **Warning:** Never use increment/decrement twice on the same variable in one expression (e.g., `i++ + ++i`). This is **undefined behavior** in C.

## Relational Operators

These compare two values and return `1` (true) or `0` (false):

```c
int a = 10, b = 20;

printf("%d\n", a == b);   // Equal to:                0
printf("%d\n", a != b);   // Not equal to:            1
printf("%d\n", a > b);    // Greater than:             0
printf("%d\n", a < b);    // Less than:                1
printf("%d\n", a >= 10);  // Greater than or equal:    1
printf("%d\n", a <= 5);   // Less than or equal:       0
```

> **Common Bug:** Using `=` (assignment) instead of `==` (comparison) inside conditions:
> ```c
> if (x = 5) { ... }   // BUG: assigns 5 to x, always true
> if (x == 5) { ... }  // CORRECT: compares x with 5
> ```

## Logical Operators

Logical operators combine boolean expressions:

```c
int age = 25;
int has_license = 1;

// AND: both must be true
if (age >= 18 && has_license) {
    printf("You can drive\n");
}

// OR: at least one must be true
if (age < 13 || age > 65) {
    printf("Discounted ticket\n");
}

// NOT: inverts truth value
if (!has_license) {
    printf("Get a license first!\n");
}
```

### Short-Circuit Evaluation

C evaluates logical expressions left to right and **stops early** when the result is already determined:

```c
// If ptr is NULL, the second condition is NEVER evaluated
// This prevents a null pointer dereference crash
if (ptr != NULL && ptr->value > 10) {
    printf("Value is large\n");
}
```

## Bitwise Operators

These operate on individual bits — essential for systems programming, embedded development, and performance-critical code.

| Operator | Name | Example |
|----------|------|---------|
| `&` | AND | `0b1100 & 0b1010 = 0b1000` |
| `\|` | OR | `0b1100 \| 0b1010 = 0b1110` |
| `^` | XOR | `0b1100 ^ 0b1010 = 0b0110` |
| `~` | NOT | `~0b1100 = 0b0011` (inverted) |
| `<<` | Left shift | `0b0001 << 3 = 0b1000` |
| `>>` | Right shift | `0b1000 >> 2 = 0b0010` |

```c
#include <stdio.h>

int main() {
    unsigned char a = 0b11001010;  // 202
    unsigned char b = 0b10101100;  // 172

    printf("a & b  = %d\n", a & b);   // AND:  136 (0b10001000)
    printf("a | b  = %d\n", a | b);   // OR:   238 (0b11101110)
    printf("a ^ b  = %d\n", a ^ b);   // XOR:  102 (0b01100110)
    printf("~a     = %d\n", (unsigned char)~a); // NOT: 53
    printf("a << 2 = %d\n", a << 2);  // Left shift:  808
    printf("a >> 3 = %d\n", a >> 3);  // Right shift: 25

    return 0;
}
```

### Practical Use: Setting and Checking Flags

```c
#define READ_PERM    (1 << 0)   // 0b001 = 1
#define WRITE_PERM   (1 << 1)   // 0b010 = 2
#define EXEC_PERM    (1 << 2)   // 0b100 = 4

int permissions = 0;

// Set permissions
permissions |= READ_PERM;
permissions |= WRITE_PERM;

// Check a permission
if (permissions & EXEC_PERM) {
    printf("Can execute\n");
} else {
    printf("No execute permission\n");
}

// Remove a permission
permissions &= ~WRITE_PERM;
```

## Assignment Operators

C provides compound assignment operators for concise code:

```c
int x = 10;

x += 5;    // x = x + 5   → 15
x -= 3;    // x = x - 3   → 12
x *= 2;    // x = x * 2   → 24
x /= 4;    // x = x / 4   → 6
x %= 4;    // x = x % 4   → 2
x <<= 3;   // x = x << 3  → 16
x &= 0xF;  // x = x & 15  → 0
```

## The Ternary Operator

The ternary operator `? :` is a compact inline `if-else`:

```c
int age = 20;
const char *status = (age >= 18) ? "adult" : "minor";
printf("You are a %s\n", status);

// Equivalent to:
// if (age >= 18) status = "adult";
// else status = "minor";

// Can be nested (but don't overdo it)
int score = 85;
char grade = (score >= 90) ? 'A' :
             (score >= 80) ? 'B' :
             (score >= 70) ? 'C' : 'F';
```

## The Comma Operator

The comma operator evaluates both expressions but returns the value of the **right** one:

```c
int a = (5, 10);    // a = 10
int b = (printf("Hello "), printf("World\n"));  // Prints both, b = 6
```

It's most commonly seen in `for` loops with multiple variables:

```c
for (int i = 0, j = 10; i < j; i++, j--) {
    printf("i=%d, j=%d\n", i, j);
}
```

## The `sizeof` Operator

While technically an operator (not a function), `sizeof` returns the byte size of a type or expression:

```c
printf("%zu\n", sizeof(int));      // 4
printf("%zu\n", sizeof(double));   // 8
printf("%zu\n", sizeof('A'));      // 4 (char literals are int in C!)
```

## Operator Precedence (Simplified)

From **highest** to **lowest** priority:

| Priority | Operators | Associativity |
|----------|-----------|---------------|
| 1 | `()` `[]` `->` `.` | Left to right |
| 2 | `!` `~` `++` `--` `(type)` `*` `&` `sizeof` | Right to left |
| 3 | `*` `/` `%` | Left to right |
| 4 | `+` `-` | Left to right |
| 5 | `<<` `>>` | Left to right |
| 6 | `<` `<=` `>` `>=` | Left to right |
| 7 | `==` `!=` | Left to right |
| 8 | `&` `^` `\|` | Left to right |
| 9 | `&&` `\|\|` | Left to right |
| 10 | `?:` | Right to left |
| 11 | `=` `+=` `-=` etc. | Right to left |

> **Tip:** When in doubt, use parentheses! `(a + b) * c` is always clearer than relying on precedence rules.

## Summary

C's operators give you power at every level — from simple arithmetic to direct bit manipulation. Master the precedence table, watch out for integer division and assignment-vs-comparison bugs, and you'll write cleaner, safer code.
