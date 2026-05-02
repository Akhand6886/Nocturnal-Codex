---
title: "Control Flow"
description: "if/else, loop, while, for, and Rust's expression-based nature"
---

## Conditional Branching (`if`)

In **Rust**, `if` expressions allow you to branch your code based on conditions. Unlike some other languages, the condition **must** evaluate to a `bool`.

```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("Condition was true");
    } else {
        println!("Condition was false");
    }
}
```

## `if` is an Expression!

Wait! Because `if` is an expression, you can use it on the right side of a `let` statement to assign a value to a variable based on a condition.

```rust
let condition = true;
let number = if condition { 5 } else { 6 };
```

## Repetition with Loops

Rust has three kinds of loops: `loop`, `while`, and `for`.

### 1. `loop` (Infinite)
The `loop` keyword tells Rust to execute a block of code over and over again forever or until you explicitly tell it to stop using `break`.

```rust
let mut count = 0;
loop {
    count += 1;
    if count == 10 {
        break; // STOP!
    }
}
```

### 2. `while` (Conditional)
A `while` loop runs as long as a condition is true.

```rust
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}
```

### 3. `for` (Collection)
The `for` loop is the most common loop in Rust. It's used to iterate through a collection (like an array).

```rust
let a = [10, 20, 30, 40, 50];

for element in a {
    println!("the value is: {}", element);
}

// Looping through a range!
for number in (1..4).rev() {
    println!("{}!", number);
}
```

## Summary

| Loop | Syntax | Best Use Case... |
| :--- | :--- | :--- |
| **loop** | `loop { ... }` | Infinite tasks or returning values |
| **while** | `while x { ... }` | Running until a condition changes |
| **for** | `for x in coll` | Iterating through collections (Safest!) |
| **Range** | `(1..10)` | Counting (1 to 9) |
| **break** | `break value;` | Stop loop and return a value |
| **continue** | `continue;` | Skip to the next iteration |
| **Labels** | `'outer: loop` | Breaking out of nested loops |
| **Logic** | `&&` (AND), `||` (OR), `!` (NOT) |
| **Safety** | `for` loops prevent index out-of-bounds errors |
| **Modern** | Iterators power most complex looping logic in Rust |
| **Condition** | Must be a `bool` (No "truthy" or "falsy" values!) |
| **Assignment**| `let x = if c { a } else { b };` |
