---
title: "JS Data Types"
slug: "javascript-data-types"
order: 4
description: "Explore the different data types available in JavaScript, both primitive and non-primitive."
category: "JS Variables and Data Types"
---

## JavaScript Data Types

JavaScript variables can hold different data types. JavaScript is a dynamically typed language, which means you don't need to specify the type of a variable when you declare it.

### Primitive Data Types
Primitive data types are immutable (they cannot be changed).

1.  **String**: Represents textual data.
    ```javascript
    let name = "Alice";
    ```
2.  **Number**: Represents numeric values, including integers and floating-point numbers.
    ```javascript
    let age = 30;
    let price = 19.99;
    ```
3.  **BigInt**: Represents integers with arbitrary precision.
    ```javascript
    const veryLargeNumber = 9007199254740991n;
    ```
4.  **Boolean**: Represents `true` or `false`.
    ```javascript
    let isActive = true;
    ```
5.  **Undefined**: A variable that has been declared but not assigned a value has the value `undefined`.
    ```javascript
    let status; // status is undefined
    ```
6.  **Null**: Represents the intentional absence of any object value.
    ```javascript
    let user = null;
    ```
7.  **Symbol**: A unique and immutable primitive value, often used as object property keys.
    ```javascript
    const id = Symbol('id');
    ```

### Non-Primitive Data Type (Object)
The `object` data type can store collections of data.

- **Object**: A collection of key-value pairs.
  ```javascript
  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50
  };
  ```
- **Array**: A special type of object for storing ordered collections.
  ```javascript
  const colors = ["red", "green", "blue"];
  ```
- **Function**: A block of code designed to perform a particular task.
  ```javascript
  function greet() {
    return "Hello!";
  }
  ```