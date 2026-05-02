---
title: "Slices"
description: "String slices (&str), array slices, and fat pointers"
---

## What is a Slice?

A **Slice** is a reference to a contiguous sequence of elements in a collection, rather than the whole collection. It is a **"view"** into the data. Because slices are references, they do not have ownership.

## String Slices (`&str`)

A string slice is a reference to a part of a `String`.

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];
```

Wait! String literals (`let s = "hi";`) are actually slices themselves! Their type is **`&str`**.

## Other Slices

You can also create slices for arrays and vectors.

```rust
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3]; // [2, 3]
```

## Fat Pointers

Under the hood, a slice is a **"Fat Pointer"**. This means it is a piece of data that contains two things:
1.  A **pointer** to the starting element.
2.  The **length** of the slice.

This is why slices are so fast—they don't copy any data; they just point to existing data!

## Slices as Parameters

It's a best practice to take `&str` instead of `&String` in your functions. This allows your function to work with both `String` objects and string literals!

```rust
// RECOMMENDED
fn first_word(s: &str) -> &str { ... }

// AVOID
// fn first_word(s: &String) -> &String { ... }
```

> [!NOTE]
> The range syntax `[start..end]` is inclusive of the start but exclusive of the end. `[0..5]` takes indices 0, 1, 2, 3, and 4.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Slice** | `&coll[r]` | A non-owning reference to a range |
| **&str** | String Slice | The most common string type in Rust |
| **Range** | `[0..5]` | Start (inclusive) to End (exclusive) |
| **Full Range** | `[..]` | Entire collection |
| **Fat Pointer** | Pointer + Len | How slices are stored in memory |
| **Safety** | Prevents accessing out-of-bounds indices |
| **Zero-Copy** | Slices never copy the underlying data |
| **Literal** | `"hi"` is a `&'static str` |
| **Vec** | `&vec[..]` converts a Vector to a slice |
| **Array** | `&arr[..]` converts an Array to a slice |
| **Logic** | Slices allow you to treat parts of data as first-class objects |
| **Constraint**| Slices must point to valid UTF-8 if they are `&str` |
