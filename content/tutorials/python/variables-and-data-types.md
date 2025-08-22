---
title: "Python Variables and Data Types"
slug: "python-variables-data-types"
order: 2
description: "Master Python variables and data types including numbers, strings, booleans, and collections with comprehensive examples."
category: "Fundamentals"
---

## Python Variables and Data Types

Variables and data types are fundamental concepts in Python programming. A variable is a container that stores data values, while data types define what kind of data can be stored and manipulated in a program. Python's dynamic typing system makes working with variables intuitive and flexible.

## Understanding Variables

A variable in Python is like a label attached to a value. You can think of it as a named storage location in computer memory that holds data.

### **Creating Variables**

```python
# Simple variable assignment
name = "Alice"
age = 25
height = 5.6
is_student = True

print(name)
print(age)
print(height)
print(is_student)
```

### **Multiple Assignment**

```python
# Assign same value to multiple variables
x = y = z = 10

# Assign different values to multiple variables
a, b, c = 1, 2, 3
name, age, city = "John", 30, "New York"

print(f"x={x}, y={y}, z={z}")
print(f"a={a}, b={b}, c={c}")
```

### **Variable Naming Rules**
- Must start with a letter (a-z, A-Z) or underscore (_)
- Can contain letters, numbers, and underscores
- Case-sensitive (age and Age are different)
- Cannot use Python keywords

```python
# Valid variable names
first_name = "John"
user_age = 25
_private_var = "secret"
var2 = "valid"

# Invalid variable names (will cause errors)
# 2name = "Invalid"      # Starts with number
# first-name = "Invalid" # Contains hyphen
# class = "Invalid"      # Uses Python keyword
```

## Python Data Types Overview

Python has several built-in data types organized into categories:

### **1. Numeric Types**
- `int`: Integer numbers
- `float`: Floating-point numbers  
- `complex`: Complex numbers

### **2. Text Type**
- `str`: String (text data)

### **3. Boolean Type**
- `bool`: True/False values

### **4. Sequence Types**
- `list`: Ordered, mutable collection
- `tuple`: Ordered, immutable collection
- `range`: Sequence of numbers

### **5. Mapping Type**
- `dict`: Key-value pairs

### **6. Set Types**
- `set`: Unordered collection of unique items
- `frozenset`: Immutable set

## Numeric Data Types

### **Integers (int)**
Whole numbers without decimal points:
```python
positive_int = 42
negative_int = -17
zero = 0
large_number = 123456789012345

print(type(positive_int))

# Integer operations
result = 10 + 5
result = 20 - 8
result = 6 * 7
result = 15 // 4 # floor division
result = 2 ** 3 # exponentiation
```

### **Floating Point Numbers (float)**
Numbers with decimal points:
```python
pi = 3.14159
temperature = -2.5
scientific = 1.5e-4 # Scientific notation (0.00015)
infinity = float('inf')

print(type(pi))

# Float operations
result = 10.5 + 2.3
result = 15.0 / 4
result = round(3.14159, 2)
```

### **Complex Numbers (complex)**
Numbers with real and imaginary parts:
```python
complex_num1 = 3 + 4j
complex_num2 = complex(2, 5) # 2 + 5j

print(complex_num1.real)
print(complex_num1.imag)

# Complex operations
result = (3 + 4j) + (1 + 2j)
```

## String Data Type

Strings represent text data and are enclosed in quotes:
```python
# Different ways to create strings
single_quote = 'Hello'
double_quote = "World"
triple_quote = """This is a
multiline string"""

# String concatenation
full_name = "John" + " " + "Doe"
greeting = "Hello, " + full_name

# String repetition
repeated = "Python " * 3

# String indexing and slicing
text = "Python"
print(text[0])
print(text[-1])
print(text[0:3])
```

### **String Methods**
```python
message = " Hello, Python! "

print(message.upper())
print(message.lower())
print(message.strip())
print(message.replace("Python", "World"))
print(len(message))
```

## Boolean Data Type

Boolean values represent True or False:
```python
is_python_fun = True
is_difficult = False

# Boolean from comparisons
age = 25
is_adult = age >= 18
is_teenager = 13 <= age <= 19

# Boolean operations
result = True and False
result = True or False
result = not True
```

## Collection Data Types

### **Lists**
Ordered, mutable collections:
```python
# Creating lists
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3]
mixed = ["text", 42, True, 3.14]

# Accessing elements
print(fruits[0])
print(fruits[-1])

# Modifying lists
fruits.append("grape")
fruits[0] = "blueberry"
del fruits[1]

print(fruits)
```

### **Tuples**
Ordered, immutable collections:
```python
# Creating tuples
coordinates = (10, 20)
colors = ("red", "green", "blue")
single_item = (42,) # Note the comma for single item

# Accessing elements
print(coordinates[0])

# Tuples are immutable
# coordinates[0] = 15 # This would cause an error
```

### **Dictionaries**
Key-value pairs:
```python
# Creating dictionaries
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Accessing values
print(person["name"])
print(person.get("age"))

# Modifying dictionaries
person["email"] = "alice@email.com"
person["age"] = 26

print(person.keys())
print(person.values())
```

### **Sets**
Unordered collections of unique elements:
```python
# Creating sets
unique_numbers = {1, 2, 3, 4, 5, 5} # The duplicate 5 is ignored
fruits_set = {"apple", "banana", "orange"}

# Set operations
numbers1 = {1, 2, 3, 4}
numbers2 = {3, 4, 5, 6}

union = numbers1 | numbers2
intersection = numbers1 & numbers2
difference = numbers1 - numbers2
```

## Type Checking and Conversion

### **Checking Types**
```python
value = 42
print(type(value))
print(isinstance(value, int))
print(isinstance(value, str))
```

### **Type Conversion**
```python
# Converting between types
number_str = "123"
number_int = int(number_str)
number_float = float(number_str)

# Converting numbers to strings
age = 25
age_str = str(age)

# Converting to boolean
print(bool(1))
print(bool(0))
print(bool(""))
print(bool("text"))
```

## Dynamic Typing in Action

Python determines variable types automatically:
```python
# Variable can hold different types
var = 42
print(type(var))

var = "Hello"
print(type(var))

var = [1, 2, 3]
print(type(var))
```

## Best Practices

1. **Use descriptive variable names**
```python
# Good
user_age = 25
total_price = 99.99

# Avoid
x = 25
p = 99.99
```

2. **Follow naming conventions**
```python
# Variables and functions: snake_case
first_name = "John"
def calculate_total(x, y): return x + y

# Constants: UPPER_CASE
MAX_USERS = 100
PI = 3.14159
```

3. **Choose appropriate data types**
```python
# Use tuple for coordinates (immutable)
point = (10, 20)

# Use list for shopping cart (mutable)
cart_items = ["apple", "banana", "milk"]

# Use dictionary for structured data
user_profile = {"name": "Alice", "age": 25}
```

Understanding variables and data types is crucial for Python programming. These concepts form the foundation for more complex operations and data structures you'll learn in upcoming tutorials.
