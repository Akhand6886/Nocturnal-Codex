---
title: "Indexing & Optimization"
description: "Improving query performance with indexes and EXPLAIN plans"
---

## What is an Index?

Think of a database index like the index at the back of a physical book. Instead of scanning every page (a "Full Table Scan") to find a topic, you look it up in the index to find the exact page number.

In SQL, an index is a special data structure (usually a **B-Tree**) that stores a sorted version of a column's data along with pointers to the original rows.

```sql
-- Create an index on the email column
CREATE INDEX idx_user_email ON users(email);
```

### When to use an index:
- On columns used in `WHERE` clauses.
- On columns used in `JOIN` conditions.
- On columns used in `ORDER BY` and `GROUP BY` operations.

### When NOT to use an index:
- On small tables (scanning is faster than looking up an index).
- On columns with low cardinality (e.g., a "gender" column with only 2 values).
- On tables with massive write volume (indexes slow down `INSERT`, `UPDATE`, and `DELETE`).

---

## The EXPLAIN Plan

To see how a database executes your query and whether it's using an index, use the `EXPLAIN` command.

```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

Look for these key terms in the output:
- **Index Scan / Seek**: Good! The index was used.
- **Full Table Scan (Seq Scan)**: Bad for large tables. The database had to read every row.
- **Cost**: An estimate of the resources used. Lower is better.

## Optimization Tips

1.  **Selectivity**: Put the most selective columns (those that filter out the most rows) first in a composite index.
2.  **Covering Indexes**: If an index includes ALL the columns requested in the `SELECT`, the database doesn't even need to touch the main table!
3.  **Avoid Functions on Indexed Columns**: `WHERE YEAR(date) = 2023` will **not** use an index on the `date` column. Use `WHERE date >= '2023-01-01'` instead.

## Summary Checklist
- [x] Indexes speed up reads but slow down writes.
- [x] Use `B-Tree` (default) for range queries and `Hash` for exact matches.
- [x] Use `EXPLAIN` to audit your query performance.
- [x] Index the columns you filter and join on.
- [x] Monitor and remove unused indexes to save space and performance.
