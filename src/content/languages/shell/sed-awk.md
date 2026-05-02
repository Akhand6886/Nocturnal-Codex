---
title: "Sed & Awk"
description: "Advanced stream editing and data processing"
---

## What is Sed?

**`sed`** (Stream Editor) is used for performing text transformations on an input stream. Its most common use is searching and replacing text.

```bash
# Replace 'apple' with 'orange' globally in a file
sed 's/apple/orange/g' data.txt
```

Wait! You can use `sed -i` to edit the file **in-place** (permanently changing the file). Be careful!

## What is Awk?

**`awk`** is more than a command—it is a complete programming language designed for data extraction and reporting. It processes files line by line, splitting each line into fields (`$1`, `$2`, etc.).

```bash
# Print the 1st and 3rd columns of a space-separated file
awk '{ print $1, $3 }' data.txt

# Calculate the sum of the first column
awk '{ sum += $1 } END { print sum }' numbers.txt
```

## Sed vs. Awk

| Tool | Strength | Best For... |
| :--- | :--- | :--- |
| **Sed** | **Lines** | Search and replace, deleting lines, simple edits. |
| **Awk** | **Columns** | Complex logic, math on columns, reporting. |

## Why use them?

Wait! Before you write a Python script to process a text file, check if you can do it with a `sed` or `awk` one-liner. They are built-in, extremely fast, and require no dependencies.

## Summary

| Term | Description |
| :--- | :--- |
| **s///** | Sed's substitution syntax |
| **g** | Global flag (replace all) |
| **$1, $2...** | Awk's field variables |
| **NR** | Awk's "Number of Records" (current line number) |
| **END { }** | Awk block that runs after the whole file is processed |
| **Best For** | Advanced text manipulation and log parsing |
| **Logic** | "Line-by-line stream processing" |
| **Safety** | High risk of errors with complex patterns; test on small data first! |
| **Modern** | Still the standard for text processing in Linux/Unix |
| **Standard** | Part of the POSIX core utils |
| **Identity** | The "Heavy Artillery" of the shell |
