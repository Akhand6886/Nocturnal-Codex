---
title: "Enumerations"
description: "Named integer constants with enum"
---

## What Are Enums?

An `enum` (enumeration) defines a set of named integer constants. They make code more readable by replacing magic numbers with meaningful names.

```c
#include <stdio.h>

enum Direction { NORTH, EAST, SOUTH, WEST };

int main() {
    enum Direction heading = NORTH;
    
    printf("Heading: %d\n", heading);  // 0
    
    if (heading == NORTH) {
        printf("Going north!\n");
    }
    return 0;
}
```

By default, values start at 0 and increment by 1: `NORTH=0, EAST=1, SOUTH=2, WEST=3`.

## Custom Values

```c
enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
};

enum Weekday {
    MONDAY = 1,   // Start at 1 instead of 0
    TUESDAY,      // 2 (auto-increments)
    WEDNESDAY,    // 3
    THURSDAY,     // 4
    FRIDAY,       // 5
    SATURDAY,     // 6
    SUNDAY        // 7
};
```

## Using with `typedef`

```c
typedef enum {
    LOG_DEBUG,
    LOG_INFO,
    LOG_WARN,
    LOG_ERROR,
    LOG_FATAL
} LogLevel;

void log_message(LogLevel level, const char *msg) {
    const char *labels[] = {"DEBUG", "INFO", "WARN", "ERROR", "FATAL"};
    printf("[%s] %s\n", labels[level], msg);
}

int main() {
    log_message(LOG_INFO, "Server started");
    log_message(LOG_ERROR, "Connection refused");
    return 0;
}
```

## Enums as Bit Flags

```c
typedef enum {
    PERM_READ    = 1 << 0,  // 1
    PERM_WRITE   = 1 << 1,  // 2
    PERM_EXECUTE = 1 << 2   // 4
} Permission;

int main() {
    int file_perms = PERM_READ | PERM_WRITE;
    
    if (file_perms & PERM_READ)    printf("Can read\n");
    if (file_perms & PERM_WRITE)   printf("Can write\n");
    if (file_perms & PERM_EXECUTE) printf("Can execute\n");
    return 0;
}
```

## Summary

| Feature | Detail |
|---------|--------|
| Default values | Start at 0, auto-increment |
| Custom values | Assign any integer |
| Type safety | Weak — enums are just ints in C |
| Common use | State machines, flags, categories, config |
