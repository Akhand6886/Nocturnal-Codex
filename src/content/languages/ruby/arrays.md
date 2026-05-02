---
title: "Arrays"
description: "Ordered collections, push/pop, and negative indexing"
---

## Creating Arrays

An **Array** in **Ruby** is an ordered list of elements. They can contain any mix of types, but usually they store items of the same type.

```ruby
fruits = ["Apple", "Banana", "Cherry"]
```

## Negative Indexing

Wait! Ruby has a cool feature: **Negative Indexing**. `-1` refers to the last item, `-2` to the second to last, and so on.

```ruby
puts fruits[-1] # "Cherry"
```

## Array Manipulation

| Method | Action | Description |
| :--- | :--- | :--- |
| **push** / **<<** | Add | Append item to the end |
| **pop** | Remove | Remove the last item |
| **shift** | Remove | Remove the first item |
| **unshift** | Add | Append item to the front |
| **sort** | Logic | Returns a new sorted array |
| **uniq** | Filter | Returns an array with no duplicates |

## Combined Arrays

You can add or subtract arrays just like numbers!

```ruby
[1, 2] + [3, 4] # [1, 2, 3, 4]
[1, 2, 3] - [2]  # [1, 3]
```

## Helpful Shorthand (`%w`)

If you want an array of strings, you don't need all the quotes and commas. Use the **`%w`** shorthand.

```ruby
words = %w[apple banana cherry] # Same as ["apple", "banana", "cherry"]
```

## Summary

| Term | Description |
| :--- | :--- |
| **[]** | Bracket notation for access |
| **<<** | The "Shovel" operator for appending |
| **length** | Number of items in the array |
| **empty?** | Check if array is empty |
| **include?** | Check if value exists in array |
| **Best For** | Ordered lists, stacks, and queues |
| **Logic** | Dynamic and grows as needed |
| **Safety** | Returns `nil` if you access an index that doesn't exist |
| **Modern** | Arrays in Ruby 3.x are highly optimized for speed |
| **Standard** | Use `each` to iterate, not a `for` loop |
| **Identity** | Arrays are objects of the `Array` class |
