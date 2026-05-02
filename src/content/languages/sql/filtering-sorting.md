---
title: "Filtering & Sorting"
description: "WHERE, ORDER BY, and Logical Operators"
---

## Filtering with `WHERE`

The **`WHERE`** clause is used to filter records. It ensures that only the rows that fulfill a specific condition are returned.

```sql
SELECT * FROM products WHERE price > 100;
```

## Logical Operators

Wait! You can combine multiple conditions using **`AND`**, **`OR`**, and **`NOT`**.

```sql
SELECT * FROM users 
WHERE country = 'USA' 
  AND age >= 18 
  AND NOT status = 'banned';
```

## Range and Set Filtering

-   **`BETWEEN`**: Filters values within a specific range (inclusive).
-   **`IN`**: Filters values that match any value in a list.
-   **`LIKE`**: Used with wildcards (`%` for any string, `_` for a single character) to search for patterns.

```sql
SELECT * FROM orders WHERE amount BETWEEN 50 AND 200;
SELECT * FROM users WHERE city IN ('London', 'Paris', 'Tokyo');
SELECT * FROM users WHERE email LIKE '%@gmail.com';
```

## Sorting with `ORDER BY`

The **`ORDER BY`** keyword is used to sort the result-set in ascending (**`ASC`**) or descending (**`DESC`**) order. By default, it sorts in ascending order.

```sql
SELECT * FROM products ORDER BY price DESC;
```

## Handling NULLs

In SQL, `NULL` represents a missing or unknown value. You cannot use `=` to check for NULL; you must use **`IS NULL`** or **`IS NOT NULL`**.

```sql
SELECT * FROM users WHERE phone IS NULL;
```

## Summary

| Keyword | Description |
| :--- | :--- |
| **WHERE** | Filtering rows based on conditions |
| **ORDER BY** | Sorting results (ASC/DESC) |
| **AND / OR** | Combining multiple filters |
| **BETWEEN** | Matching a range of values |
| **IN** | Matching any value in a set |
| **LIKE** | Pattern matching with wildcards (`%`, `_`) |
| **IS NULL** | Checking for missing values |
| **Logic** | Filtering happens BEFORE sorting in the execution plan |
| **Safety** | Always filter your queries to avoid loading huge datasets into memory |
| **Modern** | Indexes are used by the database to make `WHERE` clauses blazing fast |
| **Wildcard** | `%` matches zero or more characters; `_` matches exactly one |
