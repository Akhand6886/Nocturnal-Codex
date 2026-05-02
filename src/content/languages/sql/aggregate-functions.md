---
title: "Aggregate Functions"
description: "COUNT, SUM, AVG, MIN, MAX, and GROUP BY"
---

## What are Aggregate Functions?

**Aggregate Functions** perform a calculation on a set of values and return a single value. They are essential for generating reports and analyzing data.

```sql
SELECT COUNT(*) FROM users; // Total number of rows
SELECT SUM(price) FROM orders; // Total revenue
SELECT AVG(age) FROM users; // Average age
```

## The Five Main Aggregates

| Function | Description |
| :--- | :--- |
| **COUNT()** | Returns the number of rows |
| **SUM()** | Returns the total sum of a numeric column |
| **AVG()** | Returns the average value |
| **MIN()** | Returns the smallest value |
| **MAX()** | Returns the largest value |

## Grouping Data (`GROUP BY`)

Wait! Aggregates are most powerful when used with **`GROUP BY`**. This allows you to perform calculations on specific "groups" of data (e.g., total sales per category).

```sql
SELECT category, COUNT(*) 
FROM products 
GROUP BY category;
```

## Filtering Groups (`HAVING`)

You cannot use `WHERE` to filter the results of an aggregate function because `WHERE` happens **before** the grouping. To filter groups, use **`HAVING`**.

```sql
SELECT category, AVG(price) 
FROM products 
GROUP BY category 
HAVING AVG(price) > 50;
```

> [!IMPORTANT]
> Any column in your `SELECT` list that is not part of an aggregate function **must** be included in the `GROUP BY` clause!

## Summary

| Keyword | Description |
| :--- | :--- |
| **GROUP BY** | Categorizing rows into groups |
| **HAVING** | Filtering the results of a GROUP BY |
| **COUNT(col)**| Ignores NULL values |
| **COUNT(*)** | Counts every row including NULLs |
| **Round** | Use `ROUND(AVG(price), 2)` for cleaner output |
| **Logic** | Aggregation turns many rows into one row |
| **Speed** | Aggregate queries can be slow on huge tables without indexes |
| **Standard** | `MIN` and `MAX` work on strings and dates too! |
| **Safety** | Ensure your `GROUP BY` matches your `SELECT` columns |
| **Modern** | SQL engines use parallel processing for fast aggregation |
