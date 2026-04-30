---
title: "Structures"
description: "struct definition, member access, nested structs, typedef"
---

## What Are Structures?

A `struct` groups related variables of different types under a single name. Think of it as a custom data type that bundles data together — like a class without methods.

```c
#include <stdio.h>

struct Point {
    double x;
    double y;
};

int main() {
    struct Point p = {3.0, 4.0};
    printf("Point: (%.1f, %.1f)\n", p.x, p.y);
    return 0;
}
```

## `typedef` for Cleaner Syntax

```c
typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

// Now you can use 'Student' directly instead of 'struct Student'
Student alice = {"Alice", 20, 3.85};
```

## Accessing Members

```c
Student s = {"Bob", 22, 3.5};

// Dot notation for direct access
printf("Name: %s\n", s.name);
s.age = 23;

// Arrow notation for pointer access
Student *ptr = &s;
printf("Age: %d\n", ptr->age);    // Equivalent to (*ptr).age
ptr->gpa = 3.7;
```

## Nested Structures

```c
typedef struct {
    char street[100];
    char city[50];
    int zip;
} Address;

typedef struct {
    char name[50];
    int age;
    Address home;
} Person;

Person p = {
    "Alice",
    25,
    {"123 Main St", "Springfield", 62701}
};

printf("%s lives at %s, %s %d\n", 
       p.name, p.home.street, p.home.city, p.home.zip);
```

## Arrays of Structures

```c
#define MAX_STUDENTS 100

typedef struct {
    char name[50];
    float grade;
} Student;

int main() {
    Student class[MAX_STUDENTS];
    int count = 3;
    
    class[0] = (Student){"Alice", 92.5};
    class[1] = (Student){"Bob", 87.3};
    class[2] = (Student){"Charlie", 95.1};
    
    // Find best student
    int best = 0;
    for (int i = 1; i < count; i++) {
        if (class[i].grade > class[best].grade)
            best = i;
    }
    printf("Top student: %s (%.1f)\n", class[best].name, class[best].grade);
    return 0;
}
```

## Passing Structs to Functions

```c
// By value (copy) — safe but expensive for large structs
void print_student(Student s) {
    printf("%s: %.1f\n", s.name, s.grade);
}

// By pointer (efficient) — use const if read-only
void update_grade(Student *s, float new_grade) {
    s->grade = new_grade;
}

// Usage
Student alice = {"Alice", 85.0};
print_student(alice);
update_grade(&alice, 92.0);
```

## Struct Size and Padding

Compilers add **padding bytes** between members for alignment:

```c
struct Example {
    char a;    // 1 byte
    // 3 bytes padding (to align int to 4-byte boundary)
    int b;     // 4 bytes
    char c;    // 1 byte
    // 3 bytes padding (to align struct size to 4-byte boundary)
};

printf("Size: %zu\n", sizeof(struct Example));  // 12, not 6!
```

> **Tip:** Order struct members from largest to smallest to minimize padding.

## Practical Example: Linked List Node

```c
typedef struct Node {
    int data;
    struct Node *next;  // Must use 'struct Node' (self-reference)
} Node;

Node a = {1, NULL};
Node b = {2, NULL};
Node c = {3, NULL};
a.next = &b;
b.next = &c;

// Traverse
for (Node *p = &a; p != NULL; p = p->next) {
    printf("%d -> ", p->data);
}
printf("NULL\n");  // 1 -> 2 -> 3 -> NULL
```

## Summary

| Concept | Key Point |
|---------|-----------|
| Declaration | `struct Name { members };` |
| `typedef` | Creates a type alias for cleaner code |
| Dot access | `s.member` for direct variables |
| Arrow access | `ptr->member` for pointers |
| Nesting | Structs can contain other structs |
| Padding | Compilers add alignment bytes |
| Self-reference | Must use `struct Name` inside the definition |
