---
title: "Set Operations"
description: "UNION, INTERSECT, and EXCEPT"
---

## What are Set Operations?

**Set Operations** allow you to combine the results of two or more `SELECT` statements into a single result set. Unlike **JOINs**, which combine columns from different tables horizontally, set operations combine rows from different queries **vertically**.

## 1. `UNION`

`UNION` combines the results of two queries and removes duplicate rows. If you want to keep duplicates, use **`UNION ALL`**.

```sql
SELECT city FROM customers
UNION
SELECT city FROM suppliers;
```

Wait! For `UNION` to work:
-   Both queries must have the same number of columns.
-   The columns must have compatible data types.
-   The columns must be in the same order.

## 2. `INTERSECT`

`INTERSECT` returns only the rows that are present in **both** queries.

```sql
SELECT email FROM marketing_list
INTERSECT
SELECT email FROM customer_list;
```

## 3. `EXCEPT` (or `MINUS`)

`EXCEPT` returns the rows that are in the first query but **not** in the second.

```sql
SELECT product_id FROM all_products
EXCEPT
SELECT product_id FROM discontinued_products;
```

> [!NOTE]
> In Oracle, the `EXCEPT` operation is called `MINUS`. Most other databases (PostgreSQL, SQL Server) use `EXCEPT`.

## Summary

| Operation | Result |
| :--- | :--- |
| **UNION** | All unique rows from both |
| **UNION ALL** | All rows from both (including duplicates) |
| **INTERSECT** | Only rows that appear in both |
| **EXCEPT** | Rows in Query A but not in Query B |
| **Vertical** | Combining rows, not columns |
| **Compatible**| Types must match across both queries |
| **Best For** | Comparing datasets, merging mailing lists |
| **Logic** | Set Theory applied to relational data |
| **Speed** | `UNION ALL` is faster than `UNION` because it doesn't check for duplicates |
| **Standard** | `UNION` is very standard; `INTERSECT` and `EXCEPT` vary slightly |
