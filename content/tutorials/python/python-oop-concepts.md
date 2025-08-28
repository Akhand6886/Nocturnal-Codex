---
title: "Python OOP Concepts"
slug: "python-oop-concepts"
order: 20
description: "An introduction to the core concepts of Object-Oriented Programming (OOP) in Python, including classes, objects, inheritance, and polymorphism."
category: "Object-Oriented Programming (OOP)"
---

## What is Object-Oriented Programming (OOP)?

Object-Oriented Programming, or OOP, is a programming paradigm based on the concept of "objects." An object can be thought of as a self-contained entity that consists of both data (attributes) and code (methods) to manipulate that data.

OOP allows you to structure your programs in a way that models real-world things, making your code more organized, reusable, and easier to scale. The core principles of OOP are **classes**, **objects**, **inheritance**, and **polymorphism**.

-----

### **1. Classes and Objects**

This is the most fundamental concept in OOP.

  * **Class**: A class is a blueprint for creating objects. It defines a set of attributes and methods that the created objects will have. For example, you could have a `Car` class that defines that all cars must have a `color` and a `model`.

  * **Object**: An object is an instance of a class. It's the actual thing that is created from the blueprint. You can create many objects from a single class. For example, you could create a `red_mustang` object and a `blue_beetle` object, both of which are instances of the `Car` class.

```python
# This is the blueprint (the class)
class Car:
  # The __init__ method is a special method for creating and initializing an object
  def __init__(self, brand, model):
    self.brand = brand
    self.model = model

  def display_info(self):
    print(f"This is a {self.brand} {self.model}.")

# These are the actual instances (the objects)
car1 = Car("Ford", "Mustang")
car2 = Car("Volkswagen", "Beetle")

# Calling a method on an object
car1.display_info()
car2.display_info()
```

**Output:**

```text
This is a Ford Mustang.
This is a Volkswagen Beetle.
```

-----

### **2. Inheritance**

Inheritance is a mechanism that allows you to create a new class (the **child class**) that inherits the attributes and methods of an existing class (the **parent class**). This promotes code reuse.

```python
# The parent class
class Animal:
  def speak(self):
    print("Animal speaks")

# The child class 'Dog' inherits from 'Animal'
class Dog(Animal):
  def bark(self):
    print("Dog barks")

# The child class 'Cat' also inherits from 'Animal'
class Cat(Animal):
  def meow(self):
    print("Cat meows")

my_dog = Dog()
my_dog.speak() # Inherited from Animal
my_dog.bark()  # Specific to Dog
```

**Output:**

```text
Animal speaks
Dog barks
```

-----

### **3. Polymorphism**

Polymorphism, which means "many forms," allows us to use a single interface for different data types. In OOP, it means that child classes can have methods with the same name as the parent class, but with their own specific implementation.

```python
class Dog(Animal):
  # This 'speak' method overrides the one in the parent 'Animal' class
  def speak(self):
    print("Woof!")

class Cat(Animal):
  # This 'speak' method also overrides the parent's
  def speak(self):
    print("Meow!")

my_dog = Dog()
my_cat = Cat()

my_dog.speak() # Calls the Dog's version of speak()
my_cat.speak() # Calls the Cat's version of speak()
```

**Output:**

```text
Woof!
Meow!
```

Understanding these core concepts is the first step toward writing powerful, object-oriented programs in Python.