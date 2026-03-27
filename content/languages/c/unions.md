---
title: "Unions"
description: "Shared memory, type-punning, and when to use unions"
---

## What Are Unions?

A `union` is like a `struct`, but all members **share the same memory**. The size of a union equals the size of its largest member. Only one member can hold a valid value at a time.

```c
#include <stdio.h>

union Data {
    int i;
    float f;
    char c;
};

int main() {
    union Data d;
    
    d.i = 42;
    printf("Integer: %d\n", d.i);   // 42
    
    d.f = 3.14f;
    printf("Float: %.2f\n", d.f);   // 3.14
    printf("Integer: %d\n", d.i);   // Garbage! Overwritten by float
    
    printf("Size: %zu bytes\n", sizeof(d)); // 4 (size of largest member)
    return 0;
}
```

> **Key Difference:** In a `struct`, each member has its own memory. In a `union`, all members overlap. Writing to one member clobbers the others.

## Tagged Unions (Discriminated Unions)

The most common pattern: combine a union with an enum tag to track which member is active:

```c
#include <stdio.h>

typedef enum { INT_VAL, FLOAT_VAL, STRING_VAL } ValueType;

typedef struct {
    ValueType type;
    union {
        int i;
        float f;
        char s[32];
    } data;
} Value;

void print_value(Value v) {
    switch (v.type) {
        case INT_VAL:    printf("int: %d\n", v.data.i); break;
        case FLOAT_VAL:  printf("float: %.2f\n", v.data.f); break;
        case STRING_VAL: printf("string: %s\n", v.data.s); break;
    }
}

int main() {
    Value v1 = {INT_VAL, .data.i = 42};
    Value v2 = {FLOAT_VAL, .data.f = 3.14f};
    Value v3 = {STRING_VAL};
    strcpy(v3.data.s, "Hello");
    
    print_value(v1);
    print_value(v2);
    print_value(v3);
    return 0;
}
```

This pattern is the C equivalent of a "variant" or "sum type" and is used extensively in interpreters, parsers, and protocol handlers.

## When to Use Unions

- **Memory efficiency** — when you need to store different types in the same slot
- **Type-punning** — interpreting the same bytes as different types
- **Protocol parsing** — network packets with variant payloads
- **Interpreter values** — a single `Value` type that can be int, float, or string

## Summary

| Concept | Key Point |
|---------|-----------|
| Memory | All members share the same bytes |
| Size | Equals the largest member |
| Active member | Only one holds valid data at a time |
| Tagged union | Combine with enum to track active type |
| Use cases | Variants, parsers, memory-efficient storage |
