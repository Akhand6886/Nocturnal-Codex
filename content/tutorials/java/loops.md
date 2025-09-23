---
title: "Java Loops (for and while)"
slug: "java-loops"
order: 9
description: "Learn how to automate repetitive tasks in Java using for and while loops. This guide covers how to iterate a specific number of times and repeat code based on a condition."
category: "Control Flow"
---

## Repeating Code with Loops

In programming, you often need to execute the same block of code multiple times. Instead of writing the same code over and over, you use loops. Loops are a fundamental control structure that allows you to automate repetitive tasks. Java's two primary loops are the `for` loop and the `while` loop.

-----

### **1. The `for` Loop**

The `for` loop is ideal when you know exactly how many times you want to execute a block of code.

It consists of three parts, separated by semicolons:

1.  **Initialization**: A counter variable is declared and initialized. This part is executed once, before the loop starts.
2.  **Condition**: The loop continues as long as this condition is `true`.
3.  **Iteration**: An expression that is executed after each iteration, usually to increment or decrement the counter.

```java
public class ForLoopExample {
  public static void main(String[] args) {
    // This loop will print numbers from 0 to 4
    for (int i = 0; i < 5; i++) {
      System.out.println("The current number is: " + i);
    }
  }
}
```

**Output:**

```text
The current number is: 0
The current number is: 1
The current number is: 2
The current number is: 3
The current number is: 4
```

-----

### **2. The `while` Loop**

The `while` loop is used to repeat a block of code as long as a specified condition is `true`. It's best used when you don't know the exact number of iterations beforehand.

```java
public class WhileLoopExample {
  public static void main(String[] args) {
    int i = 0;
    while (i < 5) {
      System.out.println("The current number is: " + i);
      i++; // It is crucial to update the variable in the condition
    }
  }
}
```

The output for this `while` loop is the same as the `for` loop example. **Warning:** If you forget to update the variable that the condition depends on (in this case, `i++`), the condition will always be `true`, and you will create an infinite loop.

-----

### **Loop Control Statements**

You can alter the flow of a loop using control statements.

  * **`break`**: Immediately exits the loop.

    ```java
    for (int i = 0; i < 10; i++) {
      if (i == 4) {
        break; // Stop the loop when i equals 4
      }
      System.out.println(i);
    }
    // This will print 0, 1, 2, 3
    ```

  * **`continue`**: Skips the current iteration and proceeds to the next one.

    ```java
    for (int i = 0; i < 5; i++) {
      if (i == 2) {
        continue; // Skip the rest of the loop when i is 2
      }
      System.out.println(i);
    }
    // This will print 0, 1, 3, 4
    ```
