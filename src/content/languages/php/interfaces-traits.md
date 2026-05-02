---
title: "Interfaces & Traits"
description: "Abstract contracts and horizontal code reuse in PHP"
---

## Interfaces

An **Interface** defines a contract that a class MUST follow. It contains only method signatures and no implementation.

```php
interface Logger {
    public function log(string $message): void;
}

class FileLogger implements Logger {
    public function log(string $message): void {
        // ... save to file ...
    }
}
```

Wait! A class can implement **multiple interfaces** at the same time.

## Traits

**Traits** are a mechanism for code reuse in single-inheritance languages like **PHP**. They allow you to "mix in" methods into a class without using inheritance. This is perfect for shared functionality like "Logging" or "Soft Deletes."

```php
trait Sharable {
    public function share(): void {
        echo "Sharing...";
    }
}

class Post {
    use Sharable; // The 'share' method is now available here!
}
```

## Why use Traits?

Wait! Inheritance is a "Vertical" relationship (A Post **is a** Content). Traits are a "Horizontal" relationship (A Post **can be** Sharable, and a User **can also be** Sharable).

## Abstract Classes

An **Abstract Class** is a class that cannot be instantiated and can contain both implemented methods and abstract methods (like an interface).

```php
abstract class Database {
    abstract public function connect(): void;

    public function logQuery(string $sql) {
        // Implementation here!
    }
}
```

## Summary

| Term | Description |
| :--- | :--- |
| **interface** | A pure contract with no logic |
| **implements** | Keyword to use an interface |
| **trait** | Reusable block of methods |
| **use** | Keyword to include a trait in a class |
| **abstract** | Class that must be inherited to be used |
| **Polymorph.** | Using interfaces to treat different objects as the same type |
| **Best For** | Decoupling code and avoiding "Deep Inheritance" |
| **Logic** | "Composition over Inheritance" |
| **Safety** | Interfaces ensure that objects follow the rules |
| **Modern** | PHP frameworks (like Laravel) rely heavily on Traits |
| **Standard** | Use `PascalCase` for Interfaces and Traits |
| **Identity** | Traits don't have their own type; they belong to the class |
