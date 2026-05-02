---
title: "Window Functions"
description: "Performing calculations across sets of rows without collapsing them"
---

## What are Window Functions?

**Window Functions** allow you to perform calculations across a set of table rows that are somehow related to the current row. Unlike regular aggregate functions (`SUM`, `AVG`), window functions do NOT group rows into a single output row; the rows retain their individual identities.

The keyword for window functions is `OVER`.

## 1. Syntax

```sql
SELECT 
    column_name, 
    FUNCTION() OVER (PARTITION BY ... ORDER BY ...) 
FROM table;
```

## 2. Ranking Functions

These are used to assign a rank or row number to each row within a partition.

- `ROW_NUMBER()`: Unique incrementing number.
- `RANK()`: Assigns the same rank to ties (skips the next number).
- `DENSE_RANK()`: Assigns the same rank to ties (doesn't skip).

```sql
SELECT 
    name, department, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank
FROM employees;
```

## 3. Aggregate Window Functions

You can calculate running totals, averages, or moving averages without a `GROUP BY`.

```sql
SELECT 
    order_date, amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM sales;
```

## 4. Value Functions

These allow you to access data from other rows relative to the current row.

- `LAG(col, n)`: Get value from `n` rows before.
- `LEAD(col, n)`: Get value from `n` rows after.

```sql
SELECT 
    day, price,
    LAG(price, 1) OVER (ORDER BY day) as previous_day_price
FROM stock_prices;
```

## 5. Frames (ROWS BETWEEN)

You can further restrict the "window" of rows used for the calculation using a frame clause.

```sql
-- 3-day moving average
SELECT 
    date, price,
    AVG(price) OVER (
        ORDER BY date 
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) as moving_avg
FROM prices;
```

## Summary Checklist
- [x] Window functions use the `OVER` clause.
- [x] Rows are NOT collapsed (unlike `GROUP BY`).
- [x] Use `PARTITION BY` to group calculations.
- [x] Use `ORDER BY` to define sequences (like running totals).
- [x] `LAG`/`LEAD` are essential for time-series analysis.
- [x] `RANK` is perfect for "Top N" queries within categories.
---
