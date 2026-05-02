---
title: "Constraints & Keys"
description: "PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, and CHECK"
---

## What are Constraints?

**Constraints** are rules applied to columns in a table. They are used to limit the type of data that can go into a table, ensuring the **integrity** and accuracy of your data.

## The Most Common Constraints

1.  **NOT NULL**: Ensures that a column cannot have a `NULL` value.
2.  **UNIQUE**: Ensures that all values in a column are different.
3.  **CHECK**: Ensures that all values in a column satisfy a specific condition (e.g., `age >= 18`).
4.  **DEFAULT**: Provides a default value for a column if none is specified.

```sql
CREATE TABLE employees (
    id INT UNIQUE NOT NULL,
    age INT CHECK (age >= 18),
    department VARCHAR(50) DEFAULT 'General'
);
```

## Primary Keys (`PRIMARY KEY`)

The **Primary Key** is a column (or group of columns) that uniquely identifies each row in a table. 
-   It must contain unique values.
-   It cannot contain `NULL` values.
-   A table can have only one primary key.

## Foreign Keys (`FOREIGN KEY`)

A **Foreign Key** is a column that points to the Primary Key of **another table**. This creates a relationship between the two tables and ensures **Referential Integrity**.

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Wait! If you try to delete a user who has active orders, the database will block the deletion because it would break the foreign key relationship.

## Summary

| Constraint | Purpose |
| :--- | :--- |
| **PRIMARY KEY**| Unique identifier for the row |
| **FOREIGN KEY**| Linking to another table's primary key |
| **NOT NULL** | Forcing a value to be present |
| **UNIQUE** | Preventing duplicate values |
| **CHECK** | Custom validation logic |
| **DEFAULT** | Fallback value for missing data |
| **Integrity** | Ensuring data stays consistent across relationships |
| **Validation** | Catching bad data BEFORE it enters the database |
| **Performance**| Keys are automatically indexed for fast searching |
| **Modern** | "Garbage in, garbage out"—Constraints prevent garbage! |
| **Standard** | Use `SERIAL` or `AUTO_INCREMENT` for numeric primary keys |
