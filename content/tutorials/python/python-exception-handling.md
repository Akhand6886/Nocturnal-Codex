---
title: "Python Exception Handling (try/except)"
slug: "python-exception-handling"
order: 15
description: "Learn how to handle errors gracefully in Python using try and except blocks. Prevent your programs from crashing and provide better feedback to users."
category: "Intermediate Concepts"
---

## What is an Exception?

An exception is an error that occurs during the execution of a program. When an error occurs, Python would normally stop and generate an error message. These errors can be caused by anything from invalid user input to trying to divide by zero.

Exception handling allows you to "catch" these errors and execute a specific block of code to handle them, preventing your program from crashing. This is done using the `try` and `except` keywords.

-----

## The `try` and `except` Blocks

The basic idea of exception handling is to put risky code that might cause an error inside a `try` block, and the code that handles the error inside an `except` block.

### **Syntax**

```python
try:
  # Block of code to try
  # This might cause an exception
except:
  # Block of code to run if an exception occurs
```

### **Example: Handling a ZeroDivisionError**

Attempting to divide a number by zero is a common error that will crash a Python program. Here's how to handle it gracefully.

```python
try:
  result = 10 / 0
  print(result)
except ZeroDivisionError:
  # This block only runs if a ZeroDivisionError occurs
  print("Error: You cannot divide by zero!")

print("The program continued without crashing.")
```

**Output:**

```text
Error: You cannot divide by zero!
The program continued without crashing.
```

Without the `try...except` block, the program would have stopped at the division and the final print statement would never have been reached.

-----

## Handling Multiple Exceptions

You can define as many `except` blocks as you want, to handle different types of exceptions.

### **Example: Handling Invalid User Input**

```python
try:
  age = int(input("Enter your age: "))
  result = 100 / age
  print(f"100 divided by your age is: {result}")
except ValueError:
  # This runs if the user enters text instead of a number
  print("Invalid input. Please enter a valid number.")
except ZeroDivisionError:
  # This runs if the user enters 0
  print("Age cannot be zero for this calculation.")
```

-----

## The `else` and `finally` Blocks

You can also include optional `else` and `finally` blocks.

  * **`else`**: The `else` block lets you execute code that should run only if **no exceptions** were raised in the `try` block.
  * **`finally`**: The `finally` block lets you execute code **regardless of whether an exception occurred or not**. This is often used for cleanup actions, like closing a file.

```python
try:
  number = int(input("Enter a number: "))
except ValueError:
  print("That was not a valid number.")
else:
  # This will only run if the 'try' block was successful
  print(f"You entered the number {number}.")
finally:
  # This will always run
  print("Execution finished.")
```

Exception handling is a key part of writing robust, production-ready code that can handle unexpected situations without failing.