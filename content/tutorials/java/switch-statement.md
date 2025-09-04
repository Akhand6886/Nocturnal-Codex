---
title: "The Java switch Statement"
slug: "java-switch-statement"
order: 8
description: "Learn how to use the switch statement in Java as an efficient alternative to long if-else if chains for multi-way branching."
category: "Control Flow"
---

## An Alternative to `if-else if`

The `switch` statement is a control flow statement that provides a clean and efficient way to execute different blocks of code based on the value of a variable or an expression. It's often used as an alternative to a long series of `if-else if-else` statements, especially when you are comparing a single variable against multiple possible values.

### **Syntax**

The basic syntax of a `switch` statement looks like this:

```java
switch (expression) {
  case value1:
    // Code to be executed if expression matches value1
    break;
  case value2:
    // Code to be executed if expression matches value2
    break;
  // ... you can have any number of case statements
  default:
    // Code to be executed if expression doesn't match any case
}
```

### **How it Works**

1.  The `expression` is evaluated once.
2.  The value of the expression is compared with the values of each `case`.
3.  If there is a match, the associated block of code is executed.
4.  The `break` keyword is crucial. It stops the execution of more code and exits the `switch` block.
5.  The `default` keyword is optional. It specifies some code to run if there is no case match.

-----

## Example: Day of the Week

Let's use a `switch` statement to print the name of the day of the week based on a number.

```java
public class DayOfWeek {
  public static void main(String[] args) {
    int day = 4;
    String dayString;

    switch (day) {
      case 1:
        dayString = "Monday";
        break;
      case 2:
        dayString = "Tuesday";
        break;
      case 3:
        dayString = "Wednesday";
        break;
      case 4:
        dayString = "Thursday";
        break;
      case 5:
        dayString = "Friday";
        break;
      case 6:
        dayString = "Saturday";
        break;
      case 7:
        dayString = "Sunday";
        break;
      default:
        dayString = "Invalid day";
        break;
    }
    System.out.println(dayString);
  }
}
```

**Output:**

```text
Thursday
```

-----

## The Importance of `break`

If you forget to add a `break` statement at the end of a case, the execution will "fall through" to the next case and execute its code as well, until a `break` or the end of the `switch` block is reached. This is sometimes intentional, but most often it's a bug.

```java
int number = 2;
switch (number) {
  case 1:
    System.out.println("One");
  case 2:
    System.out.println("Two"); // No break here
  case 3:
    System.out.println("Three");
    break;
}
```

**Output:**

```text
Two
Three
```

Because there was no `break` in `case 2`, the program continued to execute the code in `case 3`.

The `switch` statement is a powerful tool for making your code cleaner and more readable when dealing with multiple, distinct choices.
