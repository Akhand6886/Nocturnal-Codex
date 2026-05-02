---
title: "Table Management (DDL)"
description: "CREATE, ALTER, and DROP tables"
---

## What is DDL?

**DDL** (Data Definition Language) is used to define and modify the **structure** (schema) of your database objects like tables, indexes, and views.

## 1. `CREATE TABLE`: Building the Blueprint

To create a new table, you must specify the table name, the column names, and their data types.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. `ALTER TABLE`: Making Changes

Use `ALTER TABLE` to modify an existing table (e.g., adding a new column or changing a data type).

```sql
ALTER TABLE users ADD COLUMN age INT;
ALTER TABLE users DROP COLUMN old_field;
```

## 3. `DROP TABLE`: Deleting the Structure

Use `DROP TABLE` to permanently delete a table and all the data inside it.

```sql
DROP TABLE users;
```

Wait! Unlike `DELETE` or `TRUNCATE`, `DROP` removes the **blueprint** itself. The table will no longer exist in the database.

## Common Data Types

| Type | Description |
| :--- | :--- |
| **INT** | Whole numbers |
| **VARCHAR(n)**| Variable-length string (max length `n`) |
| **TEXT** | Long strings (no fixed limit) |
| **BOOLEAN** | True or False |
| **DATE / TIME**| Calendar and clock values |
| **DECIMAL** | Precise numbers (good for money!) |

## Summary

| Keyword | Action | Description |
| :--- | :--- | :--- |
| **CREATE** | Build | Defining a new object |
| **ALTER** | Change | Modifying an existing object |
| **DROP** | Destroy | Deleting an object permanently |
| **RENAME** | Move | Changing the name of a table or column |
| **Schema** | Layout | The overall structure of your tables |
| **Identity** | Each table must have a unique name in its schema |
| **Best For** | Database setup, migrations, and maintenance |
| **Logic** | Definition happens BEFORE manipulation |
| **Safety** | Be extremely careful with `DROP` and `ALTER` in production! |
| **Modern** | Tools like Prisma or Liquibase help manage DDL changes |
| **Standard** | SQL types vary slightly between PostgreSQL and MySQL |
