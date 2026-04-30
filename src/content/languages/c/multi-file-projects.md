---
title: "Multi-file Projects"
description: "Separate compilation, linking, and Makefiles"
---

## Why Multiple Files?

As projects grow, a single source file becomes unmanageable. Splitting code into multiple files enables:
- **Modularity** — each file handles one concern
- **Faster builds** — only recompile changed files
- **Team collaboration** — developers work on separate files

## Project Structure

```
project/
├── main.c          # Entry point
├── math_utils.h    # Header (interface)
├── math_utils.c    # Implementation
├── string_utils.h
├── string_utils.c
└── Makefile
```

## Separate Compilation

```bash
# Compile each file to object code
gcc -c main.c -o main.o
gcc -c math_utils.c -o math_utils.o
gcc -c string_utils.c -o string_utils.o

# Link all object files
gcc main.o math_utils.o string_utils.o -o program
```

## Makefiles

Automate the build process:

```makefile
CC = gcc
CFLAGS = -Wall -Wextra -std=c11
OBJECTS = main.o math_utils.o string_utils.o

program: $(OBJECTS)
	$(CC) $(OBJECTS) -o program

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f *.o program
```

```bash
make          # Build the project
make clean    # Remove build artifacts
```

## The `extern` Keyword

Use `extern` to access a global variable defined in another file:

```c
// config.c
int verbose = 0;

// main.c
extern int verbose;  // Declaration (not definition)
if (verbose) printf("Debug mode\n");
```

## Static Functions and Variables

`static` at file scope limits the symbol to that file — it's invisible to the linker:

```c
// Only accessible within this file
static int internal_counter = 0;
static void helper_function() { ... }
```

## Summary

| Concept | Purpose |
|---------|---------|
| Header files | Share declarations across files |
| Separate compilation | Compile each `.c` independently |
| Linking | Combine `.o` files into one binary |
| `extern` | Access globals from other files |
| `static` (file scope) | Hide symbols from other files |
| Makefile | Automate build process |
