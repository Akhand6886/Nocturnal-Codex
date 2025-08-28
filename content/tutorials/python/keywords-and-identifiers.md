---
title: "Python Keywords & Identifiers"
slug: "keywords-and-identifiers"
order: 2
description: "Understand the fundamental building blocks of Python syntax: reserved keywords and the rules for naming variables, functions, and more."
category: "Getting Started"
---

## Python Keywords

Keywords are the reserved words in Python. You cannot use a keyword as a variable name, function name, or any other identifier. They are used to define the syntax and structure of the Python language.

All the keywords except `True`, `False`, and `None` are in lowercase and they must be written as they are.

You can see the full list of keywords in your version of Python by running this in the Python shell:

```python
import keyword
print(keyword.kwlist)
```

**Output (as of Python 3.10):**

```text
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

-----

## Python Identifiers

An identifier is the name given to entities like variables, functions, classes, etc. It helps to differentiate one entity from another.

### **Rules for Writing Identifiers**

1.  **Allowed Characters**: Identifiers can be a combination of letters in lowercase (a-z) or uppercase (A-Z), digits (0-9), and an underscore `_`.

2.  **No Special Characters**: Special characters like `!`, `@`, `#`, `$`, `%` etc., are not allowed in an identifier.

3.  **Cannot Start with a Digit**: An identifier cannot start with a digit. `1variable` is invalid, but `variable1` is perfectly fine.

4.  **Case-Sensitive**: Python is case-sensitive. This means `myVariable` and `myvariable` are two different identifiers.

5.  **No Keyword Usage**: As mentioned above, you cannot use a Python keyword as an identifier name.

### **Valid vs. Invalid Identifiers**

Here are some examples to make it clear:

| Valid Identifiers | Invalid Identifiers | Reason |
| :--- | :--- | :--- |
| `my_variable` | `my-variable` | Hyphens are not allowed |
| `variable1` | `1variable` | Cannot start with a digit |
| `_private_var` | `global` | `global` is a keyword |
| `userName` | `user name` | Spaces are not allowed |

-----

## Naming Conventions

While the rules above are mandatory, there are also community-agreed-upon conventions that make your code much more readable.

  * **Snake Case**: For variables and functions, it is recommended to use `snake_case`, where all words are lowercase and separated by underscores.

      * Example: `my_variable`, `calculate_sum()`

  * **PascalCase**: For class names, it is recommended to use `PascalCase`, where each word is capitalized.

      * Example: `MyNewClass`, `DatabaseConnection`

Following these conventions will make your Python code easier for you and other developers to read and understand.