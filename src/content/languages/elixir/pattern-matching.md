---
title: "Pattern Matching"
description: "The most powerful way to extract data and control flow in Elixir"
---

## Not just Assignment

In most languages, `=` is the assignment operator. In Elixir, it is the **Match Operator**. It compares the left side with the right side; if they match, it binds values. If not, it raises a MatchError.

```elixir
x = 1 // Matches and binds 1 to x
1 = x // Matches (since x is 1)
2 = x // MatchError!
```

## 1. Matching Structures

You can use pattern matching to extract data from complex structures like Lists, Tuples, and Maps.

### Matching Tuples
```elixir
{:ok, result} = {:ok, "Success!"}
# result is now "Success!"

{:error, message} = {:ok, "Oops"} # MatchError!
```

### Matching Lists
```elixir
[head | tail] = [1, 2, 3]
# head is 1
# tail is [2, 3]
```

### Matching Maps
```elixir
%{"name" => name} = %{"name" => "Alice", "age" => 25}
# name is "Alice"
```

## 2. In Function Heads

This is where Elixir's elegance truly shines. You can define multiple versions of the same function that run based on the input pattern.

```elixir
defmodule Greeter do
  def hello(%{name: name, admin: true}), do: "Hello Admin #{name}!"
  def hello(%{name: name}), do: "Hello #{name}!"
  def hello(_), do: "Hello stranger!"
end
```

## 3. Case and With Statements

- `case`: Allows you to match against multiple patterns in one block.
- `with`: Allows you to chain multiple pattern matches together. If any match fails, it exits early.

```elixir
case File.read("config.json") do
  {:ok, content} -> process(content)
  {:error, :enoent} -> "File not found"
  _ -> "Unknown error"
end
```

## 4. Pin Operator (`^`)

Use the pin operator if you want to match against the *value* of an existing variable, rather than re-binding it.

```elixir
x = 1
[^x, 2] = [1, 2] # Matches
[^x, 2] = [3, 2] # MatchError!
```

## Summary Checklist
- [x] `=` is for matching, not just assignment.
- [x] Use pattern matching for data extraction (destructuring).
- [x] Define multiple function heads for cleaner logic.
- [x] Use `case` and `with` for complex control flows.
- [x] Use the `_` (underscore) for values you want to ignore.
- [x] Use the pin operator `^` to match against existing values.
---
