---
title: "Java Hello World"
slug: "hello-world-in-java"
order: 2
description: "Learn to write, compile, and run your first 'Hello, World!' program in Java."
category: "Java Basics"
---

## Your First Java Program

The "Hello, World!" program is the traditional first step for learning a new language. It's a simple program that outputs `Hello, World!` to the console.

### The Code

In Java, all code must reside inside a class. Here is the basic structure:

```java
// The file must be named HelloWorld.java
public class HelloWorld {
    // This is the main method, the entry point of any Java application.
    public static void main(String[] args) {
        // This line prints the text to the console.
        System.out.println("Hello, World!");
    }
}
```

### Breaking Down the Code

- **`public class HelloWorld`**: This declares a class named `HelloWorld`, which is `public`, meaning it's accessible by any other class. The class name **must** match the filename (`HelloWorld.java`).
- **`public static void main(String[] args)`**: This is the main method.
    - `public`: It can be called from anywhere.
    - `static`: It can be run without creating an instance of the `HelloWorld` class.
    - `void`: It does not return any value.
    - `main`: This is the name of the method. The JVM looks for this specific method to start the program.
    - `(String[] args)`: This accepts command-line arguments as an array of strings.
- **`System.out.println("Hello, World!");`**: This is the statement that does the printing.
    - `System`: A final class from the `java.lang` package.
    - `out`: A static member of the `System` class, which is an instance of `PrintStream`.
    - `println()`: A method of the `PrintStream` class that prints the argument passed to it, followed by a new line.

### How to Compile and Run

1.  Save the code in a file named `HelloWorld.java`.
2.  Open a terminal or command prompt.
3.  Navigate to the directory where you saved the file.
4.  **Compile the code**: Use the Java compiler (`javac`).
    ```bash
    javac HelloWorld.java
    ```
    This will create a `HelloWorld.class` file containing the Java bytecode.
5.  **Run the program**: Use the Java Virtual Machine (`java`).
    ```bash
    java HelloWorld
    ```
    You should see the output: `Hello, World!`
