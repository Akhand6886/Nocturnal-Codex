---
title: "Arrays & Slices"
description: "Fixed-size arrays, dynamic slices, append, copy, and capacity"
---

## Arrays: Fixed-Size Lists

In **Go**, an **Array** is a numbered sequence of elements of a single type with a **fixed length**. Because their length is part of their type, arrays cannot be resized.

```go
var a [5]int // An array of 5 integers, all 0
a[4] = 100

b := [3]string{"Penn", "Teller", "Magic"}
```

## Slices: The Dynamic Reality

Wait! In real-world Go, you will use **Slices** 99% of the time. A Slice is a descriptor for a contiguous segment of an underlying array. It is dynamic and can grow or shrink.

```go
// Creating a slice
s := []int{1, 2, 3}

// Using 'make' to create a slice with length and capacity
s2 := make([]int, 5, 10) // length 5, capacity 10
```

## The `append` Function

You can add new elements to a slice using the built-in **`append`** function. If the underlying array is too small, Go automatically creates a new, larger array and copies the data for you.

```go
s := []int{1, 2}
s = append(s, 3, 4) // s is now [1, 2, 3, 4]
```

## Slice Length vs. Capacity

-   **Length**: The number of elements currently in the slice. (`len(s)`)
-   **Capacity**: The number of elements the underlying array can hold without reallocating. (`cap(s)`)

## Slicing a Slice

You can create a new slice by "slicing" an existing one using the `[low:high]` syntax.

```go
a := [5]int{1, 2, 3, 4, 5}
s := a[1:4] // [2, 3, 4]
```

Wait! Slices are **reference types**. If you modify the data in a slice, you are modifying the original underlying array!

## Summary

| Feature | Array | Slice |
| :--- | :--- | :--- |
| **Size** | Fixed | **Dynamic** |
| **Syntax** | `[5]int` | `[]int` |
| **Memory** | Stack (usually) | **Heap (Reference to array)** |
| **Pass by** | Value (Copy) | **Reference** |
| **append** | No | **Yes** |
| **make** | `make([]int, 5)` | Create with specific len/cap |
| **copy** | `copy(dest, src)` | Efficiently copy elements between slices |
| **Best For** | Fixed hardware buffers | **Almost everything else!** |
| **Zero Val**| `[0, 0, 0]` | `nil` |
| **Logic** | Slices are the backbone of Go's data handling |
| **Safety** | Prevents out-of-bounds access with runtime panics |
| **Modern** | Slices provide Python-like convenience with C-like speed |
| **Constraint**| Slices can ONLY hold elements of the SAME type |
