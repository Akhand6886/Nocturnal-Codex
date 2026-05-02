---
title: "Variables & Types"
description: "Local, Instance, Global, and Class variables in Ruby"
---

## Dynamic Typing

In **Ruby**, you don't need to specify a type for your variables. A variable's type is determined by the value it currently holds.

```ruby
name = "Alpha"
age = 25
```

## Variable Scopes

Wait! In Ruby, the **first character** of a variable name tells you its **Scope**. This is a unique and powerful feature of the language.

| Prefix | Type | Scope |
| :--- | :--- | :--- |
| **none** | `local` | Available only in the current block/method |
| **@** | `instance` | Available to a specific instance of a class |
| **@@** | `class` | Shared across all instances of a class |
| **$** | `global` | Available everywhere in the program |
| **UPPER** | `constant` | Should not be changed after creation |

## Strings and Symbols

Ruby has two common ways to represent text:

1.  **String**: `"hello"` - Mutable. Used for data that changes.
2.  **Symbol**: `:hello` - Immutable and unique. Used for keys and identifiers. They are much faster and more memory-efficient than strings for comparisons.

## Common Data Types

| Type | Examples |
| :--- | :--- |
| **Integer** | `1`, `-42` |
| **Float** | `3.14`, `0.5` |
| **Boolean** | `true`, `false` |
| **Nil** | `nil` (The "Nothing" value) |
| **Array** | `[1, 2, 3]` |
| **Hash** | `{ key: "value" }` |

## Summary

| Term | Description |
| :--- | :--- |
| **Local** | `x = 5` |
| **Instance** | `@x = 5` (Owned by an object) |
| **Constant** | `PI = 3.14` |
| **Symbol** | `:name` (Immutable text identifier) |
| **Interpolation**| `"#{var}"` - Inserting variables into strings |
| **Mutable** | Almost everything in Ruby can be modified at runtime |
| **Best For** | Writing clean, self-documenting code |
| **Logic** | Names matter: the prefix determines the behavior |
| **Safety** | Dynamic but strong typing (No `1 + "1"` errors) |
| **Modern** | Ruby 3.0+ has a new type-checking tool called `Steep` |
| **Standard** | Use `snake_case` for all variable and method names |
| **Identity** | Variables in Ruby are references to objects |
