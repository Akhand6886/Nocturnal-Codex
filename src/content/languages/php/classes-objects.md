---
title: "Classes & Objects"
description: "Object-Oriented Programming, properties, and constructors in PHP"
---

## Object-Oriented PHP

Modern **PHP** is fully object-oriented. Classes are defined using the `class` keyword and objects are instantiated using `new`.

```php
class User {
    public string $name;

    public function __construct(string $name) {
        $this->name = $name;
    }

    public function greet(): string {
        return "Hello, " . $this->name;
    }
}

$user = new User("Alpha");
echo $user->greet();
```

Wait! Notice the **`->`** operator. This is how you access properties and methods in PHP (unlike the `.` used in Java or JS).

## Constructor Property Promotion (PHP 8+)

Wait! This is one of the best features of modern PHP. You can define and initialize properties directly in the constructor arguments.

```php
class User {
    public function __construct(
        public string $name,
        public int $age
    ) {}
}
```

This one line replaces all the boilerplate of declaring properties and assigning them in the constructor!

## Access Modifiers

-   **`public`**: Accessible from anywhere (Default).
-   **`protected`**: Accessible only within the class and its children.
-   **`private`**: Accessible only within the class itself.

## Static Members

Use the **`static`** keyword for properties and methods that belong to the class itself, not an instance. You access them using the **`::`** (Double Colon) operator.

```php
class Math {
    public static float $pi = 3.14;
}
echo Math::$pi;
```

## Summary

| Term | Description |
| :--- | :--- |
| **class** | The blueprint for an object |
| **$this** | Reference to the current object instance |
| **self::** | Reference to the current class (for static members) |
| **__construct**| The "Magic Method" called when an object is created |
| **readonly** | Property that can only be set once (PHP 8.1+) |
| **Best For** | Organizing complex logic into reusable components |
| **Logic** | Encapsulation: Grouping data and the code that uses it |
| **Safety** | Access modifiers prevent external code from breaking internal state |
| **Modern** | PHP 8 features make classes extremely concise |
| **Standard** | Use `PascalCase` for all class names |
| **Identity** | Objects are passed by reference in PHP |
| **Magic** | PHP has many "Magic Methods" (starting with `__`) like `__toString()` |
