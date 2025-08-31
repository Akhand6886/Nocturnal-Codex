---
title: "Java Operators"
slug: "java-operators"
order: 4
description: "Understand the various operators in Java for performing arithmetic, assignment, comparison, and logical operations."
category: "Java Fundamentals"
---

## Operators in Java

Operators are special symbols that perform specific operations on one, two, or three operands, and then return a result.

### 1. Arithmetic Operators
Used to perform common mathematical operations.
- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` Modulus (returns the remainder of a division)
- `++` Increment (increases a value by 1)
- `--` Decrement (decreases a value by 1)

```java
int x = 10;
int y = 3;
System.out.println(x + y); // 13
System.out.println(x % y); // 1
x++; // x is now 11
```

### 2. Assignment Operators
Used to assign values to variables.
- `=` Assign
- `+=` (e.g., `x += 3` is same as `x = x + 3`)
- `-=`
- `*=`
- `/=`
- `%=`

### 3. Comparison Operators
Used to compare two values. The result is a boolean (`true` or `false`).
- `==` Equal to
- `!=` Not equal to
- `>` Greater than
- `<` Less than
- `>=` Greater than or equal to
- `<=` Less than or equal to

```java
int a = 5;
int b = 7;
System.out.println(a == b); // false
System.out.println(a < b);  // true
```

### 4. Logical Operators
Used to determine the logic between variables or values.
- `&&` Logical AND (returns `true` if both statements are true)
- `||` Logical OR (returns `true` if one of the statements is true)
- `!` Logical NOT (reverses the result, returns `false` if the result is true)

```java
int age = 25;
boolean hasLicense = true;
if (age >= 18 && hasLicense) {
    System.out.println("Can drive.");
}
```
