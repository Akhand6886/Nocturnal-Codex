---
title: "Enumerable"
description: "Mastering map, select, reduce, and the power of Ruby's list processing"
---

## What is Enumerable?

The **Enumerable** module is arguably the most important part of the **Ruby** standard library. It is a **Mixin** that provides a massive set of search, sort, and traversal methods. If a class implements an `each` method and includes `Enumerable`, it instantly gains all these powers!

## Common Enumerable Methods

| Method | Description |
| :--- | :--- |
| **map** / **collect**| Transforms every element |
| **select** / **filter**| Keeps only elements that match a condition |
| **reject** | Removes elements that match a condition |
| **reduce** / **inject**| Combines all elements into a single value |
| **find** / **detect** | Returns the FIRST element that matches |
| **any?** | Returns true if ANY element matches |
| **all?** | Returns true if ALL elements match |
| **none?** | Returns true if NO elements match |

## Examples

```ruby
numbers = [1, 2, 3, 4, 5]

# Transform
doubled = numbers.map { |n| n * 2 } # [2, 4, 6, 8, 10]

# Filter
evens = numbers.select { |n| n.even? } # [2, 4]

# Calculate Total
total = numbers.reduce(0) { |sum, n| sum + n } # 15
# Shorthand for sum: numbers.sum
```

## Chaining Methods

Wait! Because Enumerable methods return new objects (usually arrays), you can chain them together to perform complex data processing in a single readable line.

```ruby
# Get the capitalized names of all active users
users.select(&:active?).map { |u| u.name.capitalize }
```

> [!NOTE]
> The `&:active?` syntax is a shorthand for `{ |u| u.active? }`. It is extremely popular in professional Ruby code.

## Summary

| Term | Description |
| :--- | :--- |
| **each** | The foundation method required for Enumerable |
| **&:** | Shorthand for calling a method on every item |
| **lazy** | Processing massive collections without loading them all into memory |
| **group_by** | Categorizing elements into a hash |
| **partition** | Splitting a collection into two based on a condition |
| **Best For** | Data processing, filtering, and reporting |
| **Logic** | "Functional programming on collections" |
| **Safety** | Returns `nil` or empty arrays instead of crashing |
| **Modern** | Ruby 2.7+ introduced `filter_map` for efficiency |
| **Standard** | `Array`, `Hash`, `Range`, and `Set` all include Enumerable |
| **Identity** | The "Secret Sauce" that makes Ruby so expressive |
