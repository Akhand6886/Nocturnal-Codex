---
title: "Advanced Pointer Arithmetic"
description: "Mastering the memory layout and the arithmetic of addresses."
category: "Advanced"
order: 10
---

## Beyond the Basics

In C, pointers are just addresses, but the compiler uses the type information to determine the "step size" of arithmetic operations.

### Pointer Math

When you add 1 to a pointer, you are actually adding `1 * sizeof(Type)`.

```c
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;

printf("%d\n", *(p + 2)); // Prints 30
```

### Pointer Casting & Punning

C allows you to treat memory as different types using casts. This is powerful but dangerous.

```c
float f = 3.14f;
unsigned int *ui = (unsigned int *)&f;
printf("Hex representation: %08x\n", *ui);
```

### Void Pointers

`void *` is a generic pointer type. It can point to any data but cannot be dereferenced without a cast.

### Summary Table

| Operation | Result |
|-----------|--------|
| `p + n`   | Move `n` elements forward. |
| `p - q`   | The number of elements between pointers. |
| `*p++`    | Dereference, then increment the pointer. |
| `(*p)++`  | Dereference, then increment the value. |
