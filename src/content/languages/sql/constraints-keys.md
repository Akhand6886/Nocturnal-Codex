---
title: "Constraints & Keys"
description: "Ensuring data integrity and defining relationships"
---

## What are Constraints?

**Constraints** are rules applied to columns in a table. They prevent invalid data from being entered, ensuring the accuracy and reliability of your database.

## 1. Primary Key (PK)
A **Primary Key** uniquely identifies each row in a table. It must contain unique values and cannot be `NULL`.

```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50)
);
```

## 2. Foreign Key (FK)
A **Foreign Key** is a column that references the Primary Key of another table. It defines the relationship between tables (e.g., one-to-many).

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

## 3. Core Constraints

| Constraint | Description |
| :--- | :--- |
| **NOT NULL** | Ensures that a column cannot have a `NULL` value. |
| **UNIQUE** | Ensures that all values in a column are different. |
| **CHECK** | Ensures that the values in a column satisfy a specific condition (e.g., `age >= 18`). |
| **DEFAULT** | Sets a default value for a column if no value is specified. |

### Example with multiple constraints:

```sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(20) UNIQUE,
    price DECIMAL(10,2) CHECK (price > 0),
    stock INT DEFAULT 0
);
```

---

## Data Integrity Rules

1.  **Entity Integrity**: Every table must have a Primary Key.
2.  **Referential Integrity**: Every Foreign Key value must exist as a Primary Key in the parent table. 
3.  **Domain Integrity**: Data must match the defined data types and constraints (e.g., a "date" column must contain a date).

## Summary Checklist
- [x] Constraints enforce "Business Rules" at the database level.
- [x] **Primary Keys** must be unique and non-null.
- [x] **Foreign Keys** link tables together.
- [x] Use **CHECK** constraints to prevent invalid values (like negative prices).
- [x] Constraints are safer than enforcing rules only in application code!
