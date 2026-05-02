---
title: "Data Manipulation (DML)"
description: "INSERT, UPDATE, DELETE, and TRUNCATE"
---

## What is DML?

**DML** (Data Manipulation Language) is the subset of SQL used to manage the data within existing tables. While `SELECT` reads data, DML **modifies** it.

## 1. `INSERT`: Adding Data

Use the `INSERT INTO` statement to add new rows to a table.

```sql
INSERT INTO users (name, email, age) 
VALUES ('Alpha', 'alpha@codex.com', 25);
```

## 2. `UPDATE`: Modifying Data

Use the `UPDATE` statement to change existing data. 

```sql
UPDATE users 
SET email = 'new@codex.com' 
WHERE id = 1;
```

> [!CAUTION]
> **ALWAYS** use a `WHERE` clause with `UPDATE`. If you forget it, you will update **every single row** in the table!

## 3. `DELETE`: Removing Data

Use the `DELETE` statement to remove rows from a table.

```sql
DELETE FROM users WHERE status = 'inactive';
```

Wait! Like `UPDATE`, if you forget the `WHERE` clause, you will delete **everything** in the table!

## 4. `TRUNCATE`: Clearing Data

`TRUNCATE` is a faster way to delete all rows from a table. Unlike `DELETE`, it doesn't log individual row deletions and resets any auto-incrementing counters.

```sql
TRUNCATE TABLE logs;
```

## Summary

| Keyword | Action | Description |
| :--- | :--- | :--- |
| **INSERT** | Create | Adding new records |
| **UPDATE** | Modify | Changing existing records |
| **DELETE** | Remove | Deleting specific records |
| **TRUNCATE** | Clear | Fast wipe of an entire table |
| **VALUES** | Data | The content to be inserted |
| **SET** | Update | The new values for specific columns |
| **WHERE** | Target | Essential for safety in Update/Delete |
| **Logic** | Data manipulation is the core of any dynamic app |
| **Safety** | Run a `SELECT` with your `WHERE` clause first to verify! |
| **Modern** | Databases use locks to ensure DML operations are safe |
| **Standard** | `UPSERT` (Insert or Update) patterns vary by database |
