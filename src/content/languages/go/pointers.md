---
title: "Pointers"
description: "Address-of (&), dereference (*), and no pointer arithmetic"
---

## What is a Pointer?

A **Pointer** holds the memory address of a value. In **Go**, pointers are used to share data efficiently (by passing an address instead of a copy) and to allow functions to modify original values.

```go
i := 42
p := &i // p is a pointer to i (contains its memory address)

fmt.Println(*p) // Dereference: read i through the pointer (42)
*p = 21         // Dereference: set i through the pointer
```

## Comparisons: The Two Operators

-   **`&` (Address-Of)**: Gets the pointer to a variable.
-   **`*` (Dereference)**: Accesses the underlying value at a pointer's address.

## No Pointer Arithmetic

Wait! Unlike C, Go does **not** allow pointer arithmetic (you can't do `p++` to move to the next memory address). This is a safety feature that prevents entire classes of memory bugs.

## Pass-by-Value vs. Pass-by-Pointer

By default, Go passes arguments to functions **by value** (it creates a copy). If you want to modify the original variable, you must pass a pointer.

```go
func zero(x int) {
    x = 0 // Only changes the copy!
}

func zeroPtr(x *int) {
    *x = 0 // Changes the original!
}
```

## The `new` Function

You can create a pointer to a zero-valued variable using the built-in **`new`** function.

```go
p := new(int)
fmt.Println(*p) // 0
```

> [!NOTE]
> Go has a smart compiler that performs "Escape Analysis." It decides whether a variable should live on the stack or the heap automatically. You don't have to worry about manual memory management!

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **&** | `&x` | Get the address of x |
| **\*** | `*p` | Get the value at address p |
| **Pointer Type**| `*int` | A variable that can hold an int address |
| **Zero Val** | `nil` | A pointer with no address |
| **new** | `new(T)` | Create a pointer to a zeroed T |
| **Best For** | Modifying state, sharing large data, optional values |
| **Safety** | No pointer arithmetic allowed! |
| **Efficiency**| Prevents copying large structs on every function call |
| **Logic** | Pointers are for sharing; Values are for safety |
| **Heap** | Escaped variables are automatically moved to the heap |
| **Escape A.** | Compiler logic that manages variable location |
| **Standard** | Use pointers for methods that modify data (`*Receiver`) |
| **Constraint**| Slices, Maps, and Channels are ALREADY reference types! |
