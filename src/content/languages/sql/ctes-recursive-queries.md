---
title: "Common Table Expressions (CTEs)"
description: "Mastering WITH clauses and recursive hierarchical queries"
---

## What is a CTE?

A **Common Table Expression (CTE)** is a temporary result set that you can reference within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement. CTEs make complex queries much easier to read and maintain by breaking them down into logical blocks.

The syntax starts with the `WITH` keyword.

## 1. Basic CTE Usage

Think of a CTE as a "named subquery" that lives only for the duration of the main query.

```sql
WITH HighValueOrders AS (
    SELECT customer_id, SUM(amount) as total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(amount) > 1000
)
SELECT c.name, hvo.total_spent
FROM customers c
JOIN HighValueOrders hvo ON c.id = hvo.customer_id;
```

## 2. Benefits over Subqueries
- **Readability**: Logic flows top-to-bottom.
- **Reusability**: You can reference the same CTE multiple times in the same query.
- **Simplicity**: Avoids deeply nested parentheses.

## 3. Recursive CTEs

This is the most powerful feature of CTEs. A **Recursive CTE** can reference itself, allowing you to query hierarchical or tree-structured data (like organizational charts or file systems).

A recursive CTE consists of two parts:
1.  **Anchor Member**: The base case (the "root" of the tree).
2.  **Recursive Member**: The part that refers back to the CTE name.

### Example: Organizational Hierarchy
```sql
WITH RECURSIVE OrgChart AS (
    -- Anchor: Start with the CEO
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: Join employees to their managers in the CTE
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN OrgChart oc ON e.manager_id = oc.id
)
SELECT * FROM OrgChart ORDER BY level;
```

## 4. Multiple CTEs

You can define multiple CTEs in a single query by separating them with commas.

```sql
WITH 
CTE1 AS (SELECT ...),
CTE2 AS (SELECT ...)
SELECT * FROM CTE1 JOIN CTE2 ...;
```

## Summary Checklist
- [x] Use `WITH` to define a CTE.
- [x] Use CTEs to replace complex subqueries for better readability.
- [x] Use Recursive CTEs for hierarchical data (trees/graphs).
- [x] CTEs are temporary and not stored in the database.
- [x] Perfect for breaking down large reporting queries.
---
