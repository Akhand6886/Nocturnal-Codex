---
title: "Binary Files"
description: "Reading/writing structs, fseek, ftell, rewind"
---

## Binary vs Text Files

Binary files store data in raw bytes — the exact memory representation. They're more compact and faster than text files for structured data.

## Writing Structs to Binary Files

```c
#include <stdio.h>

typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

int main() {
    Student students[] = {
        {"Alice", 20, 3.85f},
        {"Bob", 22, 3.50f},
        {"Charlie", 21, 3.92f}
    };
    int count = 3;
    
    FILE *fp = fopen("students.dat", "wb");
    fwrite(&count, sizeof(int), 1, fp);
    fwrite(students, sizeof(Student), count, fp);
    fclose(fp);
    
    printf("Wrote %d students to binary file\n", count);
    return 0;
}
```

## Reading Structs from Binary Files

```c
int main() {
    FILE *fp = fopen("students.dat", "rb");
    
    int count;
    fread(&count, sizeof(int), 1, fp);
    
    Student students[count];
    fread(students, sizeof(Student), count, fp);
    fclose(fp);
    
    for (int i = 0; i < count; i++) {
        printf("%s (Age: %d, GPA: %.2f)\n",
               students[i].name, students[i].age, students[i].gpa);
    }
    return 0;
}
```

## Random Access with `fseek` and `ftell`

```c
// fseek(fp, offset, origin)
// Origins: SEEK_SET (start), SEEK_CUR (current), SEEK_END (end)

FILE *fp = fopen("students.dat", "rb");

// Skip the count integer
fseek(fp, sizeof(int), SEEK_SET);

// Jump to the 3rd student (index 2)
fseek(fp, 2 * sizeof(Student), SEEK_CUR);

Student s;
fread(&s, sizeof(Student), 1, fp);
printf("Third student: %s\n", s.name);

// Get current position
long pos = ftell(fp);
printf("File position: %ld bytes\n", pos);

// Go back to beginning
rewind(fp);

fclose(fp);
```

## Summary

| Function | Purpose |
|----------|---------|
| `fread` | Read raw bytes |
| `fwrite` | Write raw bytes |
| `fseek` | Move to a position |
| `ftell` | Get current position |
| `rewind` | Jump to start |
