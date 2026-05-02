---
title: "Variables"
description: "Scalars, Arrays, and Hashes: Mastering the Sigils"
---

## The Sigils

In **Perl**, the first character of a variable name (the **Sigil**) tells you what kind of data it holds. This is one of the most distinctive features of the language.

| Sigil | Type | Description |
| :--- | :--- | :--- |
| **$** | **Scalar** | A single value (Number, String, or Reference) |
| **@** | **Array** | A list of scalar values |
| **%** | **Hash** | A collection of key-value pairs |

## 1. Scalars (`$`)

A scalar holds a single piece of information.

```perl
my $name = "Alpha";
my $age = 25;
```

## 2. Arrays (`@`)

Arrays are ordered lists. They are 0-indexed.

```perl
my @fruits = ("Apple", "Banana", "Cherry");
print $fruits[0]; # Accessing a single item turns the @ into a $!
```

Wait! Notice that when you access a **single** item from an array, you use the **`$`** sigil because the result is a scalar.

## 3. Hashes (`%`)

Hashes are key-value pairs (also called associative arrays).

```perl
my %scores = ("Alice" => 10, "Bob" => 20);
print $scores{"Alice"}; # Use $ and braces {} for single access
```

## Context Matters

Wait! Perl is famous for **Context**. A variable might behave differently depending on whether it is used in a "Scalar Context" (expecting one value) or a "List Context" (expecting many).

```perl
my @list = (1, 2, 3);
my $count = @list; # Returns the number of items (3)
```

## Summary

| Term | Description |
| :--- | :--- |
| **my** | Declares a local variable (Lexical scope) |
| **$** | Single value (Scalar) |
| **@** | Ordered list (Array) |
| **%** | Key-Value pairs (Hash) |
| **qw()** | "Quote Words" - Shorthand for an array: `qw(a b c)` |
| **Best For** | Organizing and manipulating structured text data |
| **Logic** | "The prefix defines the type" |
| **Safety** | Always use `my` to avoid global variable leaks |
| **Modern** | Modern Perl uses `my` exclusively |
| **Standard** | Sigils make variables easy to spot in complex text code |
| **Identity** | The sigils originated from the shell scripting world |
