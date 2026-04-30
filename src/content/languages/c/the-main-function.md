---
title: "The main() Function"
description: "Entry point, argc/argv, return values, and environment"
---

## The Entry Point

Every C program begins execution at `main()`. It's the function the operating system calls when your program starts. There are two valid signatures:

```c
int main(void) {
    // No command-line arguments
    return 0;
}

int main(int argc, char *argv[]) {
    // Accepts command-line arguments
    return 0;
}
```

## Return Values

The return value of `main` communicates the program's exit status to the operating system:

```c
return 0;    // Success (EXIT_SUCCESS)
return 1;    // Failure (convention, not standard)
```

```c
#include <stdlib.h>

int main() {
    return EXIT_SUCCESS;  // Portable: defined as 0
    // or
    return EXIT_FAILURE;  // Portable: defined as non-zero
}
```

You can check the exit code in the shell:

```bash
./my_program
echo $?    # Prints the exit code (0 = success)
```

## Command-Line Arguments

`argc` and `argv` give your program access to command-line arguments:

- **`argc`** — argument count (always ≥ 1)
- **`argv`** — argument vector (array of strings)

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("Program name: %s\n", argv[0]);
    printf("Argument count: %d\n", argc);
    
    for (int i = 1; i < argc; i++) {
        printf("  arg[%d] = %s\n", i, argv[i]);
    }
    
    return 0;
}
```

```bash
$ ./greet Alice Bob
Program name: ./greet
Argument count: 3
  arg[1] = Alice
  arg[2] = Bob
```

### Practical Example: File Processor

```c
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <filename> [--verbose]\n", argv[0]);
        return 1;
    }
    
    const char *filename = argv[1];
    int verbose = 0;
    
    for (int i = 2; i < argc; i++) {
        if (strcmp(argv[i], "--verbose") == 0 || strcmp(argv[i], "-v") == 0) {
            verbose = 1;
        }
    }
    
    if (verbose) printf("Opening: %s\n", filename);
    
    FILE *f = fopen(filename, "r");
    if (!f) {
        perror("Error");
        return 1;
    }
    
    // Process file...
    fclose(f);
    return 0;
}
```

## Environment Variables

A third (non-standard but widely supported) form of `main` gives access to environment variables:

```c
int main(int argc, char *argv[], char *envp[]) {
    for (int i = 0; envp[i] != NULL; i++) {
        printf("%s\n", envp[i]);
    }
    return 0;
}
```

The portable way is to use `getenv()`:

```c
#include <stdlib.h>
#include <stdio.h>

int main() {
    const char *home = getenv("HOME");
    const char *path = getenv("PATH");
    
    printf("Home: %s\n", home ? home : "not set");
    printf("Path: %s\n", path ? path : "not set");
    return 0;
}
```

## Summary

| Aspect | Detail |
|--------|--------|
| Signature | `int main(void)` or `int main(int argc, char *argv[])` |
| `argv[0]` | Always the program name |
| Return `0` | Success |
| Return non-zero | Failure |
| Use `getenv()` | For environment variables |
