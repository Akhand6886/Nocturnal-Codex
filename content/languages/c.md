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
topics:
  - section: "Basics"
    description: "Fundamentals of variables, data types, I/O, and control flow."
    items:
      - title: "Introduction to C"
        description: "History, features, and why C remains essential today"
      - title: "Compilation Process"
        description: "Preprocessing, compiling, assembling, and linking — how source becomes executable"
      - title: "Variables & Data Types"
        description: "int, float, char, double, type modifiers, and sizeof"
      - title: "Input/Output"
        description: "printf, scanf, formatted I/O, and escape sequences"
      - title: "Operators"
        description: "Arithmetic, relational, logical, bitwise, assignment, and ternary operators"
      - title: "Control Flow"
        description: "if/else, switch, for, while, do-while, break, continue, goto"
  - section: "Functions"
    description: "Modular programming with reusable code blocks."
    items:
      - title: "Function Declaration & Definition"
        description: "Prototypes, parameters, return types, and calling conventions"
      - title: "Parameter Passing"
        description: "Pass by value vs. pass by pointer (simulated pass by reference)"
      - title: "Recursion"
        description: "Self-referencing functions, base cases, and stack behavior"
      - title: "Inline Functions"
        description: "Compiler hints for function inlining and performance"
      - title: "Variadic Functions"
        description: "Functions with variable arguments — stdarg.h, va_list, va_arg"
      - title: "The main() Function"
        description: "Entry point, argc/argv, return values, and environment"
  - section: "Compound Data Types"
    description: "Structured data beyond primitives."
    items:
      - title: "Arrays"
        description: "One-dimensional, multi-dimensional arrays, and array decay"
      - title: "Pointers"
        description: "Address-of, dereference, pointer arithmetic, NULL, void pointers"
      - title: "Strings"
        description: "Character arrays, string.h functions, null termination"
      - title: "Structures"
        description: "struct definition, member access, nested structs, typedef"
      - title: "Unions"
        description: "Shared memory, type-punning, and when to use unions"
      - title: "Enumerations"
        description: "Named integer constants with enum"
      - title: "Function Pointers"
        description: "Callbacks, dispatch tables, and polymorphism in C"
  - section: "Memory Management"
    description: "Manual memory control — the core of C's power and danger."
    items:
      - title: "Memory Layout"
        description: "Stack, heap, data segment, BSS, and text segment"
      - title: "Dynamic Allocation"
        description: "malloc, calloc, realloc, free — and when to use each"
      - title: "Memory Leaks"
        description: "Detection, prevention, and tools like Valgrind"
      - title: "Dangling Pointers"
        description: "Use-after-free, double-free, and defensive patterns"
  - section: "File Handling"
    description: "Reading, writing, and manipulating files."
    items:
      - title: "File Operations"
        description: "fopen, fclose, fread, fwrite, and file modes"
      - title: "Formatted File I/O"
        description: "fprintf, fscanf, and text file processing"
      - title: "Binary Files"
        description: "Reading/writing structs, fseek, ftell, rewind"
      - title: "Error Handling in Files"
        description: "errno, perror, ferror, and feof"
  - section: "Preprocessor & Build System"
    description: "Compile-time directives and multi-file projects."
    items:
      - title: "Preprocessor Directives"
        description: "#include, #define, #ifdef, #pragma, and conditional compilation"
      - title: "Macros"
        description: "Object-like vs function-like macros, pitfalls, and best practices"
      - title: "Header Files"
        description: "Include guards, forward declarations, and API design"
      - title: "Multi-file Projects"
        description: "Separate compilation, linking, and Makefiles"
      - title: "Storage Classes"
        description: "auto, static, extern, register — scope and lifetime"
  - section: "Advanced Topics"
    description: "Low-level and systems-level programming techniques."
    items:
      - title: "Bit Manipulation"
        description: "Bitwise operators, bit fields, flag patterns, and masks"
      - title: "System Calls"
        description: "open, read, write, close — POSIX I/O at the kernel boundary"
      - title: "Signals"
        description: "Signal handling with signal() and sigaction()"
      - title: "Socket Programming"
        description: "TCP/UDP client-server communication with Berkeley sockets"
      - title: "Multithreading"
        description: "POSIX threads (pthreads), mutexes, and condition variables"
      - title: "Undefined Behavior"
        description: "Common UB pitfalls and how to write safe, portable C code"
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
#include <stdlib.h>

// Dynamic array with manual memory management
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
