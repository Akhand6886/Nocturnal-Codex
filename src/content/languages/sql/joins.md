---
title: "Joins"
description: "INNER, LEFT, RIGHT, and FULL JOINs explained"
---

## What is a JOIN?

A **JOIN** clause is used to combine rows from two or more tables, based on a related column between them. This is the "Relational" part of Relational Databases.

```sql
SELECT users.name, orders.amount
FROM users
JOIN orders ON users.id = orders.user_id;
```

## Types of Joins

Wait! There are four main types of joins you need to know. Imagine two circles (Table A and Table B) in a Venn diagram:

1.  **INNER JOIN**: Returns records that have matching values in both tables. (The intersection).
2.  **LEFT JOIN**: Returns all records from the left table, and the matched records from the right table. If no match, it returns `NULL` for the right side.
3.  **RIGHT JOIN**: Returns all records from the right table, and the matched records from the left table.
4.  **FULL JOIN**: Returns all records when there is a match in either left or right table.

## Visualizing Joins

| Type | Match? | Result |
| :--- | :--- | :--- |
| **INNER** | Both | Only the rows that exist in both |
| **LEFT** | A + (A & B)| Everything in A, even if B has no data |
| **RIGHT** | B + (A & B)| Everything in B, even if A has no data |
| **FULL** | A | B | Everything from both tables |

## Self Joins

You can even join a table to itself! This is useful for hierarchical data (like a `users` table where each user has a `manager_id` pointing back to another user).

```sql
SELECT a.name AS employee, b.name AS manager
FROM users a
JOIN users b ON a.manager_id = b.id;
```

> [!TIP]
> Always use aliases (`AS`) when joining tables to keep your query clean and avoid "ambiguous column" errors!

## Summary

| Term | Description |
| :--- | :--- |
| **ON** | The condition that links the two tables |
| **Primary Key**| The unique ID on the "parent" table |
| **Foreign Key**| The ID on the "child" table that points back |
| **Relationship**| One-to-One, One-to-Many, Many-to-Many |
| **NULL** | What you get in a LEFT JOIN when there's no match |
| **Logic** | Joins allow you to "normalize" data (no duplication) |
| **Speed** | Joining many tables can be slow; ensure keys are indexed! |
| **Standard** | `JOIN` is a shortcut for `INNER JOIN` in most databases |
| **Modern** | Joins are the heart of relational database power |
| **CROSS JOIN** | Returns every possible combination (Cartesian Product) |
