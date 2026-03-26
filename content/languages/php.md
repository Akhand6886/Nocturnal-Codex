---
id: "php"
name: "PHP"
slug: "php"
description: "A widely-used server-side scripting language powering a large portion of the web, including WordPress."
iconName: "php"
year: 1995
creator: "Rasmus Lerdorf"
paradigm: ["Object-Oriented", "Procedural", "Functional"]
useCases: ["Web Development", "CMS", "E-Commerce", "APIs"]
website: "https://www.php.net/"
category: "Web"
featured: false
difficulty: "Beginner"
---

## Overview

PHP is a general-purpose scripting language especially suited to web development. It powers over 75% of websites whose server-side language is known, including WordPress, Wikipedia, and Facebook (early versions). Modern PHP (8.x) has evolved significantly with typed properties, match expressions, fibers, enums, and readonly classes, making it a capable language for enterprise applications.

## Key Features

- **Web-native** — Built specifically for server-side HTML generation
- **Modern type system** — Union types, intersection types, enums (PHP 8.x)
- **Composer** — Mature dependency manager with Packagist repository
- **Frameworks** — Laravel, Symfony, and many more
- **Massive deployment** — Runs on virtually any hosting provider

## Code Example

```php
<?php
// Modern PHP 8.x features
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';
}

readonly class User {
    public function __construct(
        public string $name,
        public string $email,
        public Status $status = Status::Active,
    ) {}
}

$user = new User('Alice', 'alice@example.com');
echo match($user->status) {
    Status::Active => "Welcome, {$user->name}!",
    Status::Inactive => "Account disabled.",
};
```

## Learning Resources

- [PHP Official Documentation](https://www.php.net/docs.php)
- [Laravel Documentation](https://laravel.com/docs)
- [PHP: The Right Way](https://phptherightway.com/)
