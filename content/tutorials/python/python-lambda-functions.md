---
title: "Python Lambda Functions"
slug: "python-lambda-functions"
order: 14
description: "Learn about lambda functions in Python, a way to create small, anonymous functions on the fly. Understand their syntax and when they are most useful."
category: "Program Flow and Functions"
---

## What is a Lambda Function?

A lambda function is a small, anonymous function defined with the `lambda` keyword. While a standard function is defined using `def`, a lambda function is a more concise way to create a function that has only a single expression.

Lambda functions can take any number of arguments, but can only have one expression. The expression is evaluated and returned.

### **Syntax**

The basic syntax of a lambda function is:

`lambda arguments: expression`

### **Standard Function vs. Lambda Function**

Here’s how a simple function to add two numbers compares to its lambda equivalent.

**Standard Function:**

```python
def add(x, y):
  return x + y

print(add(5, 3))
```

**Lambda Function:**

```python
add_lambda = lambda x, y: x + y

print(add_lambda(5, 3))
```

In both cases, the output is `8`. The lambda function allows us to define this simple operation in a single line.

-----

## Why Use a Lambda Function?

The power of lambda functions is best seen when they are used as an anonymous function inside another function.

They are often used in situations where you need a small, temporary function for a short period of time, and you don't want to formally define it with `def`.

### **Use Case: Sorting a List of Dictionaries**

A common use case is providing a custom key for sorting functions. Imagine you have a list of dictionaries and you want to sort it based on the age of each person.

```python
# A list of dictionaries
people = [
    {'name': 'Alice', 'age': 30},
    {'name': 'Bob', 'age': 25},
    {'name': 'Charlie', 'age': 35}
]

# Use a lambda function as the key for the sorted() function
# The lambda function tells sorted() to use the 'age' value of each dictionary for sorting
sorted_people = sorted(people, key=lambda person: person['age'])

print(sorted_people)
```

**Output:**

```text
[{'name': 'Bob', 'age': 25}, {'name': 'Alice', 'age': 30}, {'name': 'Charlie', 'age': 35}]
```

Without a lambda function, you would have had to define a separate, named function just for this one sorting operation.

### **Use Case: With `filter()` and `map()`**

Lambda functions are also frequently used with built-in functions like `filter()` (which filters a sequence based on a condition) and `map()` (which applies a function to every item in a sequence).

**Filter Example (get only even numbers):**

```python
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers) # Output: [2, 4, 6]
```

**Map Example (square every number):**

```python
numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(lambda x: x * x, numbers))
print(squared_numbers) # Output: [1, 4, 9, 16, 25]
```

While you can always use a standard function, lambda functions provide a more elegant and concise syntax for these kinds of common tasks.