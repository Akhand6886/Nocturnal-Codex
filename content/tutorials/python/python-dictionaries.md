---
title: "Python Dictionaries"
slug: "python-dictionaries"
order: 9
description: "Dive into Python dictionaries, a powerful data structure for storing data in key-value pairs. Learn to create, access, modify, and loop through dictionaries."
category: "Core Data Structures"
---

## What is a Dictionary?

A dictionary in Python is a collection of key-value pairs. It's an unordered, mutable (changeable), and indexed collection. Dictionaries are written with curly braces `{}`, and they have keys and values.

Each key is separated from its value by a colon `:`, and the items are separated by commas.

```python
# A simple dictionary
car = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}

print(car)
```

**Output:**

```text
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
```

The "keys" (`"brand"`, `"model"`, `"year"`) must be of an immutable type (like strings, numbers, or tuples) and must be unique within a dictionary. The "values" can be of any data type and can be duplicated.

-----

## Accessing Dictionary Items

You can access the value of an item by referring to its key name, inside square brackets `[]`.

```python
# Get the value of the "model" key
model_name = car["model"]
print(model_name)
```

**Output:**

```text
Mustang
```

You can also use the `get()` method, which has the advantage of not causing an error if the key doesn't exist.

```python
year = car.get("year")
print(year) # Output: 1964

color = car.get("color")
print(color) # Output: None (no error)
```

-----

## Modifying Dictionaries

Since dictionaries are mutable, you can change their content.

### **Changing a Value**

You can change the value of a specific item by referring to its key:

```python
car["year"] = 2024
print(car)
```

**Output:**

```text
{'brand': 'Ford', 'model': 'Mustang', 'year': 2024}
```

### **Adding Items**

You can add a new item to the dictionary by using a new key and assigning a value to it:

```python
car["color"] = "red"
print(car)
```

**Output:**

```text
{'brand': 'Ford', 'model': 'Mustang', 'year': 2024, 'color': 'red'}
```

### **Removing Items**

  * **`pop()`**: Removes the item with the specified key name.
    ```python
    car.pop("model")
    print(car) # Output: {'brand': 'Ford', 'year': 2024, 'color': 'red'}
    ```
  * **`del`**: The `del` keyword can also be used to remove an item with a specified key.
    ```python
    del car["year"]
    print(car) # Output: {'brand': 'Ford', 'color': 'red'}
    ```

-----

## Looping Through a Dictionary

You can loop through a dictionary using a `for` loop.

```python
# Print all key names in the dictionary
for key in car:
  print(key)

# Print all values in the dictionary
for value in car.values():
  print(value)

# Loop through both keys and values
for key, value in car.items():
  print(key, ":", value)
```

Dictionaries are incredibly useful for storing data that is related, like the properties of an object or a user's profile information.