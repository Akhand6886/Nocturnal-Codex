---
title: "Python User Input and Output"
slug: "user-input-and-output"
order: 4
description: "Learn how to make your Python programs interactive by accepting input from a user and displaying information back to them."
category: "Getting Started"
---

## Displaying Output with `print()`

The most common way to display information from a Python program is by using the built-in `print()` function. You can pass it a string, a variable, or a combination of both.

```python
# Printing a simple string
print("Welcome to the Nocturnal Codex!")

# Printing the value of a variable
language = "Python"
print(language)

# You can also print multiple items, separated by commas
name = "Alice"
age = 30
print("User:", name, "Age:", age)
```

**Output:**

```text
Welcome to the Nocturnal Codex!
Python
User: Alice Age: 30
```

By default, `print()` adds a newline character at the end of the output.

-----

## Getting Input from a User with `input()`

To make your programs interactive, you need a way to get input from the user. Python's `input()` function does exactly that. It prompts the user to enter some text and then returns that text as a string.

```python
# Ask the user for their name
name = input("Please enter your name: ")

# Greet the user with their name
print("Hello, " + name + "!")
```

**How it works:**

1.  The program will display the message "Please enter your name: ".
2.  It will then pause and wait for the user to type something and press Enter.
3.  Whatever the user types is stored as a string in the `name` variable.
4.  The final line prints a personalized greeting.

### **Important: `input()` Always Returns a String**

A crucial point to remember is that the `input()` function *always* returns the user's input as a string, even if they type a number.

```python
age_text = input("Enter your age: ")
print(type(age_text)) # This will show <class 'str'>
```

If you need to perform mathematical calculations with the user's input, you must first cast it to a numeric type (like `int` or `float`).

### **Example: A Simple Age Calculator**

Here's a program that asks for the user's birth year and calculates their approximate age.

```python
# Get the birth year as a string
birth_year_str = input("What year were you born? ")

# Convert the string to an integer
birth_year = int(birth_year_str)

# Calculate the approximate age
current_year = 2024
age = current_year - birth_year

# Display the result
print("You are approximately", age, "years old.")
```

By combining `print()` and `input()`, you can start to build powerful and interactive applications that communicate with your users.