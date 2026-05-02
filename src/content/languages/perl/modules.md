---
title: "Modules"
description: "Using CPAN and organizing code into reusable libraries"
---

## What is a Module?

A **Module** in **Perl** is a package stored in a file with a **`.pm`** extension. Modules allow you to organize your code into reusable units that can be shared across multiple scripts.

## Using a Module

You include a module in your script using the **`use`** keyword.

```perl
use File::Basename;
my $name = basename("/path/to/file.txt");
```

## CPAN: The Power of Perl

Wait! The biggest strength of Perl is **CPAN** (Comprehensive Perl Archive Network). It is a massive library containing modules for everything from database access (DBI) to web scraping (LWP) and bioinformatics (BioPerl).

To install a module from CPAN, use the `cpanm` (CPAN Minus) command:
```bash
cpanm JSON
```

## Creating Your Own Module

A module file must end with a "true" value (usually **`1;`**) so that Perl knows it loaded successfully.

```perl
package MyUtils;
use strict;
use warnings;

sub hello {
    print "Hello from the module!\n";
}

1; # CRITICAL! Don't forget this.
```

## Summary

| Term | Description |
| :--- | :--- |
| **.pm** | The file extension for Perl Modules |
| **use** | Load a module at compile-time |
| **require** | Load a module at runtime |
| **CPAN** | The official public repository for Perl |
| **@INC** | The array of directories where Perl looks for modules |
| **Exporter** | A standard module for making your subroutines available to others |
| **Best For** | Code reuse and project organization |
| **Logic** | "Don't reinvent the wheel" |
| **Safety** | Namespaced functions prevent "Global Namespace" pollution |
| **Modern** | `cpanm` and `local::lib` make dependency management easy |
| **Standard** | Use `PascalCase` for module names |
| **Identity** | Perl was one of the first languages to have a central package repository |
