---
title: "Variadic Functions"
description: "Functions with variable arguments — stdarg.h, va_list, va_arg"
---

## What Are Variadic Functions?

Variadic functions accept a **variable number of arguments**. You already use one every day — `printf`:

```c
printf("Hello");              // 1 argument
printf("%d + %d = %d", 1, 2, 3);  // 4 arguments
```

The `<stdarg.h>` header provides the tools to write your own variadic functions.

## The `stdarg.h` API

| Macro | Purpose |
|-------|---------|
| `va_list` | Type to hold variadic argument state |
| `va_start(ap, last_fixed)` | Initialize the list after the last fixed parameter |
| `va_arg(ap, type)` | Retrieve the next argument of the given type |
| `va_end(ap)` | Clean up |

## Basic Example: Sum of Integers

```c
#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);  // Start after 'count'
    
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    
    va_end(args);
    return total;
}

int main() {
    printf("Sum: %d\n", sum(3, 10, 20, 30));    // 60
    printf("Sum: %d\n", sum(5, 1, 2, 3, 4, 5)); // 15
    return 0;
}
```

> **Critical:** There is no way to know the number or types of variadic arguments automatically. You must communicate this through a fixed parameter (like `count`) or a format string (like `printf` does).

## Building a Custom Logger

```c
#include <stdio.h>
#include <stdarg.h>
#include <time.h>

void log_message(const char *level, const char *fmt, ...) {
    // Print timestamp
    time_t now = time(NULL);
    struct tm *t = localtime(&now);
    printf("[%02d:%02d:%02d] [%s] ", 
           t->tm_hour, t->tm_min, t->tm_sec, level);
    
    // Forward variadic args to vprintf
    va_list args;
    va_start(args, fmt);
    vprintf(fmt, args);
    va_end(args);
    
    printf("\n");
}

int main() {
    log_message("INFO", "Server started on port %d", 8080);
    log_message("WARN", "Memory usage at %d%%", 85);
    log_message("ERROR", "Failed to open %s: %s", "config.json", "Not found");
    return 0;
}
```

> **Tip:** Use `vprintf`, `vfprintf`, and `vsprintf` to forward variadic arguments to standard I/O functions. These accept a `va_list` instead of `...`.

## Common Pitfalls

### Wrong Type in `va_arg`

```c
// If caller passes an int but you read a double:
double val = va_arg(args, double);  // UNDEFINED BEHAVIOR!
```

### Forgetting `va_end`

Always call `va_end` before the function returns. Skipping it can cause memory leaks or crashes on some platforms.

### Integer Promotion

Small types (`char`, `short`) are automatically promoted to `int` when passed as variadic arguments. `float` is promoted to `double`.

```c
// When the caller does: my_func('A', 3.14f)
// You must read:
int ch = va_arg(args, int);        // NOT char
double d = va_arg(args, double);   // NOT float
```

## Sentinel-Terminated Variadic Functions

Instead of a count parameter, some functions use a **sentinel value** (like `NULL` or `-1`) to mark the end:

```c
#include <stdio.h>
#include <stdarg.h>

void print_strings(const char *first, ...) {
    va_list args;
    va_start(args, first);
    
    const char *s = first;
    while (s != NULL) {
        printf("%s ", s);
        s = va_arg(args, const char *);
    }
    
    va_end(args);
    printf("\n");
}

int main() {
    print_strings("Hello", "Beautiful", "World", NULL);
    return 0;
}
```

## Summary

| Concept | Detail |
|---------|--------|
| Include | `#include <stdarg.h>` |
| Declare | At least one fixed param before `...` |
| Initialize | `va_start(args, last_fixed_param)` |
| Read | `va_arg(args, type)` |
| Cleanup | `va_end(args)` |
| Forward | Use `vprintf` / `vfprintf` |
| Promotion | `char` → `int`, `float` → `double` |
