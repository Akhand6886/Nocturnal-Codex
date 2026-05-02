---
title: "Control Flow"
description: "if, unless, case, and the 'Ruby way' of looping"
---

## Conditional Logic (`if`)

**Ruby**'s `if` statement is clean and straightforward.

```ruby
if age >= 18
  puts "Adult"
else
  puts "Minor"
end
```

## The `unless` Statement

Wait! Ruby has a special keyword for the negative case: **`unless`**. It means "if not."

```ruby
unless is_logged_in
  puts "Please log in."
end
```

## Statement Modifiers

You can write `if` and `unless` at the **end** of a line for very concise, English-like code.

```ruby
puts "Success!" if count > 0
```

## The `case` Statement

The `case` statement is Ruby's version of a switch. It is very flexible and uses the "Triple Equals" (`===`) operator under the hood.

```ruby
case score
when 90..100
  "A"
when 80...90
  "B"
else
  "F"
end
```

## Iteration vs. Looping

While Ruby has `while` and `until` loops, Rubyists almost never use them. Instead, we use **Iterators** (Methods that take blocks).

```ruby
# The "Ruby Way" to repeat something
5.times do |i|
  puts "Step #{i}"
end
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / elsif** | Standard branching |
| **unless** | Branching if a condition is FALSE |
| **case** | Multi-way branch |
| **times** | Repeating code N times |
| **each** | Iterating through a collection |
| **Modifier** | `code if condition` (Post-fix syntax) |
| **Logic** | Favor iterators over manual `while` loops |
| **Safety** | Ruby uses "Truthy" (Everything is true except `false` and `nil`) |
| **Modern** | Case statements can match against classes and regex |
| **Standard** | Indent with 2 spaces in Ruby |
| **Identity** | Control flow returns the value of the last executed line |
