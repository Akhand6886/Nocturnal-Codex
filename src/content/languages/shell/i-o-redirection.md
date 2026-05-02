---
title: "I/O Redirection"
description: "Pipes, Standard Streams, and redirecting data in the shell"
---

## Standard Streams

Every program in the shell starts with three standard "Files" open:

1.  **`stdin` (0)**: Standard Input (keyboard or data from another program).
2.  **`stdout` (1)**: Standard Output (the terminal screen).
3.  **`stderr` (2)**: Standard Error (error messages, also usually the screen).

## Redirecting to Files

| Operator | Action | Description |
| :--- | :--- | :--- |
| **>** | Overwrite | Save output to a file (Deletes old content) |
| **>>** | Append | Add output to the end of a file |
| **2>** | Error | Redirect only error messages |
| **&>** | All | Redirect BOTH output and errors |

```bash
ls > files.txt       # Save list to file
ls 2> errors.txt     # Save errors only
ls &> /dev/null      # Silence everything!
```

## Pipes (`|`)

Wait! This is the most powerful concept in the shell. A **Pipe** takes the `stdout` of the first command and "pipes" it as the `stdin` of the second command. This allows you to chain small, simple tools together to solve complex problems.

```bash
# Find all processes, search for 'node', and count them
ps aux | grep node | wc -l
```

## Input Redirection (`<`)

You can tell a command to read its input from a file instead of the keyboard.

```bash
wc -l < data.txt
```

## Summary

| Term | Description |
| :--- | :--- |
| **|** | The Pipe (The "Glue" of Unix) |
| **>** | Redirecting output to a file |
| **<** | Redirecting input from a file |
| **2>&1** | Sending errors to the same place as standard output |
| **/dev/null** | The "Black Hole" - discard all output |
| **tee** | Send output to a file AND the screen at the same time |
| **Best For** | Building complex data processing pipelines |
| **Logic** | "Small tools connected by pipes" |
| **Safety** | Redirect errors (`2>`) to logs for debugging |
| **Modern** | Essential for managing cloud logs and CI/CD pipelines |
| **Standard** | Part of the fundamental Unix philosophy |
| **Identity** | The "Pipe" logo is often the symbol for shell power |
