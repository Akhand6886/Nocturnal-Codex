---
title: "Encapsulation"
description: "Data hiding with private, public, and getter/setter methods"
---

## What is Encapsulation?

**Encapsulation** is the most important rule of Object-Oriented Programming (OOP) in **Java**. It's the process of bundling an object's data (fields) and the methods that use that data into a single unit (a class) and **hiding the internal data** from the outside world.

Think of it like a protective capsule around your data!

```java
public class User {
    // 1. HIDDEN data! (private)
    private String name; 

    // 2. PUBLIC interface! (Methods)
    public void setName(String name) {
        this.name = name;
    }
}
```

## Why Encapsulate?

Wait! Why not just make the `name` field public and let anyone change it?

1.  **Safety**: You can control what data is allowed. (e.g., "Age cannot be negative!").
2.  **Flexibility**: You can change your internal code WITHOUT breaking everyone else's code.
3.  **Security**: Prevent accidental modification of critical data.

## Access Modifiers: Who Can See What?

| Modifier | Class | Package | Subclass | World |
| :--- | :--- | :--- | :--- | :--- |
| **public** | Yes | Yes | Yes | **Yes** |
| **protected**| Yes | Yes | **Yes** | No |
| **(default)** | Yes | **Yes** | No | No |
| **private** | **Yes** | No | No | No |

## Getters and Setters

To allow "controlled" access to your private data, you use **Getter** and **Setter** methods. Use your IDE's "Generate" tool to create these automatically!

```java
public class BankAccount {
    private double balance = 100.0;

    // A Getter!
    public double getBalance() {
        return balance;
    }

    // A Setter (with logic!)
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **Encapsulate**| Bundle data and behavior together |
| **Private** | Hidden from everyone else |
| **Public** | Accessible to the whole program |
| **Getter** | Public method to READ private data |
| **Setter** | Public method to MODIFY private data safely |
| **Best For** | Protecting your objects, building flexible APIs |
| **Hide** | Avoid giving "Wild West" access to your variables! |
| **logic** | Put validation rules inside your setters! |
| **Clean** | Your class becomes a "Black Box" (Logic stays hidden!) |
| **Maintain** | Change internal logic without affecting users |
| **ReadOnly** | Provide ONLY a getter (The data is "immutable" to outsiders) |
| **WriteOnly**| Provide ONLY a setter (Used for passwords or encryption!) |
| **Security** | Prevents other parts of code from corrupting your data |
| **Standard** | Core principle used by all Java Frameworks (Spring, etc.) |
| **Interface** | The public methods are the object's "interface" |
| **Modular** | Objects act like independent, self-contained units |
| **Debugging** | Much easier to find bugs when data changes happen in ONE place |
| **Naming** | Convention: `setMyField`, `getMyField` |
| **Refactor** | Makes code much easier to update and improve over time |
| **Modern** | "Records" (Java 14+) provide auto-encapsulated data storage! |
