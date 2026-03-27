---
title: "Storage Classes"
description: "auto, static, extern, register — scope and lifetime"
---

## What Are Storage Classes?

Storage classes control two properties of a variable:
- **Scope** — where the variable is visible
- **Lifetime** — how long the variable exists in memory

## The Four Storage Classes

### `auto` (Default)

Every local variable is implicitly `auto`. It's created when the block is entered and destroyed when the block exits.

```c
void foo() {
    auto int x = 10;  // 'auto' is implicit — nobody writes this
    int y = 20;        // Same thing
}
```

### `static`

`static` gives a local variable **persistent lifetime** — it survives between function calls. At file scope, `static` limits visibility to the current file.

```c
#include <stdio.h>

void counter() {
    static int count = 0;  // Initialized once, persists across calls
    count++;
    printf("Called %d times\n", count);
}

int main() {
    counter();  // Called 1 times
    counter();  // Called 2 times
    counter();  // Called 3 times
    return 0;
}
```

### `extern`

Declares a variable that's defined in another file. No memory is allocated — it just tells the compiler "this exists somewhere."

```c
// file1.c
int shared_value = 42;  // Definition

// file2.c
extern int shared_value;  // Declaration
printf("%d\n", shared_value);  // 42
```

### `register`

Suggests the compiler should store the variable in a CPU register for faster access. Modern compilers ignore this hint and optimize automatically.

```c
register int i;
for (i = 0; i < 1000000; i++) {
    // Compiler may (or may not) use a register
}
```

> **Note:** You cannot take the address (`&`) of a `register` variable.

## Summary

| Class | Scope | Lifetime | Default Value |
|-------|-------|----------|--------------|
| `auto` | Block | Block duration | Garbage |
| `static` (local) | Block | Program duration | 0 |
| `static` (file) | File | Program duration | 0 |
| `extern` | Global | Program duration | Defined elsewhere |
| `register` | Block | Block duration | Garbage |
