---
title: "Classes & Objects"
description: "class, __init__, self, attributes, and methods"
---

## What is Object-Oriented Programming (OOP)?

In **OOP**, we group data (attributes) and behavior (methods) into "objects". This makes code more modular, reusable, and organized. A **class** is a blueprint for creating objects.

```python
# Create a class: User
class User:
    pass

# Create an object (an "instance" of the class)
alice = User()
```

## The Anatomy of a Class: `__init__` and `self`

### 1. `__init__` (The Constructor)

This is a special method that is called automatically when you create a new object. It's used to initialize the object's initial data.

### 2. `self` (The Object Instance)

Wait! Every method must have `self` as the first argument. This represents the *specific instance* of the class that's currently being worked with.

```python
class User:
    def __init__(self, name, role):
        # Attribute assignment
        self.name = name
        self.role = role
        print(f"Created user: {self.name}")

    def greet(self):
        # Access attributes inside class
        print(f"Hi, I am {self.name}, and I am a {self.role}.")

# Create a user!
alice = User("Alice", "Admin")
# Call a method
alice.greet() # Hi, I am Alice, and I am a Admin.
```

## Instance vs Class Attributes

### Instance Attributes

Created inside `__init__`, these belong to a **specific object**. Every user has their own unique `name`.

### Class Attributes

Defined outside all methods, these belong to the **class itself** and are shared by all its objects.

```python
class Employee:
    # Class attribute (shared!)
    company_name = "Nocturnal Codex"

    def __init__(self, name):
        # Instance attribute (unique!)
        self.name = name

# Both share the same company
emp1 = Employee("Alice")
emp2 = Employee("Bob")
print(emp1.company_name) # Nocturnal Codex
```

## Methods: Instance, Class, and Static

-   **Instance Methods**: Take `self` as the first argument. Accesses and modifies object-level data.
-   **Class Methods**: Take `cls` as the first argument. Accesses and modifies class-level data.
-   **Static Methods**: Take no special arguments. Just regular functions that happen to live inside a class.

```python
class Dog:
    species = "Canine"

    def __init__(self, name):
        self.name = name

    # Instance method
    def bark(self):
        print(f"{self.name} is barking!")

    # Class method
    @classmethod
    def get_species(cls):
        return cls.species

    # Static method
    @staticmethod
    def is_mammal():
        return True

my_dog = Dog("Buddy")
my_dog.bark()
print(Dog.get_species()) # Canine
```

## Encapsulation: Private Attributes?

Python doesn't have true `private` or `protected` keywords. However, we use a single underscore `_` to indicate that an attribute is intended for internal use only.

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # "Protected" (don't access from outside!)

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
```

> **Pro Tip**: Use double underscores `__` for name mangling to prevent accidental overriding in subclasses.

## Summary

| Term | Description |
| :--- | :--- |
| **Class** | The blueprint/template |
| **Object** | The actual data/"instance" |
| **__init__** | The constructor method |
| **self** | Reference to the current object |
| **Attribute** | Variable belonging to class/object |
| **Method** | Function belonging to class/object |
| **Encapsulation** | Hiding internal details (`_attribute`) |
| **Best For** | Modeling real-world objects, managing complex state |
| **Class Attribute** | Shared across all instances (`cls.attribute`) |
