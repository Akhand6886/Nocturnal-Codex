---
title: "Java User Input with the Scanner Class"
slug: "java-user-input"
order: 5
description: "Learn how to make your Java applications interactive by reading input from the user's keyboard using the powerful and versatile Scanner class."
category: "Java Fundamentals"
---

## Making Programs Interactive

To create powerful console applications, you need a way to get input from the user. In Java, the most common way to do this is by using the `Scanner` class, which is part of the `java.util` package.

The `Scanner` class provides various methods for reading different types of data, such as integers, doubles, and strings.

-----

## How to Use the `Scanner` Class

Using the `Scanner` is a three-step process:

### **1. Import the `Scanner` Class**

First, you need to import the `Scanner` class into your program. This is done by adding the following line at the very top of your `.java` file, before the `public class` line.

```java
import java.util.Scanner; // Import the Scanner class
```

### **2. Create a `Scanner` Object**

Next, inside your `main` method, you need to create an instance (an object) of the `Scanner` class. You tell it to read from `System.in`, which is the standard input stream (usually the keyboard).

```java
public class UserInputExample {
  public static void main(String[] args) {
    Scanner myScanner = new Scanner(System.in); // Create a Scanner object
  }
}
```

### **3. Read User Input**

Now you can use the various methods of the `Scanner` object to read input.

| Method | Description |
| :--- | :--- |
| `nextLine()` | Reads a line of text (a `String`) |
| `nextInt()` | Reads an integer value (an `int`) |
| `nextDouble()`| Reads a double value (a `double`) |
| `nextBoolean()`| Reads a boolean value (a `boolean`) |

-----

## Example: A Simple User Profile

Let's create a program that asks for a user's name, age, and salary, and then displays the information back to them.

```java
import java.util.Scanner; // Step 1: Import

public class UserProfile {
  public static void main(String[] args) {
    // Step 2: Create a Scanner object
    Scanner inputReader = new Scanner(System.in);
    
    // Step 3: Read input
    System.out.println("Enter your username:");
    String userName = inputReader.nextLine(); // Reads a line of text
    
    System.out.println("Enter your age:");
    int age = inputReader.nextInt(); // Reads an integer
    
    System.out.println("Enter your salary:");
    double salary = inputReader.nextDouble(); // Reads a double
    
    // Display the collected information
    System.out.println("\n--- User Profile ---");
    System.out.println("Username: " + userName);
    System.out.println("Age: " + age);
    System.out.println("Salary: " + salary);
    
    // It's good practice to close the scanner when you're done
    inputReader.close();
  }
}
```

By using the `Scanner` class, you can easily create interactive console-based applications that respond to user input.