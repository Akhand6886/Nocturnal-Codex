---
title: "Abstract Base Classes"
description: "abc module, @abstractmethod, and interface patterns"
---

## What are Abstract Base Classes (ABCs)?

In **Object-Oriented Programming (OOP)**, an **Abstract Base Class** is a class that cannot be instantiated. It's used as a formal blueprint (interface) for other classes to inherit from. It defines common methods that its subclasses *must* implement.

```python
from abc import ABC, abstractmethod

# Create an Abstract Base Class: Shape
class Shape(ABC):
    @abstractmethod
    def area(self):
        # Subclasses MUST implement this method!
        pass

# s = Shape() # ERROR: TypeError! (Cannot instantiate abstract class)
```

## Why Use ABCs?

1.  **Enforce Interface Consistency**: Ensures all subclasses share a common set of methods.
2.  **Early Error Detection**: If a subclass forgets to implement an `@abstractmethod`, Python will raise an error *when you try to create the object*, not when the method is eventually called.
3.  **Better Code Architecture**: Makes it clear to other developers how to extend your project.

## Creating Concrete Subclasses

A **concrete class** is a subclass that implements all required abstract methods.

```python
import math

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        # Implement the required method!
        return math.pi * (self.radius ** 2)

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

# Now we can create these!
c = Circle(5)
s = Square(10)
print(c.area(), s.area())
```

## Abstract Properties: `@property` + `@abstractmethod`

You can also require subclasses to provide certain attributes as properties.

```python
from abc import ABC, abstractmethod

class DBConnection(ABC):
    @property
    @abstractmethod
    def connection_string(self):
        pass

class MySQLConnection(DBConnection):
    @property
    def connection_string(self):
        return "mysql://localhost:3306/db"
```

## Virtual Subclasses: Registering Existing Classes

Python allows you to "register" a class as a subclass of an ABC even if it doesn't actually inherit from it. This is useful for third-party libraries.

```python
from abc import ABC

class Plugin(ABC):
    pass

class MyExtraPlugin:
    pass

# Register MyExtraPlugin as a "virtual" subclass!
Plugin.register(MyExtraPlugin)

# Now check inheritance!
print(issubclass(MyExtraPlugin, Plugin)) # True!
```

## Building Robust APIs: Type Checking

Because ABCs provide a formal interface, you can safely use them for type checking in your functions.

```python
def print_area(shape: Shape):
    # This function works for ANY Shape subclass (Circle, Square, etc.)
    # because it's guaranteed that any 'Shape' object has an .area() method!
    print(f"The area is: {shape.area():.2f}")

print_area(c) # Circle
print_area(s) # Square
```

## Summary

| Feature | Description |
| :--- | :--- |
| **ABC** | Any class inheriting from `abc.ABC` |
| **@abstractmethod** | Decorator for methods that MUST be overridden |
| **Instantiation** | Impossible for ABCs; raises TypeError! |
| **Registration** | Register virtual subclasses with `.register()` |
| **Interface** | Formally define behavior for a group of classes |
| **Best For** | Plugin systems, DB adapters, shape libraries |
| **Subclassing** | Subclassing an ABC requires implementing ALL abstract methods |
| **Virtual Subclass** | Classes that "fit the bill" without inheriting |
| **issubclass()** | Check if a class implements an ABC |
| **isinstance()** | Check if an object belongs to an ABC hierarchy |
