---
title: "Java Conditional Statements (if/else)"
slug: "java-conditional-statements"
order: 7
description: "Learn how to control the flow of your Java programs with conditional statements. Master the use of if, else if, and else to make decisions in your code."
category: "Control Flow"
---

## Making Decisions in Your Code

Conditional statements allow your program to execute a specific block of code only if a certain condition is true. They are the primary way a program can make decisions and behave differently in response to different inputs. The core conditional statements in Java are `if`, `else if`, and `else`.

-----

### **1. The `if` Statement**

The `if` statement is the most basic control flow statement. It tells your program to execute a certain section of code only if a particular test evaluates to `true`.

```java
int age = 20;

if (age >= 18) {
  System.out.println("You are an adult.");
}
```

**Output:**

```text
You are an adult.
```

If the `age` variable was less than 18, the `println` statement would be skipped.

-----

### **2. The `else` Statement**

The `else` statement is used to provide a secondary path of execution when the `if` clause evaluates to `false`.

```java
int temperature = 15;

if (temperature > 25) {
  System.out.println("It's a hot day!");
} else {
  System.out.println("It's not a hot day.");
}
```

**Output:**

```text
It's not a hot day.
```

-----

### **3. The `else if` Statement**

If you have more than two possible conditions to check, you can use the `else if` statement. This allows you to chain multiple conditions together.

```java
int score = 85;

if (score >= 90) {
  System.out.println("Grade: A");
} else if (score >= 80) {
  System.out.println("Grade: B");
} else if (score >= 70) {
  System.out.println("Grade: C");
} else {
  System.out.println("Grade: D");
}
```

**Output:**

```text
Grade: B
```

The program checks each condition in order and executes the code for the first one that is `true`, skipping all the rest.

-----

### **Ternary Operator**

For simple `if/else` conditions, Java has a shorter alternative called the ternary operator. It's a concise way to assign a value to a variable based on a condition.

**Syntax:** `variable = (condition) ? valueIfTrue : valueIfFalse;`

```java
int time = 20;
String result = (time < 18) ? "Good day." : "Good evening.";
System.out.println(result);
```

**Output:**

```text
Good evening.
```

By mastering conditional statements, you gain the ability to write programs that can perform complex logic and respond intelligently to different scenarios.