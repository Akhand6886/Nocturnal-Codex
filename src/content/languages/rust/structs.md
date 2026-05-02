---
title: "Structs"
description: "Named fields, tuple structs, unit structs, and methods (impl)"
---

## What is a Struct?

A **Struct** (short for structure) is a custom data type that lets you package together and name multiple related values that make up a meaningful group.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

## Creating Instances

To use a struct, we create an **instance** of it by specifying values for each field.

```rust
let mut user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

user1.email = String::from("anotheremail@example.com");
```

## Other Types of Structs

Wait! Rust has three ways to define a struct:

1.  **Classic Structs**: (The one above) Named fields.
2.  **Tuple Structs**: Named types, but fields have no names (just types). Useful for "Newtype" patterns.
3.  **Unit-Like Structs**: No fields at all. Useful for traits on types with no data.

```rust
struct Color(i32, i32, i32); // Tuple Struct
struct AlwaysEqual;          // Unit Struct
```

## Implementation Blocks (`impl`)

We can define **Methods** and **Associated Functions** for our structs using the `impl` block.

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // This is a METHOD (takes &self)
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // This is an ASSOCIATED FUNCTION (no self)
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
```

> [!TIP]
> You can have multiple `impl` blocks for the same struct! This is useful for separating different groups of functionality.

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Struct** | `struct Name { ... }`| Defining the blueprint |
| **Instance** | `let x = Name { ... }`| Creating the object |
| **Field** | `x.field_name` | Accessing data |
| **impl** | `impl Name { ... }` | Defining behavior |
| **Self** | `&self` | Reference to the current instance |
| **Tuple Struct**| `struct S(i32);` | Fields identified by index (0, 1) |
| **Unit Struct** | `struct S;` | Zero-sized type |
| **Method** | `fn f(&self)` | Logic that operates on instances |
| **Assoc. Fn** | `fn f()` | Logic that belongs to the type (e.g., constructors) |
| **Ownership** | Structs take ownership of their fields (unless they are references) |
| **Privacy** | Fields are private by default! Use `pub` to make them public. |
| **Derive** | `#[derive(Debug)]` | Auto-generate common functionality |
