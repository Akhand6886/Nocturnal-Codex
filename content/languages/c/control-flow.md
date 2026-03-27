---
title: "Control Flow"
description: "if/else, switch, for, while, do-while, break, continue, goto"
---

## What Is Control Flow?

By default, C executes statements sequentially — top to bottom, line by line. **Control flow** statements let you break out of this linear execution: make decisions, repeat blocks, and jump to different parts of your code.

## Conditional Statements

### `if` / `else if` / `else`

The most fundamental decision-making construct:

```c
#include <stdio.h>

int main() {
    int temperature = 35;

    if (temperature > 30) {
        printf("It's hot outside! 🔥\n");
    } else if (temperature > 20) {
        printf("Nice weather! ☀️\n");
    } else if (temperature > 10) {
        printf("A bit chilly. 🧥\n");
    } else {
        printf("It's freezing! ❄️\n");
    }

    return 0;
}
```

### Single-line `if` (No Braces)

You can omit braces for single-statement bodies, but this is a common source of bugs:

```c
// Works, but dangerous
if (x > 0)
    printf("Positive\n");

// BUG: the second line ALWAYS executes (it's not part of the if)
if (x > 0)
    printf("Positive\n");
    printf("This always prints!\n");  // Not inside the if!
```

> **Best Practice:** Always use braces `{}`, even for single-line bodies. It prevents accidental bugs when you add more statements later.

### Nested Conditions

```c
int age = 25;
int has_id = 1;

if (age >= 18) {
    if (has_id) {
        printf("Entry allowed\n");
    } else {
        printf("Please bring your ID\n");
    }
} else {
    printf("You must be 18 or older\n");
}
```

## The `switch` Statement

`switch` is ideal when comparing a single variable against multiple constant values:

```c
#include <stdio.h>

int main() {
    char grade = 'B';

    switch (grade) {
        case 'A':
            printf("Excellent! 🌟\n");
            break;
        case 'B':
            printf("Good job! 👍\n");
            break;
        case 'C':
            printf("Average. Keep trying.\n");
            break;
        case 'D':
        case 'F':
            printf("Needs improvement. 📚\n");
            break;
        default:
            printf("Invalid grade.\n");
            break;
    }

    return 0;
}
```

> **Critical:** Forgetting `break` causes **fall-through** — execution continues into the next case. This is sometimes intentional (like grouping `D` and `F` above), but usually it's a bug.

### `switch` Limitations

- Only works with **integer types** (`int`, `char`, `enum`)
- Case labels must be **compile-time constants** (no variables or ranges)
- Cannot match strings directly (use `if/else` with `strcmp` instead)

## Loops

### `for` Loop

The workhorse loop when you know how many iterations you need:

```c
// Basic counting
for (int i = 0; i < 10; i++) {
    printf("%d ", i);
}
// Output: 0 1 2 3 4 5 6 7 8 9

// Counting backwards
for (int i = 10; i > 0; i--) {
    printf("%d ", i);
}
// Output: 10 9 8 7 6 5 4 3 2 1

// Custom step
for (int i = 0; i <= 100; i += 10) {
    printf("%d ", i);
}
// Output: 0 10 20 30 40 50 60 70 80 90 100
```

### Nested `for` Loops

```c
// Multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        printf("%4d", i * j);
    }
    printf("\n");
}
```

Output:

```
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

### `while` Loop

Use `while` when the number of iterations isn't known in advance:

```c
#include <stdio.h>

int main() {
    int number;

    printf("Enter a positive number (0 to quit): ");
    scanf("%d", &number);

    while (number != 0) {
        printf("You entered: %d\n", number);
        printf("Enter another (0 to quit): ");
        scanf("%d", &number);
    }

    printf("Goodbye!\n");
    return 0;
}
```

### `do-while` Loop

Guarantees the body executes **at least once** before checking the condition:

```c
#include <stdio.h>

int main() {
    int guess;
    int secret = 42;

    do {
        printf("Guess the number: ");
        scanf("%d", &guess);
        
        if (guess < secret) printf("Too low!\n");
        else if (guess > secret) printf("Too high!\n");
    } while (guess != secret);

    printf("Correct! 🎉\n");
    return 0;
}
```

> **When to use `do-while`:** Input validation (menus, prompts), where you need user input before you can check a condition.

## Loop Control Statements

### `break` — Exit the Loop

```c
// Find the first multiple of 7 greater than 50
for (int i = 51; ; i++) {   // Infinite loop
    if (i % 7 == 0) {
        printf("Found it: %d\n", i);  // 56
        break;  // Exit the loop
    }
}
```

### `continue` — Skip to Next Iteration

```c
// Print only odd numbers from 1 to 20
for (int i = 1; i <= 20; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    printf("%d ", i);
}
// Output: 1 3 5 7 9 11 13 15 17 19
```

### Infinite Loops

Sometimes you intentionally want an infinite loop:

```c
// Common patterns for infinite loops
while (1) { ... }
for (;;) { ... }

// Example: event loop
while (1) {
    char command[100];
    printf("> ");
    fgets(command, sizeof(command), stdin);
    
    if (strncmp(command, "quit", 4) == 0) {
        break;  // Clean exit
    }
    
    process_command(command);
}
```

## The `goto` Statement

`goto` performs an unconditional jump to a labeled statement. While generally discouraged, it has one legitimate use case in C: **error handling with cleanup**.

```c
#include <stdio.h>
#include <stdlib.h>

int process_file(const char *filename) {
    FILE *f = fopen(filename, "r");
    if (!f) goto error_open;

    char *buffer = malloc(1024);
    if (!buffer) goto error_alloc;

    // ... process file ...

    free(buffer);
    fclose(f);
    return 0;

error_alloc:
    fclose(f);
error_open:
    fprintf(stderr, "Error processing %s\n", filename);
    return -1;
}
```

> **Rule of thumb:** Use `goto` only for **forward jumps** in error cleanup code. Never jump backwards (that creates spaghetti code). In most cases, structured alternatives like early `return` or helper functions are better.

## Practical Example: Menu System

```c
#include <stdio.h>

int main() {
    int choice;

    do {
        printf("\n=== Main Menu ===\n");
        printf("1. New Game\n");
        printf("2. Load Game\n");
        printf("3. Settings\n");
        printf("4. Exit\n");
        printf("Choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Starting new game...\n");
                break;
            case 2:
                printf("Loading saved game...\n");
                break;
            case 3:
                printf("Opening settings...\n");
                break;
            case 4:
                printf("Goodbye! 👋\n");
                break;
            default:
                printf("Invalid choice. Try again.\n");
        }
    } while (choice != 4);

    return 0;
}
```

## Summary

| Construct | Best For |
|-----------|----------|
| `if/else` | General branching |
| `switch` | Matching one variable against many constants |
| `for` | Known iteration count |
| `while` | Unknown iteration count, condition-first |
| `do-while` | Must execute at least once (input validation) |
| `break` | Exit a loop early |
| `continue` | Skip the current iteration |
| `goto` | Error cleanup (use sparingly) |
