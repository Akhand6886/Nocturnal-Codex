---
title: "Python Conditional Statements (if/elif/else)"
slug: "python-conditional-statements"
order: 11
description: "Learn how to control the flow of your programs with conditional statements. Master the use of if, elif, and else to make decisions in your code."
category: "Program Flow and Functions"
---

## Making Decisions in Code

Conditional statements allow a program to execute certain blocks of code only when a specific condition is met. This is the primary way that a program can make decisions and respond differently to different situations. The fundamental conditional statements in Python are `if`, `elif`, and `else`.

-----

### **The `if` Statement**

The `if` statement is the simplest form of a conditional statement. It executes a block of code only if its condition evaluates to `True`.

```python
age = 20

# This code will only run if the age is greater than 18
if age > 18:
  print("You are an adult.")
```

**Output:**

```text
You are an adult.
```

If the condition `age > 18` were `False`, the `print()` statement would be skipped entirely.

-----

### **The `else` Statement**

The `else` statement can be combined with an `if` statement. It provides a block of code to execute if the `if` condition is `False`.

```python
temperature = 15

if temperature > 25:
  print("It's a hot day!")
else:
  print("It's not a hot day.")
```

**Output:**

```text
It's not a hot day.
```

-----

### **The `elif` Statement**

`elif` is short for "else if." It allows you to check for multiple different conditions. You can have as many `elif` statements as you need.

```python
score = 85

if score >= 90:
  grade = "A"
elif score >= 80:
  grade = "B"
elif score >= 70:
  grade = "C"
else:
  grade = "D"

print("Your grade is:", grade)
```

**Output:**

```text
Your grade is: B
```

In this example, Python checks the conditions from top to bottom. As soon as it finds one that is `True` ( `score >= 80` ), it runs the corresponding code and skips the rest of the `elif` and `else` blocks.

-----

### **Short Hand `if` (Ternary Operator)**

If you have only one statement to execute, you can put it on the same line as the `if` statement.

```python
a = 10
b = 5
if a > b: print("a is greater than b")
```

You can also use a more compact syntax, known as the ternary operator, to write `if...else` statements in a single line.

```python
# A more compact way to write an if...else statement
message = "a is greater" if a > b else "b is greater"
print(message)
```

**Output:**

```text
a is greater
```

Conditional statements are the foundation of logic in programming, allowing you to create dynamic and responsive applications.