---
title: "Formatted File I/O"
description: "fprintf, fscanf, and text file processing"
---

## Formatted File I/O

`fprintf` and `fscanf` work exactly like `printf` and `scanf` but operate on files instead of the console.

## Writing Formatted Data

```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("students.csv", "w");
    if (!fp) { perror("Error"); return 1; }
    
    fprintf(fp, "Name,Age,GPA\n");
    fprintf(fp, "Alice,%d,%.2f\n", 20, 3.85);
    fprintf(fp, "Bob,%d,%.2f\n", 22, 3.50);
    fprintf(fp, "Charlie,%d,%.2f\n", 21, 3.92);
    
    fclose(fp);
    printf("Data written to students.csv\n");
    return 0;
}
```

## Reading Formatted Data

```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("students.csv", "r");
    if (!fp) { perror("Error"); return 1; }
    
    char name[50];
    int age;
    float gpa;
    char header[100];
    
    fgets(header, sizeof(header), fp);  // Skip header line
    
    while (fscanf(fp, "%[^,],%d,%f\n", name, &age, &gpa) == 3) {
        printf("Student: %s, Age: %d, GPA: %.2f\n", name, age, gpa);
    }
    
    fclose(fp);
    return 0;
}
```

## Line-by-Line Processing

```c
#include <stdio.h>
#include <string.h>

int main() {
    FILE *fp = fopen("log.txt", "r");
    if (!fp) { perror("Error"); return 1; }
    
    char line[1024];
    int line_num = 0;
    
    while (fgets(line, sizeof(line), fp)) {
        line_num++;
        if (strstr(line, "ERROR")) {
            printf("Line %d: %s", line_num, line);
        }
    }
    
    fclose(fp);
    return 0;
}
```

## Summary

| Function | Direction | Format |
|----------|-----------|--------|
| `fprintf` | Write to file | `fprintf(fp, "%d", val)` |
| `fscanf` | Read from file | `fscanf(fp, "%d", &val)` |
| `fgets` | Read a line | `fgets(buf, size, fp)` |
| `fputs` | Write a line | `fputs(str, fp)` |
