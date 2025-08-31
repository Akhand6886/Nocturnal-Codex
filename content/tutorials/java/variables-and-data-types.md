---
title: "Java Variables and Data Types"
slug: "java-variables-data-types"
order: 3
description: "Learn about declaring variables and the fundamental data types in Java."
category: "Java Fundamentals"
---

## Variables in Java

A variable is a container which holds the value while the Java program is executed. A variable is assigned with a data type.

In Java, all variables must be declared before they can be used.

```java
// SYNTAX: type variableName = value;
int myNumber = 5;
String greeting = "Hello";
boolean isActive = true;
```

## Data Types

Data types specify the different sizes and values that can be stored in the variable. There are two types of data types in Java:

### 1. Primitive Data Types

Primitive data types are predefined by the language and named by a keyword. There are 8 primitive types:

- **`byte`**: 1 byte, stores whole numbers from -128 to 127
- **`short`**: 2 bytes, stores whole numbers from -32,768 to 32,767
- **`int`**: 4 bytes, stores whole numbers from -2,147,483,648 to 2,147,483,647 (most common for integers)
- **`long`**: 8 bytes, stores whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
- **`float`**: 4 bytes, stores fractional numbers. Sufficient for storing 6 to 7 decimal digits
- **`double`**: 8 bytes, stores fractional numbers. Sufficient for storing 15 decimal digits (most common for floating-point numbers)
- **`boolean`**: 1 bit, stores `true` or `false` values
- **`char`**: 2 bytes, stores a single character/letter or ASCII values.

```java
int myInt = 10000;
float myFloat = 5.75f; // Note the 'f' suffix
char myLetter = 'D';
boolean myBool = true;
```

### 2. Non-Primitive Data Types (Reference Types)

Non-primitive types are created by the programmer and are not defined by Java (except for `String`). They are also known as reference types because they refer to objects.

- **Classes**, **Interfaces**, **Arrays**, and **Strings** are examples of non-primitive types.

The main difference between primitive and non-primitive types is that primitive types are stored directly in memory where the variable is allocated, whereas non-primitive types store a reference (or address) to the memory location where the object is actually stored.
