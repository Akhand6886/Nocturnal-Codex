---
title: "Python File Handling"
slug: "python-file-handling"
order: 16
description: "Learn how to read from and write to files in Python. Understand the different file modes and the importance of using the 'with' statement for safe file operations."
category: "Intermediate Concepts"
---

## What is File Handling?

File handling is an essential part of any web application. It allows your program to interact with files on your computer's file system. Python has several functions for creating, reading, updating, and deleting files.

The key function for working with files in Python is the `open()` function. It takes two parameters: a `filename` and a `mode`.

-----

## The `with open()` Statement

The recommended way to work with files is by using the `with open()` statement. This ensures that the file is automatically closed when you are done with it, even if an error occurs.

### **Syntax**

```python
with open("filename.txt", "mode") as file:
  # Perform file operations here
```

### **File Modes**

There are four main modes for opening a file:

| Mode | Description |
| :--- | :--- |
| `"r"` | **Read** - Default value. Opens a file for reading, raises an error if the file does not exist. |
| `"a"` | **Append** - Opens a file for appending, creates the file if it does not exist. |
| `"w"` | **Write** - Opens a file for writing, creates the file if it does not exist. **Warning:** This will overwrite the entire content of the file. |
| `"x"` | **Create** - Creates the specified file, returns an error if the file exists. |

-----

## Reading from Files

To read a file, you use the `"r"` mode.

Let's assume we have a file named `hello.txt` with the following content:

```text
Hello from the Nocturnal Codex.
This is the second line.
```

### **Reading the Entire File**

The `read()` method reads the entire content of the file into a single string.

```python
with open("hello.txt", "r") as file:
  content = file.read()
  print(content)
```

### **Reading Line by Line**

You can also loop over the file object to read one line at a time, which is more memory-efficient for large files.

```python
with open("hello.txt", "r") as file:
  for line in file:
    print(line, end="") # Use end="" to prevent extra newlines
```

-----

## Writing to Files

To write to a file, you can use the `"w"` (write) or `"a"` (append) mode.

### **Writing to a File (`"w"`)**

This will create a new file named `greetings.txt`. If the file already exists, its entire content will be erased and replaced.

```python
with open("greetings.txt", "w") as file:
  file.write("Hello, Python programmer!\n")
  file.write("Welcome to file handling.")
```

### **Appending to a File (`"a"`)**

This will add content to the end of an existing file without deleting its current content.

```python
with open("greetings.txt", "a") as file:
  file.write("\nThis line was appended.")
```

Being able to read from and write to files is a crucial skill that allows your programs to store data permanently and interact with other systems.