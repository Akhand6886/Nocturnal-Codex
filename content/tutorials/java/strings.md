---
title: "Working with Strings in Java"
slug: "java-working-with-strings"
order: 10
description: "Learn how to work with the String class in Java. This guide covers string creation, concatenation, and a variety of essential string methods."
category: "Core Java Concepts"
---

## The `String` Class

In Java, a string is an object that represents a sequence of characters. It's not a primitive data type but a class from the `java.lang` package. `String` objects are **immutable**, which means once a string is created, its value cannot be changed. Any method that appears to modify a string actually creates and returns a new string.

You create a string by enclosing text in double quotes `""`.

```java
// Creating a string
String greeting = "Hello, World!";
```

## String Concatenation

You can join strings together using the `+` operator. This is known as concatenation.

```java
String firstName = "John";
String lastName = "Doe";
String fullName = firstName + " " + lastName;

System.out.println(fullName); // Output: John Doe
```

If you concatenate a string with another data type (like an `int`), Java will automatically convert the other type to a string.

```java
String message = "Your score is: " + 100;
System.out.println(message); // Output: Your score is: 100
```

-----

## Common String Methods

The `String` class provides many useful methods for manipulating strings. Here are some of the most common ones:

| Method | Description |
| :--- | :--- |
| `length()` | Returns the number of characters in the string. |
| `toUpperCase()` | Converts the string to uppercase letters. |
| `toLowerCase()` | Converts the string to lowercase letters. |
| `trim()` | Removes whitespace from both ends of the string. |
| `charAt(int index)` | Returns the character at the specified index. |
| `substring(int beginIndex, int endIndex)` | Extracts a part of the string. |
| `equals(String anotherString)` | Compares two strings for equality. (Use this instead of `==` for strings). |
| `contains(CharSequence s)` | Checks whether a string contains a sequence of characters. |
| `replace(char oldChar, char newChar)` | Replaces a specified character with a new one. |

### **Examples in Action**

```java
public class StringMethodsExample {
  public static void main(String[] args) {
    String text = "   Java Programming   ";

    System.out.println("Length: " + text.length()); // Output: 21
    System.out.println("Uppercase: " + text.toUpperCase()); // Output: "   JAVA PROGRAMMING   "
    System.out.println("Trimmed: " + text.trim()); // Output: "Java Programming"
    System.out.println("Substring: " + text.trim().substring(0, 4)); // Output: "Java"
    System.out.println("Contains 'Pro'?: " + text.contains("Pro")); // Output: true
  }
}
```

### **Comparing Strings: `equals()` vs `==`**

A common mistake for beginners is using the `==` operator to compare strings. The `==` operator checks if two variables refer to the exact same object in memory. The `equals()` method, however, checks if the actual character sequences of the strings are the same.

**Always use `.equals()` to compare the content of strings.**

```java
String str1 = new String("hello");
String str2 = new String("hello");

System.out.println(str1 == str2);      // Output: false (they are different objects)
System.out.println(str1.equals(str2)); // Output: true (their content is the same)
```