---
title: "Pattern Matching"
description: "The core mechanic of Elixir programming."
category: "Basics"
order: 2
---

## Everything is a Match

In Elixir, the `=` operator is called the **match operator**. It's used to compare the left and right sides and bind variables if they match.

### Basic Matching

```elixir
x = 1
1 = x # This works because 1 == 1
# 2 = x # This throws a MatchError
```

### Destructuring

You can destructure complex data structures easily.

```elixir
[a, b, c] = [1, 2, 3]
{:ok, result} = {:ok, "Finished"}
```

### The Pin Operator (`^`)

Use the pin operator when you want to match against the *value* of a variable without rebinding it.

```elixir
x = 1
^x = 1 # Matches
# ^x = 2 # MatchError
```
