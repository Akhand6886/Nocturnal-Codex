---
title: "Type System"
description: "Scalar types, Union types, Intersection types, and DNF"
---

## The Typing Revolution

For most of its history, **PHP** was weakly typed. Since PHP 7.0 and 8.0, the language has evolved into a robust, strictly typed system that rivals Java or C#.

## 1. Scalar Types

You can (and should) type-hint your function parameters and return values.

```php
function add(int $a, int $b): int {
    return $a + $b;
}
```

## 2. Union Types (PHP 8.0+)

Sometimes a variable can be more than one type. You can specify this using the **`|`** (pipe) operator.

```php
function process(int|float $number): void {
    // ... logic ...
}
```

## 3. Intersection Types (PHP 8.1+)

Intersection types ensure that a variable implements **all** specified interfaces. Use the **`&`** operator.

```php
function export(Iterator & Countable $data): void {
    // $data must be BOTH an Iterator and Countable
}
```

## 4. The `mixed` Type

The `mixed` type represents any value. Use it sparingly when a type truly cannot be predicted.

## 5. DNF Types (PHP 8.2+)

**Disjunctive Normal Form (DNF)** allows you to combine Union and Intersection types!

```php
function handle((HasID & HasEmail) | string $user): void {
    // ... logic ...
}
```

## Strict Types

Wait! By default, PHP will still try to "coerce" types (e.g., passing the string `"1"` to an `int` parameter). To prevent this and enable **Strict Typing**, add this to the very top of your file:

```php
declare(strict_types=1);
```

## Summary

| Type | Syntax | PHP Version |
| :--- | :--- | :--- |
| **Scalar** | `int`, `string`, `bool`| 7.0+ |
| **Nullable** | `?string` | 7.1+ |
| **Union** | `int | string` | 8.0+ |
| **Intersection**| `A & B` | 8.1+ |
| **mixed** | `mixed` | 8.0+ |
| **DNF** | `(A & B) | C` | 8.2+ |
| **Best For** | Catching bugs at development time |
| **Logic** | "Fail early, fail clearly" |
| **Safety** | Eliminates thousands of "Unexpected Type" errors |
| **Modern** | PHP's type system is now one of the most expressive in the world |
| **Standard** | Use `declare(strict_types=1)` in every professional PHP file |
