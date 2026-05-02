---
title: "Data Types"
description: "Scalars, compound types, tuples, arrays, and type annotations"
---

## Strong Statically Typed

**Rust** is a **statically typed** language, which means it must know the types of all variables at compile time. However, the compiler can usually **infer** the type based on the value you provide.

```rust
let x: i32 = 42; // Explicit type annotation
let y = 3.14;    // Inferred as f64
```

## 1. Scalar Types

A scalar type represents a single value. Rust has four primary scalar types:

| Category | Types | Examples |
| :--- | :--- | :--- |
| **Integers** | `i8`, `u32`, `i128`, `isize` | `signed` (+/-) or `unsigned` (+) |
| **Floats** | `f32`, `f64` | Default is `f64` |
| **Boolean** | `bool` | `true` or `false` |
| **Character**| `char` | 4-byte Unicode (e.g., `'a'`, `'🚀'`) |

```rust
let heart_eyed_cat = '😻';
```

## 2. Compound Types

Compound types can group multiple values into one type. Rust has two primitive compound types:

### Tuples
Tuples have a fixed length and can contain multiple **different** types.

```rust
let tup: (i32, f64, u8) = (500, 6.4, 1);

// Destructuring a tuple!
let (x, y, z) = tup;

// Accessing by index!
let first = tup.0;
```

### Arrays
Arrays have a fixed length and must contain the **same** type. They are stored on the **stack**.

```rust
let a = [1, 2, 3, 4, 5];
let b: [i32; 3] = [10, 20, 30]; // [Type; Length]

// Accessing by index!
let second = a[1];
```

Wait! If you want a list that can grow or shrink in size, you should use a **`Vec` (Vector)** instead of an array.

## Type Aliases

You can create a new name for an existing type using the `type` keyword. This is useful for making complex types more readable.

```rust
type Kilometers = i32;
let distance: Kilometers = 5;
```

## Summary

| Type | Syntax | Description |
| :--- | :--- | :--- |
| **i32** | `let x: i32 = 5;` | 32-bit signed integer (Default) |
| **f64** | `let y = 2.0;` | 64-bit float (Default) |
| **bool** | `let b = true;` | Boolean logic |
| **char** | `let c = 'z';` | Unicode character |
| **Tuple** | `(1, "hi")` | Fixed-size list of mixed types |
| **Array** | `[1, 2, 3]` | Fixed-size list of same types |
| **isize/usize**| `usize` | Pointer-sized integers (usually for indexing) |
| **Overflow** | `u8` (0-255). 256 becomes 0 in release! (Check your math!) |
| **Literals** | `1_000` (Use underscores for readability!) |
| **Stack** | Scalar types and arrays live on the stack |
| **Unicode** | `char` is NOT just ASCII—it's any Unicode scalar value |
| **Empty** | `()` is the "Unit Type"—it's a tuple with zero elements |
