---
title: "Creating a Class in Python"
slug: "creating-a-class-in-python"
order: 21
description: "A practical, step-by-step guide to creating your first class in Python. Learn about the __init__ method, attributes, and instance methods."
category: "Object-Oriented Programming (OOP)"
---

## Defining a Class

Now that you understand the concepts of OOP, let's put them into practice. You can define a class using the `class` keyword, followed by the name of the class and a colon. By convention, class names in Python use `PascalCase`.

```python
class Dog:
  pass
```

This is the simplest possible class definition. It doesn't do anything yet, but it's a valid class.

-----

## The `__init__()` Method

Most classes need a way to initialize their state when an object is created. In Python, the `__init__()` method is a special method, often called a "constructor," that gets called automatically when you create a new instance of a class.

Its primary purpose is to set up the initial values for the object's attributes. The first parameter of `__init__()` is always `self`, which represents the instance of the class itself.

```python
class Dog:
  # This is the constructor
  def __init__(self, name, age):
    # These are attributes
    self.name = name
    self.age = age
    print(f"A new dog named {self.name} has been created!")

# Creating an instance (object) of the Dog class
my_dog = Dog("Buddy", 5)

# You can access the object's attributes using dot notation
print(f"{my_dog.name} is {my_dog.age} years old.")
```

**Output:**

```text
A new dog named Buddy has been created!
Buddy is 5 years old.
```

-----

## Instance Methods

Methods are functions that belong to a class. They define the behavior of the objects created from that class. Like `__init__()`, their first parameter is always `self`, which gives them access to the object's attributes and other methods.

Let's add a method to our `Dog` class.

```python
class Dog:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  # This is an instance method
  def bark(self):
    print(f"{self.name} says: Woof!")

  def get_older(self):
    self.age += 1
    print(f"{self.name} is now {self.age} years old.")

# Create an object
my_dog = Dog("Rex", 3)

# Call the instance methods
my_dog.bark()
my_dog.get_older()
```

**Output:**

```text
Rex says: Woof!
Rex is now 4 years old.
```

By creating classes, you can bundle data (attributes) and behavior (methods) together into a clean, organized, and reusable structure. This is the foundation of building powerful, object-oriented applications.