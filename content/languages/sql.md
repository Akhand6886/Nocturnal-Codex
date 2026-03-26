---
id: "sql"
name: "SQL"
slug: "sql"
description: "The standard language for managing and querying relational databases."
iconName: "mysql"
year: 1974
creator: "Donald Chamberlin, Raymond Boyce (IBM)"
paradigm: ["Declarative"]
useCases: ["Database Management", "Data Analysis", "Reporting", "Backend Development"]
website: "https://www.iso.org/standard/76583.html"
category: "Data"
featured: false
difficulty: "Beginner"
---

## Overview

SQL (Structured Query Language) is the standard language for relational database management systems. It is used for storing, manipulating, and retrieving data in databases like PostgreSQL, MySQL, SQLite, and Microsoft SQL Server. SQL's declarative nature lets you describe *what* data you want rather than *how* to get it, making it accessible even to non-programmers while remaining powerful for complex analytics.

## Key Features

- **Declarative syntax** — Describe the result, not the steps
- **ACID compliance** — Transactions with atomicity, consistency, isolation, durability
- **Joins** — Combine data across multiple tables relationally
- **Window functions** — Advanced analytics (ranking, running totals, moving averages)
- **Ubiquitous** — Every major RDBMS supports SQL

## Code Example

```sql
-- Window functions for analytics
SELECT
    department,
    employee_name,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank,
    AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees
WHERE hire_date >= '2020-01-01'
ORDER BY department, rank;
```

## Learning Resources

- [SQLBolt (Interactive)](https://sqlbolt.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/)
