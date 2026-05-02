---
title: "Pattern Matching"
description: "match, if let, while let, destructuring, and exhaustive checking"
---

## The `match` Expression

The **`match`** expression is one of Rust’s most powerful control flow tools. It allows you to compare a value against a series of patterns and then execute code based on which pattern matches.

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

Wait! Unlike `switch` in other languages, `match` in Rust is **exhaustive**. You must handle every possible case, or the code won't compile!

## Matching with Data

You can use `match` to "unpack" the data stored inside enum variants.

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
```

## The `_` Placeholder

If you don't want to list every possible value, you can use the **`_`** pattern to catch all remaining cases.

```rust
let some_u8_value = 0u8;
match some_u8_value {
    1 => println!("one"),
    3 => println!("three"),
    _ => (), // Do nothing for everything else
}
```

## `if let` Syntax

If you only care about **one** specific pattern and want to ignore everything else, `if let` is a more concise way to write your logic.

```rust
let config_max = Some(3u8);

// Instead of a match with two arms...
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
}
```

## `while let` Syntax

Similarly, `while let` allows you to run a loop as long as a pattern continues to match.

```rust
let mut stack = Vec::new();
stack.push(1);
stack.push(2);

while let Some(top) = stack.pop() {
    println!("{}", top);
}
```

## Summary

| Term | Syntax | Description |
| :--- | :--- | :--- |
| **match** | `match x { ... }` | Branching based on patterns |
| **Arm** | `Pattern => Code,` | One choice in a match expression |
| **Exhaustive**| Required! | Every possibility MUST be handled |
| **if let** | `if let P = x {}` | Concise match for one case |
| **while let** | `while let P = x {}`| Loop as long as pattern matches |
| **_** | Placeholder | Match "anything else" |
| **|** | OR operator | Match multiple patterns (`1 | 2 => ...`) |
| **..=** | Range | Match a range of values (`1..=5 => ...`) |
| **@** | Bindings | Test a value AND save it to a variable |
| **Destructure**| `Point { x, y }` | Unpacking structs or tuples in a match |
| **Logic** | Patterns are the primary way to interact with Enums |
| **Safety** | Compiler ensures you never forget a case! |
