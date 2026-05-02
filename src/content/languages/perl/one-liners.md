---
title: "One-liners"
description: "Performing complex tasks in a single command line"
---

## What is a One-liner?

A **Perl One-liner** is a complete Perl program executed directly from the terminal using the **`-e`** flag. Perl is famous for being able to do in one line what other languages take 20 lines to accomplish.

## The Essential Flags

| Flag | Meaning | Description |
| :--- | :--- | :--- |
| **-e** | Execute | The code that follows is the program |
| **-n** | Loop | Wraps your code in a `while(<>) { ... }` loop |
| **-p** | Print | Like `-n`, but automatically prints `$_` after each loop |
| **-i** | In-place | Edit the file directly (danger!) |
| **-a** | Autosplit | Automatically splits `$_` into an array `@F` based on whitespace |
| **-F** | Field Sep | Used with `-a` to define the split character (e.g., `-F:`) |

## Examples

### 1. Search and Replace in a file
```bash
perl -pi -e 's/apple/orange/g' data.txt
```

### 2. Print lines matching a pattern (grep-like)
```bash
perl -ne 'print if /ERROR/' logs.txt
```

### 3. Print the first column of a CSV (cut-like)
```bash
perl -F: -ane 'print "$F[0]\n"' /etc/passwd
```

### 4. Count the number of lines
```bash
perl -ne 'END { print $. }' file.txt
```

## Why use One-liners?

Wait! One-liners are perfect for **System Administration** and **DevOps**. They are faster than writing a script and more powerful than standard Unix tools like `sed` or `awk` because you have the full power of Perl and its RegEx at your fingertips.

## Summary

| Term | Description |
| :--- | :--- |
| **-e** | The "Execute" flag |
| **-p** | "Print" after every line |
| **-i.bak** | Edit in-place and create a backup file |
| **$.** | The current line number |
| **$.** | The "End" block (runs after the file is processed) |
| **Best For** | Fast file edits, data extraction, and sysadmin tasks |
| **Logic** | "Concise power in the terminal" |
| **Safety** | Always test without `-i` first! |
| **Modern** | Essential for any "Power User" of the terminal |
| **Standard** | Part of the POSIX standard (found on all Linux/Mac) |
| **Identity** | The reason Perl is called the "Swiss Army Chainsaw" |
