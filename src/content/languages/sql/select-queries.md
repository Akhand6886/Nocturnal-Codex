---
title: "SELECT Queries"
description: "The foundation of data retrieval in SQL"
---

## The `SELECT` Statement

The **`SELECT`** statement is used to fetch data from a database. It is the most frequently used command in SQL.

```sql
SELECT first_name, last_name FROM users;
```

## Selecting All Columns (`*`)

If you want to retrieve every column in a table, you can use the asterisk (**`*`**) wildcard.

```sql
SELECT * FROM users;
```

Wait! While `SELECT *` is convenient for debugging, you should **avoid it** in production code. Explicitly naming your columns is faster and prevents your app from breaking if columns are added or removed from the table.

## Aliases (`AS`)

You can give a column or a table a temporary name using the **`AS`** keyword. This is very useful for making output more readable or handling calculated values.

```sql
SELECT first_name AS name FROM users;
```

## Distinct Values (`DISTINCT`)

If your table has duplicate data and you only want to see the unique values, use the **`DISTINCT`** keyword.

```sql
SELECT DISTINCT country FROM users;
```

## Limiting Results (`LIMIT`)

To prevent the database from sending you millions of rows, you can use **`LIMIT`** (or `TOP` in SQL Server) to restrict the number of rows returned.

```sql
SELECT * FROM users LIMIT 10;
```

> [!NOTE]
> The order of clauses in a query is strict! It always goes: `SELECT` -> `FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `ORDER BY` -> `LIMIT`.

## Summary

| Keyword | Description |
| :--- | :--- |
| **SELECT** | Specifies the columns to retrieve |
| **FROM** | Specifies the table to retrieve from |
| **\*** | Wildcard for "all columns" |
| **AS** | Renaming a column or table (Alias) |
| **DISTINCT** | Returning only unique values |
| **LIMIT** | Restricting the number of rows returned |
| **Logic** | Data retrieval is the "Read" in CRUD |
| **Safety** | Explicit column naming prevents bugs |
| **Modern** | SQL engines optimize query plans for maximum speed |
| **Standard** | `OFFSET` can be used with `LIMIT` for pagination |
| **Identity** | The result of a SELECT is always a "Result Set" (a temporary table) |
