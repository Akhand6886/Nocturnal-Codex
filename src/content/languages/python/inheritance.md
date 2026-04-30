---
title: "Inheritance"
description: "Single, multiple, MRO, super(), and mixins"
---

## What is Inheritance in Python?

**Inheritance** allows one class (the **subclass** or **child**) to derive attributes and methods from another class (the **superclass** or **parent**). This is fundamental for building hierarchical relationships and promoting code reuse.

```python
# Create a parent class: User
class User:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hi, I'm {self.name}!")

# Create a subclass: Admin
class Admin(User):
    # Inherits all methods and attributes of User
    def delete_user(self, user):
        print(f"Deleting user: {user.name}")

# Create objects
alice = User("Alice")
bob = Admin("Bob")

alice.greet()
bob.greet() # Admin inherited this from User!
bob.delete_user(alice)
```

## Overriding Methods: Customizing Behavior

A subclass can define its own version of a method that also exists in the parent class. This is called **method overriding**.

```python
class Bird:
    def speak(self):
        print("Chirp!")

class Owl(Bird):
    # Overrides the speak() method
    def speak(self):
        print("Hoo-Hoo!")

o = Owl()
o.speak() # Hoo-Hoo!
```

## Using `super()`: Accessing parents

You often want to *extend* a parent method rather than completely replacing it. Use the `super()` function to call methods from the superclass.

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class Developer(Employee):
    def __init__(self, name, salary, language):
        # Call the parent's __init__ first!
        super().__init__(name, salary)
        # Add a new attribute for Developer!
        self.language = language

dev = Developer("Alpha", 100000, "Python")
print(f"{dev.name} uses {dev.language}")
```

## Multiple Inheritance: Why Python is Powerful

Python (unlike Java or C#) allows a single subclass to inherit from **multiple** parent classes.

```python
class Flyer:
    def fly(self): print("Flying...")

class Swimmer:
    def swim(self): print("Swimming...")

class Duck(Flyer, Swimmer):
    pass

d = Duck()
d.fly()
d.swim()
```

## Method Resolution Order (MRO)

Wait! If multiple parents have the same method, which one does Python pick? Python uses an algorithm called **C3 Linearization** to determine the search order. You can view it using `__mro__`.

```python
# Check inheritance order!
print(Duck.__mro__)
# (<class 'Duck'>, <class 'Flyer'>, <class 'Swimmer'>, <class 'object'>)
```

## Mixins: Specialized Inheritance

A **Mixin** is a small, specialized class that provides specific functionality but isn't intended to exist as a standalone object. They are often combined with other classes using multiple inheritance.

```python
class LoggerMixin:
    def log(self, message):
        print(f"[LOG]: {message}")

class UserProfile(LoggerMixin):
    def update_profile(self):
        self.log("Profile updated!")

user = UserProfile()
user.update_profile()
```

## Summary

| Term | Description |
| :--- | :--- |
| **Superclass** | The parent class |
| **Subclass** | The child class |
| **Overriding** | Child defining its own version of parent method |
| **super()** | Access parent methods and constructor |
| **MRO** | The search order for methods in multiple inheritance |
| **Mixin** | Class to "mix in" specific behavior |
| **Best For** | Code reuse, building hierarchical relationships |
| **Object** | The ultimate base class for all Python classes |
