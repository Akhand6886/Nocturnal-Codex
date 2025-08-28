---
title: "Python Loops (for and while)"
slug: "python-loops"
order: 12
description: "Learn how to perform repetitive tasks in Python using for and while loops. Understand how to iterate over sequences and repeat actions based on a condition."
category: "Program Flow and Functions"
---

## Repeating Actions with Loops

In programming, loops are a fundamental concept that allows you to execute a block of code multiple times. This is essential for automating repetitive tasks. Python provides two primary types of loops: `for` loops and `while` loops.

-----

### **The `for` Loop**

A `for` loop is used for iterating over a sequence, such as a list, tuple, dictionary, set, or string. With the `for` loop, you can execute a set of statements once for each item in a collection.

#### **Looping Through a List**

This is the most common use of a `for` loop.

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print(fruit)
```

**Output:**

```text
apple
banana
cherry
```

#### **Looping Through a String**

You can also loop through the characters of a string.

```python
for letter in "Python":
  print(letter)
```

**Output:**

```text
P
y
t
h
o
n
```

#### **The `range()` Function**

To loop through a set of code a specified number of times, we can use the `range()` function.

```python
# Loop 5 times, from 0 to 4
for i in range(5):
  print(i)
```

**Output:**

```text
0
1
2
3
4
```

-----

### **The `while` Loop**

The `while` loop executes a set of statements as long as a specified condition is `True`.

```python
# A simple while loop that counts from 1 to 5
i = 1
while i <= 5:
  print(i)
  i += 1 # It's crucial to increment i, otherwise the loop will run forever!
```

**Output:**

```text
1
2
3
4
5
```

-----

### **Loop Control Statements**

You can change the flow of a loop using control statements.

  * **`break`**: The `break` statement is used to stop the loop, even if the `while` condition is still true or there are more items to iterate over.

    ```python
    for fruit in ["apple", "banana", "cherry"]:
      if fruit == "banana":
        break # Stop the loop when "banana" is found
      print(fruit)
    ```

    **Output:**

    ```text
    apple
    ```

  * **`continue`**: The `continue` statement is used to stop the current iteration of the loop and move on to the next one.

    ```python
    for fruit in ["apple", "banana", "cherry"]:
      if fruit == "banana":
        continue # Skip "banana" and continue with the next item
      print(fruit)
    ```

    **Output:**

    ```text
    apple
    cherry
    ```

Understanding loops is a major step in learning to program, as they are a core component of almost any application you will build.