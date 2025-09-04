---
title: "User Interaction in JavaScript"
slug: "javascript-user-interaction"
order: 6
description: "Learn how to make your JavaScript programs interactive with the user by using the built-in alert(), prompt(), and confirm() functions."
category: "JavaScript Fundamentals"
---

## Interacting with the User

JavaScript provides simple, built-in functions that allow you to communicate with the user directly through dialog boxes in the browser. These are great for simple interactions and debugging. The three main functions are `alert()`, `prompt()`, and `confirm()`.

-----

### **1. Displaying a Message with `alert()`**

The `alert()` function is used to display a message to the user in a modal dialog box. The user must click "OK" to dismiss it. It's often used to show important information or for debugging.

```javascript
alert("This is an important message!");
```

This will produce a pop-up in the browser that looks something like this:

-----

### **2. Getting User Input with `prompt()`**

The `prompt()` function displays a dialog box that prompts the user for some input. It includes an optional message, an input field, and OK/Cancel buttons.

It returns the text the user entered as a **string**. If the user clicks "Cancel" or presses the Esc key, it returns `null`.

```javascript
let userName = prompt("Please enter your name:", "Guest");

if (userName) {
  alert("Hello, " + userName + "!");
} else {
  alert("You did not enter a name.");
}
```

This will display a dialog box asking for the user's name, with "Guest" as the default text in the input field.

-----

### **3. Confirming an Action with `confirm()`**

The `confirm()` function displays a dialog box with a question and two buttons: "OK" and "Cancel".

It returns a **boolean** value:

  * `true` if the user clicks "OK".
  * `false` if the user clicks "Cancel" or presses the Esc key.

This is very useful when you need to get a yes/no answer from the user, for example, before deleting something.

```javascript
let isConfirmed = confirm("Are you sure you want to proceed?");

if (isConfirmed) {
  console.log("User clicked OK. Proceeding with action.");
} else {
  console.log("User clicked Cancel. Action aborted.");
}
```

While these functions are simple, they are powerful tools for creating basic interactive scripts and are often one of the first things beginners learn when connecting their code to user actions.