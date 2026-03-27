---
title: "Undefined Behavior"
description: "Common UB pitfalls and how to write safe, portable C code"
---

## What Is Undefined Behavior?

Undefined Behavior (UB) means the C standard imposes **no requirements** on what happens. The program might crash, produce wrong results, appear to work, or summon nasal demons. The compiler is free to do *anything*.

> **The Scary Part:** UB doesn't always crash. It might work perfectly on your machine, pass all tests, then fail catastrophically in production on a different platform.

## The Most Common UB Sources

### 1. Buffer Overflow

```c
int arr[5] = {1, 2, 3, 4, 5};
arr[5] = 99;      // UB: out-of-bounds write
int x = arr[10];   // UB: out-of-bounds read
```

### 2. Null Pointer Dereference

```c
int *p = NULL;
*p = 42;  // UB: crash (segfault on most platforms)
```

### 3. Use After Free

```c
int *p = malloc(sizeof(int));
free(p);
*p = 10;  // UB: dangling pointer
```

### 4. Signed Integer Overflow

```c
int x = INT_MAX;
x = x + 1;  // UB! (unsigned overflow wraps, signed is UB)
```

### 5. Uninitialized Variables

```c
int x;
printf("%d\n", x);  // UB: x has an indeterminate value
```

### 6. Double Modification

```c
int i = 5;
i = i++ + ++i;  // UB: modifying i multiple times between sequence points
```

### 7. Wrong `printf` Format

```c
int x = 42;
printf("%s\n", x);  // UB: %s expects char*, got int
```

## How to Defend Against UB

### 1. Compiler Warnings

```bash
gcc -Wall -Wextra -Werror -Wpedantic program.c
```

### 2. Sanitizers

```bash
# Address Sanitizer (buffer overflows, use-after-free)
gcc -fsanitize=address -g program.c

# Undefined Behavior Sanitizer
gcc -fsanitize=undefined -g program.c

# Both
gcc -fsanitize=address,undefined -g program.c
```

### 3. Static Analysis

```bash
# Cppcheck
cppcheck --enable=all program.c

# Clang's analyzer
scan-build gcc program.c
```

### 4. Defensive Coding

```c
// Always check pointers
if (ptr != NULL) { *ptr = value; }

// Always check array bounds
if (index >= 0 && index < size) { arr[index] = value; }

// Always check malloc
int *p = malloc(size);
if (p == NULL) { handle_error(); }

// Use size-limited functions
strncpy(dest, src, sizeof(dest) - 1);
snprintf(buf, sizeof(buf), "%s", str);
```

## Summary

| UB Type | Example | Prevention |
|---------|---------|-----------|
| Buffer overflow | `arr[100]` on size-10 array | Bounds checking |
| Null dereference | `*NULL` | NULL checks |
| Use-after-free | Accessing freed memory | NULL after free |
| Signed overflow | `INT_MAX + 1` | Check before arithmetic |
| Uninitialized | Reading garbage | Always initialize |
| Format mismatch | `printf("%s", 42)` | `-Wall` warnings |

The golden rule: if the standard says it's undefined, **assume the worst**. Compile with warnings and sanitizers. Test on multiple compilers.
