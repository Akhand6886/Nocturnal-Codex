---
title: "Introduction to SQL"
description: "What is SQL, Relational Databases, and the standard syntax"
---

## What is SQL?

**SQL** (Structured Query Language) is the standard language for communicating with **Relational Database Management Systems (RDBMS)**. It allows you to create, read, update, and delete data with precision and efficiency.

```sql
SELECT 'Hello, Nocturnal Codex!' AS greeting;
```

## Why Learn SQL?

1.  **Data Dominance**: SQL is the universal language of data. Whether you're a web developer, data scientist, or sysadmin, you will interact with databases.
2.  **Declarative Power**: You tell the database **what** you want, not **how** to get it. The database engine optimizes the search for you.
3.  **Relational Model**: Understanding tables, rows, and relationships is fundamental to software architecture.
4.  **Standardized**: While different vendors (PostgreSQL, MySQL, SQL Server) have their own flavors, the core syntax remains remarkably consistent.

## The Big Four: CRUD Operations

Wait! Most of your work in SQL will revolve around these four concepts:

-   **Create**: `INSERT` data into a table.
-   **Read**: `SELECT` data from a table.
-   **Update**: `UPDATE` existing data.
-   **Delete**: `DELETE` data from a table.

## Common Database Engines

-   **PostgreSQL**: The most advanced and standard-compliant open-source RDBMS.
-   **MySQL / MariaDB**: Extremely popular for web applications (the "M" in LAMP stack).
-   **SQLite**: A file-based database used in mobile apps and small tools.
-   **SQL Server / Oracle**: Enterprise-grade databases with massive scaling features.

> [!TIP]
> SQL keywords (like `SELECT`, `FROM`, `WHERE`) are not case-sensitive, but it is a best practice to write them in **ALL CAPS** for better readability.

## Summary

| Term | Description |
| :--- | :--- |
| **SQL** | Structured Query Language |
| **RDBMS** | Relational Database Management System |
| **Table** | A collection of related data in rows and columns |
| **Row** | A single record in a table |
| **Column** | A specific field/attribute of the data |
| **Primary Key**| A unique identifier for each row |
| **Foreign Key**| A link between two tables |
| **Schema** | The blueprint/structure of the database |
| **Best For** | Structured data, financial records, user accounts |
| **Logic** | Set-based operations on tabular data |
| **Standard** | SQL-92 is the most widely supported standard |
| **Modern** | SQL powers everything from small apps to massive cloud platforms |
