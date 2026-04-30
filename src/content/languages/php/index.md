---
id: php
name: PHP
slug: php
description: >-
  A widely-used server-side scripting language powering a large portion of the
  web, including WordPress.
iconName: php
year: 1995
creator: Rasmus Lerdorf
paradigm:
  - Object-Oriented
  - Procedural
  - Functional
useCases:
  - Web Development
  - CMS
  - E-Commerce
  - APIs
website: 'https://www.php.net/'
category: Web
featured: false
difficulty: Beginner
topics:
  - section: Basics
    items:
      - title: Introduction to PHP
        description: 'PHP tags, embedding in HTML, and server-side execution'
        slug: introduction-to-php
      - title: Variables & Types
        description: 'Dynamic typing, type juggling, strict_types, and constants'
        slug: variables-types
      - title: Strings & Arrays
        description: 'String functions, array functions, and array manipulation'
        slug: strings-arrays
      - title: Control Flow
        description: 'if/elseif, switch, match (8.0+), for, foreach, while'
        slug: control-flow
      - title: Functions
        description: 'Named and anonymous functions, closures, arrow functions (fn)'
        slug: functions
  - section: OOP
    items:
      - title: Classes & Objects
        description: 'Properties, methods, constructors, and access modifiers'
        slug: classes-objects
      - title: Interfaces & Traits
        description: 'Contracts, horizontal code reuse, and multiple trait use'
        slug: interfaces-traits
      - title: Modern PHP (8.x)
        description: 'Enums, readonly classes, fibers, and named arguments'
        slug: modern-php-8-x
      - title: Type System
        description: 'Union types, intersection types, and typed properties'
        slug: type-system
  - section: Web & Database
    items:
      - title: Forms & Sessions
        description: '$_GET, $_POST, sessions, cookies, and CSRF protection'
        slug: forms-sessions
      - title: PDO & Database
        description: 'Prepared statements, transactions, and database abstraction'
        slug: pdo-database
      - title: REST APIs
        description: 'JSON handling, request routing, and API design'
        slug: rest-apis
  - section: Frameworks & Ecosystem
    items:
      - title: Composer
        description: 'Dependency management, autoloading, and Packagist'
        slug: composer
      - title: Laravel
        description: 'Routing, Eloquent ORM, Blade templates, and middleware'
        slug: laravel
      - title: Testing
        description: 'PHPUnit, Pest, mocking, and code coverage'
        slug: testing
---

## Overview

PHP is a general-purpose scripting language especially suited to web development. It powers over 75% of websites whose server-side language is known, including WordPress, Wikipedia, and Facebook. Modern PHP (8.x) has evolved significantly with typed properties, match expressions, fibers, enums, and readonly classes.

## Key Features

- **Web-native** — Built specifically for server-side HTML generation
- **Modern type system** — Union types, intersection types, enums (PHP 8.x)
- **Composer** — Mature dependency manager with Packagist repository
- **Frameworks** — Laravel, Symfony, and many more
- **Massive deployment** — Runs on virtually any hosting provider

## Code Example

```php
<?php
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
