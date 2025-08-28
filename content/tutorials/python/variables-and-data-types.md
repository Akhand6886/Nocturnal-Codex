---
title: "Python Variables and Data Types"
slug: "variables-and-data-types"
order: 3
description: "Learn how to store information in variables and understand Python's fundamental data types, including integers, floats, strings, and booleans."
category: "Getting Started"
---

## What is a Variable?

In Python, a variable is a container for storing a value. Think of it as a label that you can assign to a piece of information. Unlike other programming languages, you don't need to declare the type of a variable beforehand; Python automatically determines the type when you assign a value to it.

```python
# Assigning a value to a variable
message = "Hello, Nocturnal Codex!"
age = 25
pi = 3.14

# You can print the values by referring to their variable names
print(message)
print(age)
```

**Output:**

```text
Hello, Nocturnal Codex!
25
```

You can also change the value of a variable at any time:

```python
x = 10
print(x)  # Output: 10

x = 20
print(x)  # Output: 20
```

---

## What are Data Types?

Data types are a way to classify different types of data, such as numbers, text, and true/false values. Python has several built-in data types, and understanding them is fundamental to programming.

### **Numeric Types**

These represent numbers. The two main numeric types are:

  * **Integer (`int`)**: Whole numbers, both positive and negative, without decimals.
    ```python
    my_integer = 100
    negative_integer = -50
    ```
  * **Float (`float`)**: Numbers that contain a decimal point.
    ```python
    my_float = 20.5
    pi_value = 3.14159
    ```

### **Text Type**

  * **String (`str`)**: A sequence of characters, enclosed in single (`'`) or double (`"`) quotes.
    ```python
    greeting = "Hello Python"
    user_name = 'nocturnal_codex'
    ```

### **Boolean Type**

  * **Boolean (`bool`)**: Represents one of two values: `True` or `False`. These are crucial for conditional logic.
    ```python
    is_active = True
    is_admin = False
    ```

---

## Checking the Data Type

You can find out the data type of any variable by using the built-in `type()` function. This is very useful for debugging your code.

```python
# Example variables
name = "Alice"
age = 30
height = 5.9
is_student = True

# Checking their types
print(type(name))
print(type(age))
print(type(height))
print(type(is_student))
```

**Output:**

```text
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
```

---

## Type Casting

Sometimes you need to convert a variable from one data type to another. This is called type casting.

```python
# Casting from integer to string
num = 123
num_string = str(num) # num_string is now "123"

# Casting from string to integer
num_text = "456"
num_integer = int(num_text) # num_integer is now 456

# Casting from float to integer (note: this truncates the decimal)
pi = 3.14
pi_integer = int(pi) # pi_integer is now 3
```

Understanding how to store data in variables and the different types that data can take is the first major step in your Python journey.