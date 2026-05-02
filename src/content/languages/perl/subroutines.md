---
title: "Subroutines"
description: "Defining functions and handling arguments in Perl"
---

## Defining Subroutines

In **Perl**, functions are called **Subroutines** and are defined using the **`sub`** keyword.

```perl
sub greet {
    my $name = shift; # Get the first argument
    print "Hello, $name!\n";
}

greet("Alpha");
```

## Handling Arguments (`@_`)

Wait! Perl doesn't have named parameters in the subroutine definition. Instead, all arguments are passed in a special array called **`@_`**.

There are two common ways to get arguments:
1.  **`shift`**: Gets the first item and removes it from `@_`.
2.  **Assignment**: Take all items at once.

```perl
sub add {
    my ($a, $b) = @_;
    return $a + $b;
}
```

## Return Values

A subroutine returns the value of the last expression evaluated, or you can use the explicit **`return`** keyword.

## Private Variables (`my`)

Always use **`my`** inside a subroutine to declare variables. This ensures they are local to the function and don't overwrite variables with the same name elsewhere in your script.

## Summary

| Term | Description |
| :--- | :--- |
| **sub** | Keyword to declare a subroutine |
| **@_** | The array containing all arguments |
| **shift** | Getting the next argument from `@_` |
| **my** | Declaring a local variable |
| **return** | Explicitly returning a value |
| **Best For** | Organizing code and logic |
| **Logic** | "Functional blocks of reusable code" |
| **Safety** | Lexical scoping with `my` is essential |
| **Modern** | Perl 5.20+ introduced optional "Experimental Signatures" |
| **Standard** | Use `snake_case` for subroutine names |
| **Identity** | Subroutines can be called with `&name()` or just `name()` |
