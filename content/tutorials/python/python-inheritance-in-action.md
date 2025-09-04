---
title: "Inheritance in Action"
slug: "python-inheritance-in-action"
order: 22
description: "See Python's inheritance in action with a practical example. Learn how to create child classes that inherit from a parent class and override methods."
category: "Object-Oriented Programming (OOP)"
---

## What is Inheritance?

Inheritance is one of the pillars of Object-Oriented Programming. It allows us to define a new class that inherits all the methods and properties from another class.

  * **Parent Class** (also known as a base class) is the class being inherited from.
  * **Child Class** (also known as a derived class) is the class that inherits from another class.

This promotes code reusability, as you can create a general parent class and then create more specific child classes without rewriting the common code.

-----

## Creating a Parent Class

Let's start by creating a general `Person` class. This class will have attributes and methods that are common to any person.

```python
class Person:
  def __init__(self, first_name, last_name):
    self.first_name = first_name
    self.last_name = last_name

  def display_name(self):
    print(f"Name: {self.first_name} {self.last_name}")

# Create an object of the Person class
person1 = Person("John", "Doe")
person1.display_name()
```

**Output:**

```text
Name: John Doe
```

-----

## Creating a Child Class

Now, let's create a more specific `Student` class that inherits from `Person`. A student is a person, so they will have a first and last name, but they will also have additional properties, like a graduation year.

To create a child class, you pass the parent class as an argument to the child class definition.

```python
# The Student class inherits from the Person class
class Student(Person):
  # The __init__ method for the child class
  def __init__(self, first_name, last_name, graduation_year):
    # Call the parent's __init__ method to handle first_name and last_name
    super().__init__(first_name, last_name)
    # Add the new attribute specific to the Student class
    self.graduation_year = graduation_year

  def welcome(self):
    print(f"Welcome {self.first_name}! Your graduation year is {self.graduation_year}.")

# Create an object of the Student class
student1 = Student("Jane", "Doe", 2026)

# We can call methods from both the child and parent classes
student1.display_name() # Method inherited from Person
student1.welcome()      # Method specific to Student
```

**Output:**

```text
Name: Jane Doe
Welcome Jane! Your graduation year is 2026.
```

### **The `super()` Function**

The `super()` function is used to give the child class access to the methods and properties of its parent. In the example above, `super().__init__(first_name, last_name)` calls the `__init__` method of the `Person` class, allowing us to reuse its logic without rewriting it.

Inheritance is a powerful tool for building logical, hierarchical relationships between your classes and keeping your code organized and DRY (Don't Repeat Yourself).