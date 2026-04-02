---
title: "Classes"
description: "class syntax, constructor, extends, super, private fields (#)"
---

## What is the ES6 `class` Syntax?

Introduced in **ES6 (2015)**, the **`class`** keyword is a cleaner way to write object-orientated code in JavaScript. It still uses **prototypes** under the hood, but it's much easier to read and maintain for developers coming from languages like Java or C#.

```javascript
class User {
  // Use constructor to initialize!
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  // Define a method!
  greet() {
    console.log(`Hi, I'm ${this.name}, and I'm a ${this.role}.`);
  }
}

const admin = new User("Alpha", "Admin");
admin.greet();
```

## Inheritance with `extends` & `super`

You can create a **subclass** that inherits methods and properties from a **superclass** (parent class).

1.  **`extends`**: Links the child class to the parent.
2.  **`super()`**: Calls the parent's constructor! (Must be the first line!).

```javascript
class Employee extends User {
  constructor(name, role, salary) {
    super(name, role); // Call parent!
    this.salary = salary;
  }

  // Override parent method!
  greet() {
    super.greet(); // Call parent's greet!
    console.log(`I earn: ${this.salary}`);
  }
}

const bob = new Employee("Bob", "Developer", 50000);
bob.greet();
```

## Creating Private Properties (`#`)

In the past, we used an underscore (`_name`) as a convention to mark properties as "private." Modern JavaScript now has **true private fields** using the hash (`#`) prefix. These cannot be accessed outside the class!

```javascript
class BankAccount {
  // Private property!
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    console.log(`New balance: ${this.#balance}`);
  }
}

const account = new BankAccount();
account.deposit(100);
// console.log(account.#balance); // ERROR: SyntaxError!
```

## Static Methods & Properties

A **static** member belongs to the **class itself**, not to individual objects created from it.

```javascript
class Utils {
    static APP_VERSION = "1.0.0";
    
    static isValidEmail(email) {
        return email.includes("@");
    }
}

console.log(Utils.APP_VERSION); 
console.log(Utils.isValidEmail("hi@example.com"));
```

## Summary

| Feature | Description |
| :--- | :--- |
| **constructor** | Special method to initialize data |
| **extends** | Derive one class from another |
| **super()** | Call parent constructor or method |
| **#private** | Truly private fields (cannot be read outside the class) |
| **static** | Properties/methods belonging to the CLASS, not instance |
| **Best For** | Structuring code, complex business logic, UI components |
| **Sugar** | It's still prototypes under the hood! |
| **this** | Refers to the current object instance |
| **get / set** | Special methods for accessing/updating data with logic |
| **instanceof**| Verify if an object belongs to a class |
| **Inheritance**| Promotes code reuse and modularity |
| **Class Form** | Always uses `strict mode` even if not specified |
| **Hoisting** | Unlike functions, classes are NOT hoisted! |
| **Bound Method**| Use arrow functions inside classes to preserve `this` |
| **Factory** | Use static methods for creating custom instances |
