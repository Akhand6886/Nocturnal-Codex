---
title: "Strings & Arrays"
description: "Manipulation, interpolation, and the powerful PHP array"
---

## Strings

Strings in **PHP** can be defined with single quotes (`'`) or double quotes (`"`). Double quotes allow for **Variable Interpolation**.

```php
$name = "Alpha";
echo "Hello $name"; // "Hello Alpha"
echo 'Hello $name'; // "Hello $name"
```

Wait! You combine strings using the **dot (`.`)** operator, not the plus sign.

```php
$full = "Hello" . " " . "World";
```

## The "Everything" Array

In PHP, the **Array** is a multi-purpose tool. It acts as a List, a Map, a Stack, and a Queue all at once.

### 1. Indexed Arrays (Lists)
```php
$fruits = ["Apple", "Banana"];
echo $fruits[0];
```

### 2. Associative Arrays (Maps)
```php
$ages = [
    "Alice" => 25,
    "Bob" => 30
];
echo $ages["Alice"];
```

## Useful Array Functions

PHP has hundreds of built-in functions for arrays. These are some of the most common:

| Function | Description |
| :--- | :--- |
| **count()** | Number of items in array |
| **array_push()**| Add item to end |
| **array_merge()**| Combine two arrays |
| **array_keys()** | Get all keys |
| **in_array()** | Check if value exists |
| **explode()** | Turn string into array |
| **implode()** | Turn array into string |

> [!TIP]
> PHP arrays are **Ordered Maps**. This means they remember the order in which items were added, even if they have string keys!

## Summary

| Term | Description |
| :--- | :--- |
| **.** | Concatenation operator for strings |
| **[]** | Short syntax for creating arrays (PHP 5.4+) |
| **=>** | Separator for Key => Value pairs |
| **Interpolation**| Inserting variables directly into double-quoted strings |
| **Escaping** | `\$` - Escaping the dollar sign in a string |
| **Best For** | Handling datasets, form results, and text |
| **Logic** | Arrays are the "Swiss Army Knife" of PHP |
| **Safety** | Be careful with `implode` on large datasets |
| **Modern** | PHP 8 string functions like `str_contains()` and `str_starts_with()` |
| **Standard** | Use `[]` instead of the old `array()` syntax |
| **Performance**| PHP arrays are highly optimized for fast access |
| **Identity** | An array is a "value type" (it is copied when passed) |
| **Splat** | `...$arr` - Unpacking arrays into arguments |
| **Destruct** | `[$a, $b] = $arr` - Destructuring arrays |
