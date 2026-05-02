---
title: "Composer"
description: "Dependency management and autoloading for PHP"
---

## What is Composer?

**Composer** is the package manager for **PHP**. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you. It is similar to `npm` for Node.js or `pip` for Python.

```bash
composer require guzzlehttp/guzzle
```

## `composer.json`

The heart of every modern PHP project is the `composer.json` file. It lists your dependencies and configuration.

```json
{
    "require": {
        "monolog/monolog": "^2.0"
    }
}
```

## Autoloading

Wait! Before Composer, you had to manually `include` or `require` every single file in your project. This was a nightmare. 

Composer provides an **Autoloader** that automatically loads your classes whenever they are used.

```php
require 'vendor/autoload.php';

$log = new Monolog\Logger('name'); // Just works!
```

## Why use Composer?

1.  **Dependency Resolution**: If Library A needs Library B, Composer handles it automatically.
2.  **Versioning**: Lock your libraries to specific versions to prevent breaking changes.
3.  **Standardization**: Every modern PHP framework (Laravel, Symfony) uses Composer.
4.  **Scripts**: Run custom commands during the build process.

## Summary

| Term | Description |
| :--- | :--- |
| **vendor/** | The folder where all external libraries are installed |
| **composer.lock**| The file that ensures everyone on your team has the EXACT same versions |
| **Packagist** | The official public repository for PHP packages |
| **PSR-4** | The standard for mapping namespaces to file paths |
| **require** | Adding a new library to your project |
| **install** | Installing libraries from an existing lock file |
| **Logic** | "Don't reinvent the wheel; use community-trusted packages" |
| **Safety** | Lock files prevent "it works on my machine" bugs |
| **Modern** | Essential for professional PHP development |
| **Standard** | Use `composer.json` in every project, no matter how small |
| **Efficiency**| Only loads the classes you actually use |
