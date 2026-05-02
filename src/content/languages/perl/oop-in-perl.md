---
title: "OOP in Perl"
description: "Packages, bless, and the unique object-oriented system of Perl"
---

## Objects as Blessed References

**Perl**'s Object-Oriented system is very unique. An "Object" is simply a reference (usually a hash reference) that has been **"blessed"** into a specific **Package**.

## 1. The Package

A **Package** is a namespace that contains the methods for your class.

```perl
package User;

sub new {
    my ($class, $name) = @_;
    my $self = { name => $name }; # The object data
    return bless $self, $class;   # The magic "bless" keyword
}

sub greet {
    my $self = shift;
    print "Hello, " . $self->{name} . "!\n";
}
```

## 2. Instantiation

You create an object by calling the `new` method (or whatever name you gave your constructor).

```perl
my $user = User->new("Alpha");
$user->greet();
```

Wait! Notice the **`->`** syntax. When you call a method like this, Perl automatically passes the object (or class name) as the **first argument** to the subroutine.

## Inheritance

Inheritance in Perl is handled by the **`@ISA`** array, which tells Perl where else to look for a method if it isn't in the current package.

```perl
package Admin;
our @ISA = ("User"); # Admin inherits from User
```

## Modern OOP: Moose and Moo

Wait! Traditional Perl OOP is powerful but can be messy. Most modern Perl developers use **Moose** or **Moo**, which provide a much cleaner and more familiar "Class" syntax.

## Summary

| Term | Description |
| :--- | :--- |
| **package** | Keyword to define a namespace/class |
| **bless** | The keyword that turns a reference into an object |
| **$self** | Convention for the variable holding the object instance |
| **->** | The method call operator |
| **new** | The standard name for a constructor (by convention) |
| **Best For** | Building large, maintainable applications |
| **Logic** | "Objects are just data with a label" |
| **Safety** | Namespaces prevent subroutines from conflicting |
| **Modern** | Use `Moose` or `Moo` for professional development |
| **Standard** | Packages are usually stored in `.pm` files |
| **Identity** | Perl's OOP is "Opt-in" - it doesn't force you to use it |
