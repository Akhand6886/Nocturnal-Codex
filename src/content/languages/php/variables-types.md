---
title: "Variables & Types"
description: "Dollar signs, dynamic typing, and primitive types in PHP"
---

## Declaring Variables

In **PHP**, variables always start with a dollar sign (**`$`**). You don't need to specify a type when declaring a variable; PHP is a **Dynamically Typed** language.

```php
$name = "Alpha";
$age = 25;
$isReady = true;
```

## Variable Variables (Advanced)

Wait! PHP has a unique feature called "Variable Variables." You can use the value of one variable as the name of another.

```php
$foo = "bar";
$$foo = "baz"; // This creates a variable called $bar with value "baz"
echo $bar;     // "baz"
```

## Constant Values

To define a constant that cannot be changed, use the `define()` function or the `const` keyword.

```php
define("SITE_URL", "https://codex.com");
const VERSION = 1.0;
```

## Data Types

PHP supports several basic data types:

| Type | Description |
| :--- | :--- |
| **String** | Text data (`"Hello"`) |
| **Integer** | Whole numbers (`42`) |
| **Float** | Decimal numbers (`3.14`) |
| **Boolean** | `true` or `false` |
| **Array** | Ordered map of values |
| **Object** | Instances of classes |
| **NULL** | Represents no value |

## Strict Typing

While PHP is dynamic by default, you can (and should) enable **Strict Typing** at the top of your file to force types to be checked.

```php
declare(strict_types=1);
```

## Summary

| Term | Description |
| :--- | :--- |
| **$** | Prefix for all variables |
| **Dynamic** | Type is determined at runtime |
| **Global** | `global $var` - Accessing variables inside functions |
| **Static** | `static $var` - Variable that keeps its value between calls |
| **Constant** | Immutable value (`define` or `const`) |
| **Best For** | Web requests, form data, session handling |
| **Logic** | Flexible and easy for beginners to start |
| **Safety** | Use `declare(strict_types=1)` for professional apps |
| **Modern** | PHP 8 supports union types and property promotion |
| **Standard** | Use `camelCase` for variables and `PascalCase` for classes |
| **Identity** | Variables are case-sensitive (`$x` is not `$X`) |
| **Scope** | Local by default inside functions |
