---
title: "Blocks, Procs & Lambdas"
description: "Understanding Ruby's unique approach to functional programming"
---

## What is a Block?

A **Block** is a chunk of code that you pass to a method. It is the most common feature in **Ruby**. You define blocks using `do...end` (for multi-line) or `{ }` (for single-line).

```ruby
[1, 2, 3].each { |n| puts n }

[1, 2, 3].each do |n|
  puts n
end
```

Wait! A block is **not** an object. To use it in a method, you use the **`yield`** keyword.

```ruby
def my_method
  puts "Start"
  yield if block_given?
  puts "End"
end
```

## Procs: Objects that hold code

A **Proc** (Procedure) is a block that has been saved into an object. This allows you to pass it around, store it in a variable, or use it multiple times.

```ruby
my_proc = Proc.new { |x| puts "Hello #{x}" }
my_proc.call("Alpha")
```

## Lambdas: Stricter Procs

A **Lambda** is almost identical to a Proc, but with two key differences:

1.  **Argument Check**: A Lambda will throw an error if you pass the wrong number of arguments; a Proc will just set missing ones to `nil`.
2.  **Return Behavior**: A `return` inside a Lambda exits the lambda; a `return` inside a Proc tries to exit the **method** that called the Proc (which can be dangerous).

```ruby
my_lambda = ->(x) { x * 2 }
my_lambda.call(5) # 10
```

## Summary

| Feature | Block | Proc | Lambda |
| :--- | :--- | :--- | :--- |
| **Object?** | No | **Yes** | **Yes** |
| **Passable?**| Yes (to one method) | **Yes (as variable)** | **Yes (as variable)** |
| **Args Check**| No | No | **Yes (Strict)** |
| **Return** | Exits block | Exits calling method | **Exits lambda** |
| **Syntax** | `do...end` | `Proc.new { }` | `-> { }` |

> [!TIP]
> Use **Blocks** for 90% of your work. Use **Lambdas** when you need a reusable function that behaves like a real method.

## Summary

| Term | Description |
| :--- | :--- |
| **yield** | Running the block passed to a method |
| **block_given?**| Checking if a block was actually passed |
| **&block** | Converting a block to a Proc in a method signature |
| **call** | Executing a Proc or Lambda |
| **Closure** | All three are closures (they remember their environment) |
| **Best For** | Callbacks, iterators, DSLs, and lazy execution |
| **Logic** | "Encapsulate logic as a value" |
| **Safety** | Lambdas are safer because of strict argument checking |
| **Modern** | Ruby 3.0 supports "Numbered Parameters" (`_1`, `_2`) in blocks |
| **Standard** | Use `{ }` for single lines and `do...end` for multiple lines |
| **Identity** | Blocks are the primary way to implement "Hook" patterns |
