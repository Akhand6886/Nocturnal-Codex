---
title: "Bit Manipulation"
description: "Bitwise operators, bit fields, flag patterns, and masks"
---

## Why Bit Manipulation?

Bit manipulation operates directly on individual bits in data. It's essential for systems programming, embedded development, cryptography, graphics, and performance-critical code.

## Core Operations

```c
unsigned char a = 0b11001010;  // 202
unsigned char b = 0b10101100;  // 172

a & b   // AND:  0b10001000 (128) — bits set in BOTH
a | b   // OR:   0b11101110 (238) — bits set in EITHER
a ^ b   // XOR:  0b01100110 (102) — bits set in ONE but not both
~a      // NOT:  0b00110101 (53)  — all bits flipped
a << 2  // Left shift by 2
a >> 3  // Right shift by 3
```

## Common Patterns

### Setting a Bit

```c
#define SET_BIT(x, n)   ((x) | (1 << (n)))
int flags = 0;
flags = SET_BIT(flags, 3);  // Set bit 3
```

### Clearing a Bit

```c
#define CLEAR_BIT(x, n) ((x) & ~(1 << (n)))
flags = CLEAR_BIT(flags, 3);
```

### Toggling a Bit

```c
#define TOGGLE_BIT(x, n) ((x) ^ (1 << (n)))
flags = TOGGLE_BIT(flags, 3);
```

### Checking a Bit

```c
#define CHECK_BIT(x, n) ((x) & (1 << (n)))
if (CHECK_BIT(flags, 3)) {
    printf("Bit 3 is set\n");
}
```

## Practical Example: Permissions

```c
typedef enum {
    PERM_READ    = 1 << 0,  // 001
    PERM_WRITE   = 1 << 1,  // 010
    PERM_EXECUTE = 1 << 2   // 100
} Permission;

void check_perms(int perms) {
    if (perms & PERM_READ)    printf("Read ");
    if (perms & PERM_WRITE)   printf("Write ");
    if (perms & PERM_EXECUTE) printf("Execute ");
    printf("\n");
}

int main() {
    int file_perms = PERM_READ | PERM_EXECUTE;  // 101
    check_perms(file_perms);  // Read Execute
    return 0;
}
```

## Bit Fields in Structs

Pack multiple values into a single integer:

```c
struct PackedFlags {
    unsigned int is_active  : 1;  // 1 bit
    unsigned int priority   : 3;  // 3 bits (0-7)
    unsigned int mode       : 2;  // 2 bits (0-3)
    unsigned int reserved   : 26; // Remaining bits
};

struct PackedFlags f = {1, 5, 2, 0};
printf("Active: %d, Priority: %d\n", f.is_active, f.priority);
```

## Useful Tricks

```c
// Check if n is a power of 2
int is_power_of_2 = (n > 0) && ((n & (n - 1)) == 0);

// Swap without temp variable
a ^= b; b ^= a; a ^= b;

// Count set bits (Kernighan's algorithm)
int count = 0;
while (n) { n &= (n - 1); count++; }
```

## Summary

| Operation | Macro | Expression |
|-----------|-------|-----------|
| Set bit n | `SET_BIT(x, n)` | `x \| (1 << n)` |
| Clear bit n | `CLEAR_BIT(x, n)` | `x & ~(1 << n)` |
| Toggle bit n | `TOGGLE_BIT(x, n)` | `x ^ (1 << n)` |
| Check bit n | `CHECK_BIT(x, n)` | `x & (1 << n)` |
