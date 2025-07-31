---
title: "JavaScript - let Statement"
slug: "let-statement"
order: 12
description: "Learn how to use the let keyword to declare block-scoped variables in JavaScript."
category: "JavaScript Basics"
---

## What is JavaScript let statement?
The JavaScript let statement is used to declare a variable. With the let statement, we can declare a variable that is block-scoped. This mean a variable declared with let is only accessible within the block of code in which it is defined.

The let keyword was introduced in the ES6 (2015) version of JavaScript. It is an alternative to the var keyword.

The main reason behind introducing the let keyword is to improve the scoping behaviors of variables and the safety of the code.

## Variable Declaration with let statement
Following is the syntax to declare a variable with let statement −

```javascript
let var_name = value
```
Let's have a look at some examples for variable declaration with let.

```javascript
let name = "John";
let age = 35;
let x = true;
```
Using let statement we can declare a variable of any datatypes, e.g., numeric, string, boolean, etc.

## JavaScript Block Scope vs. Function Scope
The scope of the variable declared with the let keyword is a block-scope. It means if you define the variable with the let keyword in the specific block, you can access the variable inside that particular block only, and if you try to access the variable outside the block, it raises an error like 'variable is not defined'.

```javascript
{
   let x = "John";
}
//here x can't be accessed
```
The var keyword has a function scope, meaning if you define the variable using the var keyword in any function block, you can access it throughout the function.

```javascript
function foo(){
   if (true){
      let x = 5
      var y = 10
   }
   // here x can't be accessed while y is accessible
}
```
Sometimes, we require to define the variable with the same name in different blocks of one function. Conflicts may occur with the variable value if they use the var keyword.

### Example
In the example below, we have defined the variable x using the let keyword and variable y using the var keyword. Also, we have assigned 10 and 20 values to both variables, respectively.

We defined the test() function, redeclared the x and y variables inside it, and initialized them with 50 and 100 values, respectively. We print variable values inside the function, and it prints the 50 and 100 as it gives first preference to the local variables over global variables.

```html
<html>
<head>
   <title> Variable declaration with let keyword </title>
</head>
<body>
   <script>
      let x = 10;
	  var y = 20;
	  function test() {
	     let x = 50;
	     var y = 100;
	     document.write("x = " + x + ", y = " + y + "<br/>");
	  }
	  test();
   </script>
</body>
</html>
```

### Example
In the example below, we initialized the bool variable with a 'true' value. After that, we declared the variables x and y using the let and var keywords in the 'if' block.

We print the value of the x and y variable inside the 'if' block. We can't access the 'x' variable outside the 'if' block as it has blocked scope, but we can access variable y outside the 'if' block and inside the function block as it has function scope.

```html
<html>
<head>
   <title> Variable declaration with let keyword </title>
</head>
<body>
   <script>
      function test() {
	     let bool = true;
		 if (bool) {
		    let x = 30;

		    var y = 40;
		    document.write("x = " + x + ", y = " + y + "<br/>");
		 }
		 // x can't be accessible here
		 document.write("y = " + y + "<br/>");
		}
      test();
   </script>
</body>
</html>
```
In this way, the let keyword is used to improve the scoping behaviors of the code.

## Redeclaring Variables in JavaScript
You can't redeclare the variables declared with the let keyword in the same block. However, you can declare the variables with the same name into the different blocks with the same function.

### Example
In the example below, you can observe that variables declared with the let keyword cant be redeclared in the same block, but variables declared with the var keyword can be redeclared in the same block.

The code prints the value of the newly declared variable in the output.

```html
<html>
<head>
   <title> Variable redeclaring </title>
</head>
<body>
   <script>
      function test() {
	     if (1) {
	        let m = 70;
			// let m = 80; // redeclaration with let keyword is not	possible
			var n = 80;
			var n = 90; // redeclaration with var keyword is possible
			document.write("m = " + m + ", n = " + n);
		 }
	  }
      test();
   </script>
</body>
</html>
```

## Variable Hoisting
The hoisting behaviors of JavaScript move the declaration of the variables at the top of the code. The let keyword doesn't support hoisting, but the var keyword supports the hosting.

### Example
In the example below, you can see that we can initialize and print the value of the variable n before its declaration as it is declared using the var keyword.

```html
<html>
<head>
   <title> Variable hoisting </title>
</head>
<body>
   <script>
      function test() {
         // Hoisiting is not supported by let keyword
         // m = 100;
         // document.write("m = " + m + "<br/>");
         // let m;
         n = 50;
         document.write("n = " + n + "<br/>");
         var n;
      }
      test();
   </script>
</body>
</html>
```

You can uncomment the code using the let keyword and check the error in the web console, as it doesn't support hoisting.
