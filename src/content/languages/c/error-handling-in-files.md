---
title: "Error Handling in Files"
description: "errno, perror, ferror, and feof"
---

## Error Handling in C File I/O

C doesn't have exceptions. Instead, functions return error codes and set global variables like `errno` to indicate what went wrong.

## `errno` and `perror`

```c
#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        printf("Error code: %d\n", errno);
        printf("Error message: %s\n", strerror(errno));
        perror("fopen failed");  // Prints: "fopen failed: No such file or directory"
        return 1;
    }
    fclose(fp);
    return 0;
}
```

## `ferror` and `feof`

```c
FILE *fp = fopen("data.txt", "r");
char buffer[100];

while (fgets(buffer, sizeof(buffer), fp)) {
    printf("%s", buffer);
}

if (ferror(fp)) {
    printf("A read error occurred!\n");
} else if (feof(fp)) {
    printf("Reached end of file.\n");
}

clearerr(fp);  // Reset error and EOF indicators
fclose(fp);
```

## Robust File I/O Pattern

```c
#include <stdio.h>
#include <stdlib.h>

char* read_entire_file(const char *path) {
    FILE *fp = fopen(path, "rb");
    if (!fp) { perror(path); return NULL; }
    
    fseek(fp, 0, SEEK_END);
    long size = ftell(fp);
    rewind(fp);
    
    char *content = malloc(size + 1);
    if (!content) { fclose(fp); return NULL; }
    
    size_t read = fread(content, 1, size, fp);
    if (read != (size_t)size) {
        free(content);
        fclose(fp);
        return NULL;
    }
    
    content[size] = '\0';
    fclose(fp);
    return content;
}

int main() {
    char *text = read_entire_file("example.txt");
    if (text) {
        printf("%s\n", text);
        free(text);
    }
    return 0;
}
```

## Summary

| Function | Purpose |
|----------|---------|
| `errno` | Global error code |
| `perror(msg)` | Print error with custom prefix |
| `strerror(errno)` | Get error as string |
| `ferror(fp)` | Check if file stream has error |
| `feof(fp)` | Check if end-of-file reached |
| `clearerr(fp)` | Reset error/EOF flags |
