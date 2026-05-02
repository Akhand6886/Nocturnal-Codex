---
title: "Grep & Regular Expressions"
description: "Searching for patterns in files and command output"
---

## What is Grep?

**`grep`** (Global Regular Expression Print) is the standard tool for searching text in the shell. It searches through files (or input from a pipe) and prints every line that matches a specific pattern.

```bash
grep "ERROR" system.log
```

## Common Flags

| Flag | Meaning | Description |
| :--- | :--- | :--- |
| **-i** | Case-Insensitive | Ignore capital letters |
| **-v** | Invert | Show lines that DON'T match |
| **-r** | Recursive | Search through all files in all subdirectories |
| **-l** | List | Show only the names of files that contain the match |
| **-n** | Numbers | Show the line numbers |
| **-E** | Extended | Enable modern RegEx features (like `|` or `+`) |

## Regular Expressions

Grep becomes truly powerful when you use **Regular Expressions** to describe the shape of the text you are looking for.

```bash
# Find lines that start with 'root'
grep "^root" /etc/passwd

# Find lines that end with 'sh'
grep "sh$" /etc/passwd
```

Wait! Use **`grep -E`** (or `egrep`) to use the "Extended" syntax, which is much closer to what you find in Python or JavaScript.

## Summary

| Term | Description |
| :--- | :--- |
| **grep** | Standard search tool |
| **egrep** | Grep with Extended RegEx |
| **^** | Matches the start of a line |
| **$** | Matches the end of a line |
| **.** | Matches any single character |
| **\*** | Matches 0 or more of the previous character |
| **Best For** | Searching logs, finding files, and filtering data |
| **Logic** | "Textual pattern discovery" |
| **Safety** | Grep is extremely fast and safe for massive files |
| **Modern** | Tools like `ripgrep` (rg) are modern, faster alternatives |
| **Standard** | Available on every Unix/Linux/Mac system |
| **Identity** | The "Grep" name is so famous it became a verb ("Grep that log") |
