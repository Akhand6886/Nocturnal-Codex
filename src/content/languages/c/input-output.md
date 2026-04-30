---
title: "Input/Output"
description: "printf, scanf, formatted I/O, and escape sequences"
---

## Standard I/O in C

Input and output in C revolve around the `<stdio.h>` library. Unlike higher-level languages with simple `print()` functions, C gives you precise control over how data is formatted and displayed.

## Output with `printf`

`printf` (print formatted) writes formatted output to the standard output stream (`stdout`).

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    printf("The answer is %d\n", 42);
    return 0;
}
```

### Format Specifiers

Format specifiers tell `printf` how to interpret and display each argument:

| Specifier | Type | Example Output |
|-----------|------|---------------|
| `%d` or `%i` | `int` | `42` |
| `%u` | `unsigned int` | `42` |
| `%f` | `float` / `double` | `3.140000` |
| `%e` | Scientific notation | `3.140000e+00` |
| `%c` | `char` | `A` |
| `%s` | String (`char*`) | `Hello` |
| `%p` | Pointer address | `0x7ffeabc` |
| `%x` | Hexadecimal | `2a` |
| `%o` | Octal | `52` |
| `%ld` | `long` | `9000000000` |
| `%lld` | `long long` | `9223372036854775807` |
| `%zu` | `size_t` | `8` |
| `%%` | Literal `%` | `%` |

### Formatting Width and Precision

You can control the width, alignment, and precision of output:

```c
int num = 42;
double pi = 3.14159265;

// Width: right-aligned in 10-character field
printf("[%10d]\n", num);       // [        42]

// Left-aligned with '-' flag
printf("[%-10d]\n", num);      // [42        ]

// Zero-padded
printf("[%010d]\n", num);      // [0000000042]

// Floating-point precision
printf("%.2f\n", pi);          // 3.14
printf("%.5f\n", pi);          // 3.14159
printf("%10.3f\n", pi);        //      3.142
```

### Escape Sequences

| Sequence | Meaning |
|----------|---------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |
| `\'` | Single quote |
| `\0` | Null character |
| `\r` | Carriage return |
| `\a` | Alert (beep) |

```c
printf("Name:\tJohn\nAge:\t25\n");
printf("She said \"Hello!\"\n");
printf("Path: C:\\Users\\john\n");
```

## Input with `scanf`

`scanf` (scan formatted) reads formatted input from the standard input stream (`stdin`). It requires **pointers** to the variables where data should be stored.

```c
#include <stdio.h>

int main() {
    int age;
    float height;
    char name[50];

    printf("Enter your name: ");
    scanf("%s", name);           // No '&' for arrays!

    printf("Enter your age: ");
    scanf("%d", &age);           // '&' gives the address of 'age'

    printf("Enter your height: ");
    scanf("%f", &height);

    printf("Hello %s! You are %d years old and %.1f cm tall.\n",
           name, age, height);

    return 0;
}
```

> **Critical Warning:** `scanf("%s", name)` stops reading at the first whitespace. For full-line input, use `fgets()` instead.

### Reading Full Lines with `fgets`

```c
#include <stdio.h>
#include <string.h>

int main() {
    char sentence[100];

    printf("Enter a sentence: ");
    fgets(sentence, sizeof(sentence), stdin);

    // Remove trailing newline that fgets captures
    sentence[strcspn(sentence, "\n")] = '\0';

    printf("You said: \"%s\"\n", sentence);
    return 0;
}
```

> **Best Practice:** Prefer `fgets` over `scanf` for string input. `scanf("%s")` is vulnerable to buffer overflow attacks and cannot read spaces.

## Character I/O

For single characters, use `getchar()` and `putchar()`:

```c
#include <stdio.h>

int main() {
    printf("Press any key: ");
    int ch = getchar();  // Returns int (to handle EOF)
    
    printf("You pressed: ");
    putchar(ch);
    putchar('\n');
    
    return 0;
}
```

## The `puts` and `gets` Functions

```c
// puts: prints a string followed by a newline
puts("Hello, World!");  // Equivalent to printf("Hello, World!\n");

// gets: NEVER USE THIS — it's removed from C11
// char buf[10];
// gets(buf);  // No bounds checking = buffer overflow!
```

> **Warning:** `gets()` was removed from the C11 standard because it cannot prevent buffer overflows. Always use `fgets()` instead.

## `sprintf` and `sscanf` — String Formatting

These work like `printf` and `scanf` but operate on strings instead of the console:

```c
#include <stdio.h>

int main() {
    char buffer[100];
    int day = 27, month = 3, year = 2026;

    // Format into a string
    sprintf(buffer, "%02d/%02d/%04d", day, month, year);
    printf("Date: %s\n", buffer);  // Date: 27/03/2026

    // Parse from a string
    char date[] = "15/08/1947";
    int d, m, y;
    sscanf(date, "%d/%d/%d", &d, &m, &y);
    printf("Day: %d, Month: %d, Year: %d\n", d, m, y);

    return 0;
}
```

> **Tip:** For safety, use `snprintf` instead of `sprintf` to prevent buffer overflows:
> ```c
> snprintf(buffer, sizeof(buffer), "Hello %s", name);
> ```

## Practical Example: Mini Calculator

```c
#include <stdio.h>

int main() {
    double a, b;
    char op;

    printf("Enter expression (e.g., 5 + 3): ");
    scanf("%lf %c %lf", &a, &op, &b);

    switch (op) {
        case '+': printf("= %.2f\n", a + b); break;
        case '-': printf("= %.2f\n", a - b); break;
        case '*': printf("= %.2f\n", a * b); break;
        case '/':
            if (b != 0)
                printf("= %.2f\n", a / b);
            else
                printf("Error: Division by zero!\n");
            break;
        default:
            printf("Unknown operator '%c'\n", op);
    }

    return 0;
}
```

## Summary

| Function | Purpose | Safe? |
|----------|---------|-------|
| `printf` | Formatted output to console | ✅ |
| `scanf` | Formatted input from console | ⚠️ Use with care |
| `fgets` | Read full line from input | ✅ Recommended |
| `puts` | Print string + newline | ✅ |
| `getchar` / `putchar` | Single character I/O | ✅ |
| `sprintf` / `snprintf` | Format into a string | Use `snprintf` |
| `sscanf` | Parse from a string | ✅ |
