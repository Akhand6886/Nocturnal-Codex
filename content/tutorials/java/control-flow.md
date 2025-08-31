---
title: "Java Control Flow"
slug: "java-control-flow"
order: 5
description: "Learn how to control the flow of execution in Java using conditional statements and loops."
category: "Java Fundamentals"
---

## Control Flow in Java

Control flow statements are what allow a program to make decisions and repeat actions.

### Conditional Statements (`if`, `else if`, `else`)

These statements allow your program to execute certain blocks of code based on a boolean condition.

```java
int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B"); // This will be printed
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}
```

### The `switch` Statement

A `switch` statement can be a cleaner alternative to a long chain of `if-else if` statements when you are checking a single variable against multiple values.

```java
int day = 4;
String dayString;
switch (day) {
    case 1:  dayString = "Monday";
             break;
    case 2:  dayString = "Tuesday";
             break;
    case 3:  dayString = "Wednesday";
             break;
    case 4:  dayString = "Thursday";
             break;
    // ... other cases
    default: dayString = "Invalid day";
             break;
}
System.out.println(dayString); // Output: Thursday
```

### Loops

Loops are used to execute a block of code repeatedly.

#### The `for` Loop

A `for` loop is ideal when you know how many times you want to iterate.

```java
// Prints numbers from 0 to 4
for (int i = 0; i < 5; i++) {
    System.out.println("Iteration: " + i);
}
```

#### The `while` Loop

A `while` loop continues as long as a condition is true.

```java
int count = 0;
while (count < 3) {
    System.out.println("Count is " + count);
    count++;
}
```

#### The `do-while` Loop

A `do-while` loop is similar to a `while` loop, but it guarantees that the block of code is executed at least once.

```java
int i = 5;
do {
    System.out.println("This will print once, even though i is not less than 5.");
    i++;
} while (i < 5);
```
