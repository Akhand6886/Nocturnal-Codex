---
title: "Subqueries"
description: "Queries within queries, IN, EXISTS, and scalar subqueries"
---

## What is a Subquery?

A **Subquery** (or Inner Query) is a query nested inside another query. It allows you to use the results of one query to filter or calculate data in another.

```sql
SELECT name, price 
FROM products 
WHERE price > (SELECT AVG(price) FROM products);
```

In this example, the inner query calculates the average price first, and then the outer query selects products that are above that average.

## Types of Subqueries

Wait! Subqueries can be used in different parts of your statement:

1.  **WHERE Clause**: To filter results based on a calculation.
2.  **FROM Clause**: To treat the results of a query as if they were a table (**Derived Table**).
3.  **SELECT Clause**: To add a calculated column to each row.

## `EXISTS` vs. `IN`

-   **`IN`**: Used when you have a specific list of values.
-   **`EXISTS`**: Used to check if a subquery returns **any** rows. It is often faster than `IN` for large datasets because it stops as soon as it finds a single match.

```sql
SELECT name FROM users 
WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id);
```

## Correlated Subqueries

A **Correlated Subquery** is a subquery that uses values from the outer query. This means the inner query runs once for **every row** in the outer query.

```sql
SELECT name, (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS order_count
FROM users;
```

> [!CAUTION]
> Correlated subqueries can be very slow on large tables! Often, a **JOIN** is more efficient for this kind of logic.

## Summary

| Term | Description |
| :--- | :--- |
| **Inner Query** | The nested query that runs first |
| **Outer Query** | The main query that uses the inner result |
| **Scalar** | A subquery that returns exactly one value |
| **EXISTS** | Checking for the presence of matching data |
| **IN** | Checking if a value is in a list |
| **Derived Table**| A subquery in the FROM clause (must have an alias!) |
| **Logic** | Break complex problems into smaller, queryable steps |
| **Speed** | Prefer JOINS over subqueries for performance whenever possible |
| **Standard** | Supported by all major SQL engines |
| **Nesting** | You can nest subqueries multiple levels deep (but keep it readable!) |
| **Modern** | CTEs (Common Table Expressions) are often a cleaner alternative |
