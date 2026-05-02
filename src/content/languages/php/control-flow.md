---
title: "Control Flow"
description: "if/else, switch, match, and loops in PHP"
---

## Conditional Logic (`if`)

In **PHP**, `if` statements work just like in other C-style languages.

```php
if ($age >= 18) {
    echo "Adult";
} else {
    echo "Minor";
}
```

## The `match` Expression (PHP 8+)

Wait! PHP 8 introduced the **`match`** expression. It's like a cleaner, safer version of `switch` that returns a value and doesn't require `break` statements.

```php
$status = match($code) {
    200, 300 => 'success',
    400 => 'error',
    default => 'unknown',
};
```

## Loops in PHP

PHP provides several ways to repeat code:

1.  **`foreach`**: The most common way to iterate through an **Array**.
2.  **`for`**: Best for a fixed number of iterations.
3.  **`while`**: Runs as long as a condition is true.

```php
$fruits = ["Apple", "Banana", "Cherry"];

foreach ($fruits as $fruit) {
    echo $fruit;
}
```

Wait! You can also get the **key** in a `foreach` loop:
```php
foreach ($fruits as $index => $fruit) {
    echo "$index: $fruit";
}
```

## Alternative Syntax

PHP has an alternative syntax for control flow that is widely used in HTML templates (like WordPress). It uses `:` and `endif;` instead of `{}`.

```php
<?php if ($is_logged_in): ?>
    <h1>Welcome back!</h1>
<?php endif; ?>
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **if / elseif** | Basic branching |
| **switch** | Traditional multi-way branch |
| **match** | Modern, safer branch (Expression) |
| **foreach** | Primary loop for arrays |
| **continue** | Skip to next iteration |
| **break** | Exit loop completely |
| **Logic** | Essential for building interactive websites |
| **Safety** | `match` is exhaustive and uses strict comparison |
| **Modern** | PHP 8 `match` is significantly cleaner than `switch` |
| **Standard** | Use `foreach` for almost everything in PHP |
| **Template** | Alternative syntax is great for embedding in HTML |
