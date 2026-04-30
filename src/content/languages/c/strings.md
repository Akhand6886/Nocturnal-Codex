---
title: "Strings"
description: "Character arrays, string.h functions, null termination"
---

## Strings in C

C does not have a built-in string type. Instead, strings are **arrays of characters** terminated by a null character `'\0'`. This null terminator tells functions where the string ends.

```c
#include <stdio.h>

int main() {
    // These are equivalent:
    char greeting[] = "Hello";           // Compiler adds '\0'
    char manual[] = {'H','e','l','l','o','\0'}; // Explicit null

    printf("%s\n", greeting);  // Hello
    printf("Length: %lu\n", strlen(greeting));  // 5 (not counting '\0')
    return 0;
}
```

> **Key:** The string `"Hello"` occupies **6 bytes** — 5 characters plus the null terminator.

## String Literals vs Character Arrays

```c
// Mutable: stored on the stack, can be modified
char mutable[] = "Hello";
mutable[0] = 'J';   // OK: "Jello"

// Immutable: stored in read-only memory
const char *immutable = "Hello";
// immutable[0] = 'J';  // UNDEFINED BEHAVIOR — may crash
```

> **Best Practice:** If you don't need to modify a string, declare it as `const char*`. If you do, use a character array.

## Essential `string.h` Functions

```c
#include <string.h>

char src[] = "Hello";
char dest[20];

strlen(src);             // 5 — length (excluding '\0')
strcpy(dest, src);       // Copies "Hello" into dest
strncpy(dest, src, 20);  // Safe copy with size limit
strcat(dest, " World");  // Appends: "Hello World"
strncat(dest, "!", 2);   // Safe append with size limit
strcmp("abc", "abd");     // -1 (lexicographic comparison)
strncmp("abc", "abd", 2);// 0 (compares first 2 chars only)
strchr(src, 'l');         // Pointer to first 'l'
strstr(src, "llo");       // Pointer to "llo" substring
```

### String Comparison

```c
char a[] = "apple";
char b[] = "banana";

// WRONG: compares ADDRESSES, not content!
if (a == b) { ... }

// CORRECT: compares content character by character
if (strcmp(a, b) == 0) {
    printf("Equal!\n");
} else if (strcmp(a, b) < 0) {
    printf("a comes before b\n");
}
```

> **Critical:** Never use `==` to compare strings in C. It compares pointer addresses, not the actual characters.

## Building Strings

### With `sprintf` / `snprintf`

```c
char buffer[100];
int age = 25;
const char *name = "Alice";

snprintf(buffer, sizeof(buffer), "My name is %s and I am %d.", name, age);
printf("%s\n", buffer);
// Output: My name is Alice and I am 25.
```

### Manual Character Manipulation

```c
void reverse_string(char *str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

char word[] = "Hello";
reverse_string(word);
printf("%s\n", word);  // olleH
```

## String Tokenization

`strtok` splits a string into tokens using delimiters:

```c
#include <stdio.h>
#include <string.h>

int main() {
    char csv[] = "Alice,25,Engineer,NYC";
    
    char *token = strtok(csv, ",");
    while (token != NULL) {
        printf("Field: %s\n", token);
        token = strtok(NULL, ",");  // NULL continues from last position
    }
    return 0;
}
```

> **Warning:** `strtok` modifies the original string (replaces delimiters with `'\0'`). Use `strtok_r` for thread-safe tokenization.

## Common Pitfalls

```c
// 1. Buffer overflow
char small[5];
strcpy(small, "This is way too long");  // Overflow!

// Fix: always use size-limited functions
strncpy(small, "This is way too long", sizeof(small) - 1);
small[sizeof(small) - 1] = '\0';

// 2. Forgetting the null terminator
char bad[5] = {'H', 'e', 'l', 'l', 'o'};  // No '\0'!
printf("%s\n", bad);  // Prints garbage after "Hello"

// 3. Comparing with ==
if (name == "Alice") { }   // WRONG: compares addresses
if (strcmp(name, "Alice") == 0) { }  // CORRECT
```

## Summary

| Function | Purpose | Safe Version |
|----------|---------|-------------|
| `strlen` | Get length | — |
| `strcpy` | Copy string | `strncpy` |
| `strcat` | Concatenate | `strncat` |
| `strcmp` | Compare strings | `strncmp` |
| `strchr` | Find character | — |
| `strstr` | Find substring | — |
| `strtok` | Tokenize | `strtok_r` |
| `sprintf` | Format into string | `snprintf` |
