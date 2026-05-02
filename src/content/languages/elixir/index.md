---
id: elixir
name: Elixir
slug: elixir
description: "A dynamic, functional language for building scalable and maintainable applications on the Erlang VM."
iconName: droplet
category: "Functional"
difficulty: "Intermediate"
featured: true
relatedLanguages: ["erlang", "ruby", "javascript"]
---

# Elixir: The Concurrency King

Elixir leverages the **Erlang VM (BEAM)**, known for running low-latency, distributed, and fault-tolerant systems. While it has a Ruby-like syntax, its soul is purely functional and concurrent.

## Why Elixir?

- **Fault Tolerance**: The "Let it crash" philosophy ensures that errors in one process don't take down the entire system.
- **Scalability**: Handle millions of concurrent processes with ease.
- **Hot Code Swapping**: Update your application without stopping the server.

## Core Features

### 1. The Pipe Operator (`|>`)
Cleanly pass the result of one function as the first argument of the next.

```elixir
"elixir is awesome"
|> String.split()
|> Enum.map(&String.capitalize/1)
|> Enum.join(" ")
# => "Elixir Is Awesome"
```

### 2. Pattern Matching
The `=` operator is a match operator, not an assignment.

```elixir
{status, message} = {:ok, "Success"}
# status is :ok, message is "Success"

# This will fail:
{:ok, msg} = {:error, "Fail"} 
```

### 3. Processes & OTP
Lightweight processes isolated from each other.

```elixir
spawn(fn -> 1 + 2 end)
```

## Summary Table

| Feature | Description |
|---------|-------------|
| **Immutability** | Data never changes; functions return new data. |
| **Recursion** | No loops (for/while); use recursion and pattern matching. |
| **Phoenix** | A high-performance web framework for Elixir. |
| **Mix** | The build tool for creating, compiling, and testing projects. |
