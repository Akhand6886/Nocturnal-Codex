---
title: "Transactions"
description: "ACID properties, COMMIT, and ROLLBACK"
---

## What is a Transaction?

A **Transaction** is a unit of work that contains one or more SQL statements. Transactions ensure that either all the statements succeed or none of them do. This is critical for maintaining data integrity, especially in financial systems.

```sql
BEGIN; -- Start the transaction

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT; -- Save the changes forever
```

## The ACID Properties

Wait! Every reliable database transaction must follow the **ACID** rules:

1.  **Atomicity**: "All or nothing." If any part of the transaction fails, the whole thing is canceled.
2.  **Consistency**: Transactions must take the database from one valid state to another.
3.  **Isolation**: Transactions running at the same time shouldn't interfere with each other.
4.  **Durability**: Once a transaction is committed, it stays committed, even if the system crashes.

## Handling Failures (`ROLLBACK`)

If something goes wrong during a transaction (like a constraint violation), you can use **`ROLLBACK`** to undo all the changes made since the `BEGIN`.

```sql
BEGIN;
-- ... logic ...
ROLLBACK; -- Never mind, undo everything!
```

## Isolation Levels

Databases allow you to control how "isolated" your transactions are from each other. Common levels include:
-   **Read Uncommitted**: Can see data that hasn't been saved yet.
-   **Read Committed**: Can only see saved data (Default for most).
-   **Serializable**: The strictest level; ensures transactions run as if they were one after another.

## Summary

| Term | Description |
| :--- | :--- |
| **BEGIN** | Start a transaction |
| **COMMIT** | Save changes permanently |
| **ROLLBACK** | Undo changes since BEGIN |
| **SAVEPOINT** | A "checkpoint" within a long transaction |
| **Atomicity** | The whole group of queries succeeds or fails together |
| **Safety** | Prevents "Partial Updates" (e.g., taking money but not giving it) |
| **Locking** | Transactions use locks to prevent data corruption |
| **Best For** | Banking, e-commerce, complex multi-table updates |
| **Logic** | Group related changes together to keep data valid |
| **Modern** | Postgres and MySQL use MVCC for high-performance transactions |
| **Standard** | `START TRANSACTION` is the standard name for `BEGIN` |
