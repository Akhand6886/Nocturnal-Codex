---
title: "PDO & Database"
description: "Safe database interactions using PHP Data Objects"
---

## What is PDO?

**PDO** (PHP Data Objects) is a database abstraction layer that provides a consistent way to interact with different databases (MySQL, PostgreSQL, SQLite, etc.) using the same code.

Wait! Most importantly, PDO is the standard way to prevent **SQL Injection** attacks.

```php
$dsn = "mysql:host=localhost;dbname=testdb;charset=utf8mb4";
$pdo = new PDO($dsn, "user", "password");
```

## Prepared Statements

Never put user input directly into an SQL query! Use **Prepared Statements** with placeholders instead.

```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]); // Input is safely "bound" here
$user = $stmt->fetch();
```

## Why use PDO?

1.  **Security**: Automatically handles escaping to prevent hacking.
2.  **Flexibility**: Switch from MySQL to PostgreSQL by changing just one line (the DSN).
3.  **Error Handling**: Can be configured to throw exceptions when a query fails.

```php
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
```

## Fetching Data

-   **`fetch()`**: Gets a single row.
-   **`fetchAll()`**: Gets all rows as an array.
-   **`PDO::FETCH_ASSOC`**: Returns results as an associative array (the most common mode).

## Summary

| Term | Description |
| :--- | :--- |
| **DSN** | Data Source Name (Connection string) |
| **Prepare** | Sending the query blueprint to the server |
| **Execute** | Sending the actual data and running the query |
| **Bound** | Data that is safely attached to a placeholder |
| **SQL Inj.** | A critical security vulnerability prevented by PDO |
| **Best For** | Any professional database interaction in PHP |
| **Logic** | Separate the query logic from the query data |
| **Safety** | "Trust no user input" |
| **Modern** | The industry standard replacement for the old `mysql_` functions |
| **Standard** | Part of PHP since 5.1 (2005) |
| **Transaction**| PDO also supports `beginTransaction`, `commit`, and `rollBack` |
