---
title: "JDBC & JPA/Hibernate"
description: "Connecting Java applications to relational databases and using Object-Relational Mapping (ORM) for data persistence."
---

## Introduction to Data Persistence

Data persistence is the ability of an application to save its state to a permanent storage system (like a database) so that it can be retrieved later, even after the application has been restarted.

### 1. JDBC: The Foundation
Java Database Connectivity (JDBC) is the low-level API for connecting to databases.
- **DriverManager**: Manages the set of DB drivers.
- **Connection**: Represents a session with a specific database.
- **Statement & PreparedStatement**: Used to execute SQL queries. *Always use PreparedStatement to prevent SQL injection.*
- **ResultSet**: A table of data representing a database result set.

```java
try (Connection conn = DriverManager.getConnection(url, user, password)) {
    String sql = "SELECT * FROM users WHERE id = ?";
    try (PreparedStatement stmt = conn.prepareStatement(sql)) {
        stmt.setInt(1, 101);
        ResultSet rs = stmt.executeQuery();
        while (rs.next()) {
            System.out.println(rs.getString("username"));
        }
    }
}
```

---

## ORM and JPA

Object-Relational Mapping (ORM) is a technique for converting data between relational databases and object-oriented programming languages.

### 1. Java Persistence API (JPA)
JPA is a specification (a set of interfaces) for ORM in Java.
- **EntityManager**: The primary interface for interacting with the persistence context.
- **Entity**: A lightweight, persistent domain object (a POJO annotated with `@Entity`).

### 2. Hibernate: The Popular Implementation
Hibernate is the most widely used implementation of JPA.
- **Automated Mapping**: Automatically generates SQL to create tables and manage relationships (`@OneToMany`, `@ManyToOne`).
- **Caching**: Provides first-level and second-level caching to improve performance.
- **HQL (Hibernate Query Language)**: An object-oriented version of SQL.

### 3. Spring Data JPA
A higher-level abstraction built on top of JPA that significantly reduces boilerplate.
- **Repositories**: You only need to define an interface extending `JpaRepository`, and Spring generates the implementation at runtime.

```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    // getters and setters
}

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsername(String username);
}
```
