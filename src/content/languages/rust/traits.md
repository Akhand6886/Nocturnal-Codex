---
title: "Traits"
description: "Defining traits, impl, default methods, and trait bounds"
---

## What is a Trait?

A **Trait** defines a shared set of behaviors that different types can implement. It’s Rust’s version of an "Interface" in other languages.

```rust
pub trait Summary {
    fn summarize(&self) -> String;
}
```

## Implementing a Trait

You implement a trait for a specific type using the **`impl Trait for Type`** syntax.

```rust
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
```

## Default Implementations

Wait! You can provide a default behavior for a trait method. Types can either use the default or override it with their own logic.

```rust
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

## Trait Bounds

You can use traits to restrict what types can be passed to a generic function.

```rust
// Only types that implement Summary can be passed!
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

## Multiple Trait Bounds (`+`)

If you need a type to implement more than one trait, you can combine them using the **`+`** operator.

```rust
pub fn notify<T: Summary + Display>(item: &T) { ... }
```

## The `where` Clause

If you have many generic parameters with complex bounds, use the **`where`** clause to keep your code readable.

```rust
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    // ... logic ...
}
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **Trait** | `trait T { ... }` | Defining shared behavior |
| **impl** | `impl T for S` | Giving a type a trait |
| **Bound** | `T: Trait` | Restricting generic types |
| **Default** | `fn f() { ... }` | Base logic that can be overridden |
| **+** | `T: A + B` | Requiring multiple traits |
| **where** | `where T: ...` | Cleaner syntax for complex bounds |
| **Blanket** | `impl<T: A> B for T` | Implementing B for anything that has A |
| **Derive** | `#[derive(Debug)]` | Built-in way to implement common traits |
| **orphan** | Orphan Rule | You can't implement external traits for external types |
| **Polymorph** | Static Dispatch | Compiler optimizes trait calls at compile time |
| **Safety** | Shared interfaces ensure consistent behavior |
| **Standard** | `Display`, `Debug`, `Clone`, `Default`, `Iterator` |
