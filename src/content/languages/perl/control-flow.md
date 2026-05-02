---
title: "Control Flow"
description: "if, unless, for, and while: branching and looping in Perl"
---

## Conditional Logic (`if`)

**Perl**'s `if` statement is standard, but the braces `{}` are **always required**.

```perl
if ($age >= 18) {
    print "Adult\n";
} else {
    print "Minor\n";
}
```

## The `unless` Statement

Similar to Ruby, Perl has an **`unless`** keyword, which is the opposite of `if`.

```perl
unless ($is_logged_in) {
    print "Please log in.\n";
}
```

## Statement Modifiers

Wait! You can write conditions at the **end** of a line for very concise code.

```perl
print "Success!" if $count > 0;
die "Error!" unless $status;
```

## Loops in Perl

1.  **`foreach`**: The most common way to iterate through an array.
2.  **`while`**: Runs as long as a condition is true.
3.  **`until`**: Runs as long as a condition is false.

```perl
foreach my $fruit (@fruits) {
    print "I like $fruit\n";
}
```

## The Default Variable (`$_`)

Wait! This is a core Perl concept. If you don't specify a variable in a loop or some functions, Perl automatically uses **`$_`**.

```perl
foreach (@fruits) {
    print; # Prints $_ (the current fruit) automatically!
}
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / elsif** | Standard branching |
| **unless** | Negative branching |
| **foreach** | Collection iteration |
| **while** | Conditional loop |
| **until** | Opposite of while |
| **Modifier** | `code if condition;` (Post-fix syntax) |
| **Logic** | Clean and human-readable branching |
| **Safety** | Truthy: everything is true except `0`, `"0"`, `""`, and `undef` |
| **Modern** | The `given/when` feature was deprecated; use `if/elsif` |
| **Standard** | Use `foreach` for almost all iteration |
| **Identity** | The use of `$_` is a hallmark of "Concise Perl" |
