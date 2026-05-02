---
title: "Methods"
description: "Defining methods, implicit returns, and bang/predicate naming"
---

## Defining Methods

In **Ruby**, methods are defined using the **`def`** keyword.

```ruby
def add(a, b)
  a + b
end
```

## Implicit Returns

Wait! Notice there is no `return` keyword in the example above. In Ruby, a method **automatically returns the value of the last line** that was executed. You only use the `return` keyword if you need to exit early.

## Method Naming Conventions

Ruby has some of the best naming conventions in the world. The last character of a method name tells you what it does:

-   **`?` (Predicate)**: Returns a boolean. (`is_empty?`, `valid?`)
-   **`!` (Bang)**: Warning! This method modifies the object in place or might throw an error. (`sort!`, `save!`)

```ruby
if user.active?
  user.save!
end
```

## Default Arguments

You can provide default values for parameters, making them optional.

```ruby
def greet(name, prefix = "Hello")
  puts "#{prefix}, #{name}!"
end
```

## Keyword Arguments

Ruby supports named arguments, which make method calls much more readable.

```ruby
def create_user(name:, age:)
  # ...
end

create_user(name: "Alpha", age: 25)
```

## Summary

| Term | Description |
| :--- | :--- |
| **def** | Keyword to declare a method |
| **return** | Only used for early exits |
| **it** | N/A (Ruby uses `yield` or blocks) |
| **?** | Convention for boolean methods |
| **!** | Convention for "dangerous" or in-place methods |
| **Best For** | Encapsulating behavior and creating "DRY" code |
| **Logic** | Methods should be small and do one thing |
| **Safety** | Implicit return prevents accidentally returning `nil` |
| **Modern** | Ruby 3.0 supports "Leading Arguments" and "Argument Forwarding" |
| **Standard** | Use `snake_case` for all method names |
| **Identity** | Methods are not "First Class" objects (use `Procs` for that) |
| **Yield** | `yield` allows a method to "pause" and run a block of code |
