---
title: "Error Handling"
description: "Result, Option, the ? operator, and custom error types"
---

## Unrecoverable Errors with `panic!`

Sometimes your program encounters a situation it simply cannot handle (like an index out of bounds). In these cases, Rust uses the **`panic!`** macro to stop execution immediately and print a failure message.

```rust
fn main() {
    panic!("Crash and burn!");
}
```

## Recoverable Errors with `Result`

For most errors, you don't want to stop the program. Rust uses the **`Result<T, E>`** enum for errors that you expect might happen.

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

```rust
use std::fs::File;

let f = File::open("hello.txt");

let f = match f {
    Ok(file) => file,
    Err(error) => panic!("Problem opening the file: {:?}", error),
};
```

## The `?` Operator (Propagating Errors)

Wait! Writing `match` for every error is exhausting. Rust provides the **`?`** operator as a shortcut. If the result is an `Ok`, the value is returned. If it's an `Err`, the entire function returns early and passes the error to the caller.

```rust
fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?; // Short and sweet!
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

## `Option` for Missing Values

If a value might simply be missing (not necessarily an "error"), use **`Option<T>`**.

```rust
fn find_user(id: i32) -> Option<User> {
    // ... logic ...
}
```

## `unwrap` and `expect`

If you are 100% sure a value is present, you can use `.unwrap()` or `.expect("custom message")` to get the value. If the value is missing, the program will **panic**.

> [!WARNING]
> Use `unwrap` sparingly. It's great for quick prototyping or tests, but in production code, it's safer to handle the error properly with `match` or `?`.

## Summary

| Term | Usage | Description |
| :--- | :--- | :--- |
| **panic!** | Fatal | Stop the program immediately |
| **Result** | Recoverable | `Ok(value)` or `Err(error)` |
| **Option** | Optional | `Some(value)` or `None` |
| **?** | Propagate | Return error to caller automatically |
| **unwrap** | Shortcut | Get value or panic |
| **expect** | Shortcut | Get value or panic with message |
| **match** | Handle | Explicitly deal with every case |
| **Safety** | No "checked exceptions" or "null" pointers |
| **Clean** | Chain methods like `.map()` and `.and_then()` |
| **Custom** | Create your own error types using structs and enums |
| **Thiserror** | Popular crate for creating custom error types |
| **Anyhow** | Popular crate for easy error handling in applications |
| **Standard** | `From` trait allows automatic conversion of errors |
| **Identity** | An error never "forgets" its real cause |
| **Refactor** | Replacing `unwrap` with `?` is a sign of Rust maturity |
