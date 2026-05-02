---
title: "Functions"
description: "Defining functions, parameters, and type hinting in PHP"
---

## Defining Functions

In **PHP**, you define a function using the **`function`** keyword.

```php
function sum($a, $b) {
    return $a + $b;
}
```

## Type Hinting (Modern PHP)

Wait! In modern PHP (7.0+), you can and should specify the types of your parameters and your return value. This makes your code much more reliable.

```php
function sum(int $a, int $b): int {
    return $a + b;
}
```

## Default Parameters

You can provide default values for parameters, making them optional when the function is called.

```php
function greet(string $name, string $prefix = "Hello"): string {
    return "$prefix, $name!";
}
```

## Named Arguments (PHP 8+)

Wait! PHP 8 introduced **Named Arguments**, allowing you to pass values to a function based on the parameter name, not just the position.

```php
greet(prefix: "Hi", name: "Alpha");
```

## Anonymous Functions (Closures)

You can create functions that don't have a name. These are often used as callbacks.

```php
$greet = function($name) {
    echo "Hello $name";
};

$greet("Alpha");
```

## Summary

| Term | Description |
| :--- | :--- |
| **function** | Keyword to declare a function |
| **return** | Providing a value back to the caller |
| **void** | Return type for functions that return nothing |
| **mixed** | Type hint for a value that can be anything |
| **Closure** | An anonymous function that can "use" outer variables |
| **Arrow** | `fn() => ...` (Short closures in PHP 7.4+) |
| **Best For** | Logic reusability and organization |
| **Logic** | Small functions are easier to test and maintain |
| **Safety** | Use type hints for everything to avoid bugs |
| **Modern** | PHP 8 features make functions much more powerful |
| **Standard** | Use `camelCase` for function names |
| **Identity** | Functions in PHP are not case-sensitive (but call them correctly!) |
