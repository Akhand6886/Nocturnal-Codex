---
title: "Java Variables and Data Types"
slug: "java-variables-data-types"
order: 3
description: "Learn the fundamentals of storing data in Java. This guide covers declaring variables and the essential primitive data types like int, double, char, and boolean."
category: "Java Fundamentals"
---

## What is a Variable?

In Java, a variable is a container that holds a data value. It has a specific **data type**, which is a classification that tells the compiler how the programmer intends to use the data.

Unlike dynamically typed languages like Python or JavaScript, Java is **statically typed**. This means you must declare the type of a variable before you can use it. Once a variable is declared with a certain data type, it can only hold values of that type.

### **Declaring a Variable**

To declare a variable, you specify the type, give it a name, and optionally, assign it a value.

**Syntax:** `type variableName = value;`

```java
// Declaring an integer variable
int userAge = 25;

// Declaring a string variable
String userName = "John Doe";

// You can also declare first and assign later
String message;
message = "Hello, Java!";

System.out.println(userAge);
```

-----

## Primitive Data Types

Java has eight primitive data types. These are the most basic data types and are not objects.

| Type | Size | Description |
| :--- | :--- | :--- |
| `byte` | 1 byte | Stores whole numbers from -128 to 127 |
| `short` | 2 bytes | Stores whole numbers from -32,768 to 32,767 |
| `int` | 4 bytes | Stores whole numbers from -2,147,483,648 to 2,147,483,647 |
| `long` | 8 bytes | Stores whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| `float` | 4 bytes | Stores fractional numbers. Sufficient for storing 6 to 7 decimal digits |
| `double`| 8 bytes | Stores fractional numbers. Sufficient for storing 15 decimal digits |
| `boolean`| 1 bit | Stores `true` or `false` values |
| `char` | 2 bytes | Stores a single character/letter or ASCII values, surrounded by single quotes `'` |

### **Commonly Used Primitives**

While there are eight, you will most frequently use these four:

  * **`int`**: The default choice for whole numbers.
    ```java
    int score = 100;
    ```
  * **`double`**: The default choice for floating-point (decimal) numbers.
    ```java
    double price = 19.99;
    ```
  * **`boolean`**: For true/false logic.
    ```java
    boolean isLoggedIn = true;
    ```
  * **`char`**: For single characters.
    ```java
    char grade = 'A';
    ```

-----

## The `String` Class

It's important to note that **`String` is not a primitive data type** in Java. It's a class. However, it's so commonly used that it's often thought of as a basic data type. A `String` is a sequence of characters, and its value must be enclosed in double quotes `""`.

```java
String greeting = "Welcome to the Nocturnal Codex!";
```

This static typing system helps catch many common errors during compilation, before the program even runs, which is a key reason for Java's reputation for being robust and reliable.
