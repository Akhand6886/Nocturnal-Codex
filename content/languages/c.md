---
id: "c"
name: "C"
slug: "c"
description: "The foundational systems language that powers operating systems, embedded devices, and performance-critical software."
iconName: "c"
year: 1972
creator: "Dennis Ritchie"
paradigm: ["Procedural", "Imperative"]
useCases: ["Operating Systems", "Embedded Systems", "Compilers", "Drivers"]
website: "https://en.cppreference.com/w/c"
category: "Systems"
featured: false
difficulty: "Advanced"
---

## Overview

C is a general-purpose programming language that has had a profound influence on many other languages. It was originally developed at Bell Labs for the Unix operating system. C provides low-level access to memory, maps efficiently to machine instructions, and requires minimal runtime support, making it ideal for systems programming. Nearly every modern OS kernel is written primarily in C.

## Key Features

- **Low-level memory access** — Pointers and direct memory manipulation
- **Minimal runtime** — No garbage collector, tiny standard library
- **Portable** — Compilers exist for virtually every platform
- **Efficient** — Maps closely to hardware instructions
- **Foundational** — Influenced C++, Java, C#, Go, Rust, and many more

## Common Use Cases

- **Operating Systems** — Linux, Windows, macOS kernels
- **Embedded Systems** — Microcontrollers, firmware, IoT
- **Compilers & Interpreters** — GCC, CPython, Lua
- **Databases** — SQLite, PostgreSQL, MySQL
- **Networking** — Network stacks, protocol implementations

## Code Example

```c
#include <stdio.h>

// Classic C: dynamic array with manual memory management
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));

    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
        printf("%d ", arr[i]);
    }
    printf("\n");

    free(arr);
    return 0;
}
```

## Learning Resources

- [The C Programming Language (K&R)](https://en.wikipedia.org/wiki/The_C_Programming_Language)
- [Learn C](https://www.learn-c.org/)
- [Beej's Guide to C Programming](https://beej.us/guide/bgc/)
