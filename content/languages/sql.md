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
topics:
  - section: "Basics"
    items:
      - title: "Introduction to SQL"
        description: "Relational model, RDBMS, and SQL dialects"
      - title: "SELECT Queries"
        description: "SELECT, WHERE, ORDER BY, LIMIT, and DISTINCT"
      - title: "Filtering & Sorting"
        description: "Comparison operators, LIKE, IN, BETWEEN, and NULL handling"
      - title: "Aggregate Functions"
        description: "COUNT, SUM, AVG, MIN, MAX, and GROUP BY / HAVING"
  - section: "Joins & Relationships"
    items:
      - title: "Joins"
        description: "INNER, LEFT, RIGHT, FULL OUTER, CROSS, and self joins"
      - title: "Subqueries"
        description: "Scalar, row, and table subqueries, correlated subqueries"
      - title: "Set Operations"
        description: "UNION, INTERSECT, EXCEPT, and their ALL variants"
  - section: "DDL & DML"
    items:
      - title: "Table Management"
        description: "CREATE TABLE, ALTER, DROP, constraints, and indexes"
      - title: "Data Manipulation"
        description: "INSERT, UPDATE, DELETE, and MERGE/UPSERT"
      - title: "Transactions"
        description: "BEGIN, COMMIT, ROLLBACK, and ACID properties"
  - section: "Advanced"
    items:
      - title: "Window Functions"
        description: "ROW_NUMBER, RANK, LAG, LEAD, and OVER (PARTITION BY)"
      - title: "CTEs & Recursive Queries"
        description: "WITH clause, recursive CTEs, and hierarchical data"
      - title: "Views & Stored Procedures"
        description: "CREATE VIEW, functions, triggers, and procedural SQL"
---

## Overview

SQL (Structured Query Language) is the standard language for relational database management systems. It is used for storing, manipulating, and retrieving data in databases like PostgreSQL, MySQL, SQLite, and Microsoft SQL Server.

## Key Features

- **Declarative syntax** — Describe the result, not the steps
- **ACID compliance** — Transactions with atomicity, consistency, isolation, durability
- **Joins** — Combine data across multiple tables relationally
- **Window functions** — Advanced analytics (ranking, running totals)
- **Ubiquitous** — Every major RDBMS supports SQL

## Code Example

```sql
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
