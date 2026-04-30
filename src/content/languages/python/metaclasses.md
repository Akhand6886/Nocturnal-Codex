---
title: "Metaclasses"
description: "type(), __new__, __init_subclass__, and class creation hooks"
---

## What are Python Metaclasses?

In Python, **everything is an object**, including classes themselves! A **metaclass** is the blueprint used to create classes. If a class defines how an object is created, a metaclass defines how a **class** is created.

```python
# The built-in metaclass: type
class User: pass

# The class 'User' is an object created by 'type'!
print(type(User)) # <class 'type'>
```

## Creating Your Own Metaclass: `__new__`

By default, Python uses the **`type`** metaclass to build classes. To create a custom metaclass, you inherit from `type` and override the `__new__` method.

```python
# Create a custom metaclass: ForceUpperCase
class ForceUpperCase(type):
    def __new__(cls, name, bases, attrs):
        # Change all attribute names to UPPERCASE!
        uppercase_attrs = {k.upper(): v for k, v in attrs.items() if not k.startswith("__")}
        # Use the parent's __new__ to finish the class!
        return super().__new__(cls, name, bases, uppercase_attrs)

# To use it, you pass it to metaclass=...
class User(metaclass=ForceUpperCase):
    age = 25
    def greet(self): print("Hi")

u = User()
# print(u.age) # ERROR: AttributeError! (Modified to u.AGE)
print(u.AGE) # 25
u.GREET() # Hi
```

## The Modern Solution: `__init_subclass__` (Python 3.6+)

Metaclasses are often too complex and overkill for simple tasks (like registering plugins or validation). Most of the time, you should use **`__init_subclass__`** instead. It's a method you define in a parent class that is automatically called whenever a new subclass is created.

```python
class PluginBase:
    registry = []

    def __init_subclass__(cls, **kwargs):
        # Automatically register any subclass!
        super().__init_subclass__(**kwargs)
        PluginBase.registry.append(cls)
        print(f"Registered plugin: {cls.__name__}")

class MyPlugin(PluginBase): pass
# This prints: Registered plugin: MyPlugin! (No special logic needed!)
```

## Summary

| Term | Description |
| :--- | :--- |
| **type** | The default metaclass for all classes in Python |
| **metaclass=** | Keyword used to define a custom metaclass |
| **__new__** | Method where the class is physically created |
| **__init_subclass__**| The safer, modern way to hook into class creation |
| **Best For** | Plugin systems, DB Models (Django/SQLAlchemy), Validation |
| **Caution** | High complexity; use inheritance or decorators first! |
