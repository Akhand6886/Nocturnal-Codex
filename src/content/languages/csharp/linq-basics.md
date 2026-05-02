---
title: "LINQ Basics"
description: "Language Integrated Query for powerful data filtering"
---

## What is LINQ?

**LINQ** (Language Integrated Query) is a revolutionary set of features in C# that allows you to query data from different sources (Lists, Databases, XML) using a consistent, SQL-like syntax.

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5, 6 };

// Functional Syntax (Most common)
var evens = numbers.Where(n => n % 2 == 0).ToList();

// Query Syntax (SQL-like)
var odds = from n in numbers
           where n % 2 != 0
           select n;
```

## Lambda Expressions (`=>`)

Wait! To use LINQ effectively, you must understand **Lambda Expressions**. They are short, anonymous functions. 
`n => n % 2 == 0` means "take `n` and return true if `n` is even."

## Common LINQ Methods

| Method | SQL Equivalent | Description |
| :--- | :--- | :--- |
| **Where** | `WHERE` | Filters the collection |
| **Select** | `SELECT` | Transforms each element |
| **OrderBy** | `ORDER BY` | Sorts the collection |
| **First** | `LIMIT 1` | Gets the first item (panics if empty) |
| **FirstOrDefault**| `LIMIT 1` | Gets first item or `null` / `0` |
| **Any** | `EXISTS` | Checks if any item matches a condition |
| **Count** | `COUNT` | Gets the number of matching items |

## Deferred Execution

Wait! One of the most important things about LINQ is that it is **Lazy**. The query doesn't actually run until you iterate over it (e.g., with `foreach`) or call a method like `.ToList()` or `.ToArray()`.

```csharp
var query = numbers.Where(n => n > 10); // Query defined, but NOT run yet.
var list = query.ToList(); // Query RUNS here!
```

## Summary

| Term | Description |
| :--- | :--- |
| **Fluent** | Chaining LINQ methods together |
| **Predicate** | A function that returns a boolean (used in `Where`) |
| **Projection**| Transforming data into a new shape (used in `Select`) |
| **Anonymous** | `select new { n.Name, n.Age }` (Creating types on the fly) |
| **Performance**| LINQ is fast, but be careful with large nested queries |
| **Logic** | "Tell the computer WHAT you want, not HOW to get it" |
| **Safety** | No more manual `foreach` loops with complex `if` logic |
| **Modern** | PLINQ (Parallel LINQ) for multi-core processing |
| **Standard** | `System.Linq` namespace |
| **Identity** | LINQ works on anything that is `IEnumerable<T>` |
