---
title: "Java Operators"
slug: "java-operators"
order: 4
description: "Learn about the different types of operators in Java, including arithmetic, assignment, comparison, and logical operators, to perform various operations."
category: "Java Fundamentals"
---

## What are Operators?

Operators are special symbols that perform specific operations on one, two, or three operands, and then return a result. For instance, in `10 + 5`, the `+` is an operator that adds two numbers. Understanding operators is fundamental to performing calculations and logic in Java.

-----

### **1. Arithmetic Operators**

These are used to perform common mathematical operations.

| Operator | Name | Description |
| :--- | :--- | :--- |
| `+` | Addition | Adds together two values |
| `-` | Subtraction | Subtracts one value from another |
| `*` | Multiplication | Multiplies two values |
| `/` | Division | Divides one value by another |
| `%` | Modulus | Returns the division remainder |
| `++` | Increment | Increases the value of a variable by 1 |
| `--` | Decrement | Decreases the value of a variable by 1 |

```java
int x = 10;
int y = 3;

System.out.println(x / y); // Output: 3 (integer division truncates the decimal)
System.out.println(x % y); // Output: 1
```

-----

### **2. Assignment Operators**

These operators are used to assign values to variables.

| Operator | Example | Same As |
| :--- | :--- | :--- |
| `=` | `x = 5;` | `x = 5;` |
| `+=` | `x += 3;` | `x = x + 3;` |
| `-=` | `x -= 3;` | `x = x - 3;` |

```java
int value = 10;
value += 5; // value is now 15
System.out.println(value);
```

-----

### **3. Comparison Operators**

These are used to compare two values and will always return a `boolean` value (`true` or `false`).

| Operator | Name | Example |
| :--- | :--- | :--- |
| `==` | Equal to | `x == y` |
| `!=` | Not equal | `x != y` |
| `>` | Greater than | `x > y` |
| `<` | Less than | `x < y` |
| `>=` | Greater than or equal to | `x >= y` |
| `<=` | Less than or equal to | `x <= y` |

```java
int a = 7;
int b = 10;

System.out.println(a > b); // Output: false
System.out.println(a != b); // Output: true
```

-----

### **4. Logical Operators**

These are used to determine the logic between variables or values, often to combine multiple conditions.

| Operator | Name | Description |
| :--- | :--- | :--- |
| `&&` | Logical And | Returns `true` if both statements are true |
| `||` | Logical Or | Returns `true` if one of the statements is true |
| `!` | Logical Not | Reverses the result, returns `false` if the result is true |

```java
int age = 25;
boolean hasLicense = true;

if (age > 18 && hasLicense) {
  System.out.println("You are allowed to drive.");
}
```
