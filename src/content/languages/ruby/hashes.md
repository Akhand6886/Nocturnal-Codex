---
title: "Hashes"
description: "Key-value pairs, symbols as keys, and default values"
---

## What is a Hash?

A **Hash** (also called a Dictionary or Map) is a collection of unique keys and their values. In **Ruby**, we almost always use **Symbols** as keys for better performance.

```ruby
# Old "Rocket" Syntax
user = { :name => "Alpha", :age => 25 }

# Modern Syntax (Preferred)
user = { name: "Alpha", age: 25 }
```

## Accessing Values

You use bracket notation to get a value by its key.

```ruby
puts user[:name] # "Alpha"
```

Wait! If you ask for a key that doesn't exist, Ruby returns **`nil`** by default (it doesn't crash).

## Setting a Default Value

You can create a hash that returns a specific value instead of `nil` when a key is missing.

```ruby
scores = Hash.new(0) # Default value is 0
puts scores[:missing] # 0
```

## Common Hash Methods

| Method | Description |
| :--- | :--- |
| **keys** | Returns an array of all keys |
| **values** | Returns an array of all values |
| **has_key?** | Check if a key exists |
| **merge** | Combine two hashes into a new one |
| **dig** | Safely access nested values (`h.dig(:a, :b)`) |

## Summary

| Term | Description |
| :--- | :--- |
| **=>** | The "Hash Rocket" operator |
| **{ }** | Syntax for creating a hash |
| **Symbol** | Preferred key type (`:key`) |
| **dig** | Deep navigation of nested hashes |
| **fetch** | Get value or raise error if missing |
| **Best For** | Caching, options, data records, and lookup tables |
| **Logic** | Key-Value mapping |
| **Safety** | Use `dig` to avoid "undefined method for nil" errors |
| **Modern** | Since Ruby 1.9, hashes are "Ordered" (they remember insertion order) |
| **Standard** | Use modern `key: value` syntax whenever keys are symbols |
| **Identity** | Hashes are objects of the `Hash` class |
| **Compact** | `h.compact` removes all `nil` values from the hash |
