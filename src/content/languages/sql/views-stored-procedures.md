---
title: "Views & Stored Procedures"
description: "Virtual tables, reusable logic, and database functions"
---

## What is a View?

A **View** is a "Virtual Table" based on the result-set of an SQL statement. It doesn't store data itself; instead, it saves a complex query so you can use it just like a regular table.

```sql
CREATE VIEW active_users AS
SELECT id, username, email 
FROM users 
WHERE status = 'active';

-- Now you can query it!
SELECT * FROM active_users;
```

## Why use Views?

1.  **Security**: Hide sensitive columns (like passwords) from certain users.
2.  **Simplicity**: Wrap complex `JOIN`s and calculations into a single name.
3.  **Consistency**: Provide a single "Source of Truth" for complex logic across many apps.

## What is a Stored Procedure?

A **Stored Procedure** is a prepared SQL code that you can save, so the code can be reused over and over again. Unlike views, procedures can take parameters and perform complex logic (like `if/else` and loops).

```sql
CREATE PROCEDURE GetUserByEmail(email_addr VARCHAR(255))
AS
BEGIN
    SELECT * FROM users WHERE email = email_addr;
END;
```

Wait! The syntax for stored procedures varies **significantly** between databases (MySQL vs. SQL Server vs. PostgreSQL).

## Functions vs. Procedures

-   **Functions**: Must return a value. Can be used inside a `SELECT` statement.
-   **Procedures**: Don't have to return a value. Are called using `EXEC` or `CALL`.

## Summary

| Object | Type | Description |
| :--- | :--- | :--- |
| **View** | Virtual Table | Saved query that looks like a table |
| **Materialized**| Cached View | A view that actually saves its data for speed |
| **Procedure** | Block of Code | Reusable script with parameters |
| **Function** | Calculation | Code that returns a specific value |
| **Triggers** | Event-based | Code that runs automatically when data changes |
| **Best For** | Abstracting complexity, securing data, centralizing logic |
| **Performance**| Materialized views can drastically speed up slow reports |
| **Logic** | Move logic out of your App and into the Database |
| **Modern** | Many modern apps use Views to create "API-ready" data |
| **Standard** | `CREATE OR REPLACE` allows easy updates to views |
