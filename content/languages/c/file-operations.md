---
title: "File Operations"
description: "fopen, fclose, fread, fwrite, and file modes"
---

## File I/O in C

C provides a powerful file I/O system through `<stdio.h>`. Files are accessed through `FILE*` pointers returned by `fopen`.

## Opening and Closing Files

```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("data.txt", "r");  // Open for reading
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    // ... work with file ...
    
    fclose(fp);  // Always close when done
    return 0;
}
```

## File Modes

| Mode | Meaning | Creates? | Truncates? |
|------|---------|----------|-----------|
| `"r"` | Read only | No | No |
| `"w"` | Write only | Yes | Yes |
| `"a"` | Append | Yes | No |
| `"r+"` | Read + Write | No | No |
| `"w+"` | Read + Write | Yes | Yes |
| `"a+"` | Read + Append | Yes | No |
| `"rb"` | Read binary | No | No |
| `"wb"` | Write binary | Yes | Yes |

## Reading Files

```c
// Character by character
int ch;
while ((ch = fgetc(fp)) != EOF) {
    putchar(ch);
}

// Line by line
char line[256];
while (fgets(line, sizeof(line), fp) != NULL) {
    printf("%s", line);
}

// Binary read
int buffer[100];
size_t count = fread(buffer, sizeof(int), 100, fp);
printf("Read %zu integers\n", count);
```

## Writing Files

```c
FILE *fp = fopen("output.txt", "w");

// Character
fputc('A', fp);

// String
fputs("Hello, World!\n", fp);

// Formatted
fprintf(fp, "Score: %d / %d\n", 85, 100);

// Binary
int data[] = {1, 2, 3, 4, 5};
fwrite(data, sizeof(int), 5, fp);

fclose(fp);
```

## Practical Example: Copy a File

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <src> <dst>\n", argv[0]);
        return 1;
    }
    
    FILE *src = fopen(argv[1], "rb");
    FILE *dst = fopen(argv[2], "wb");
    if (!src || !dst) { perror("Error"); return 1; }
    
    char buffer[4096];
    size_t bytes;
    while ((bytes = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        fwrite(buffer, 1, bytes, dst);
    }
    
    fclose(src);
    fclose(dst);
    printf("File copied successfully!\n");
    return 0;
}
```

## Summary

| Function | Purpose |
|----------|---------|
| `fopen` | Open a file |
| `fclose` | Close a file |
| `fgetc` / `fputc` | Character I/O |
| `fgets` / `fputs` | String I/O |
| `fprintf` / `fscanf` | Formatted I/O |
| `fread` / `fwrite` | Binary I/O |
