---
title: "Variables"
description: "User variables, environment variables, and special shell variables"
---

## Defining Variables

In **Shell**, you define a variable by assigning a value without spaces around the **`=`** sign. To use the variable, you prefix its name with a **`$`**.

```bash
name="Alpha"
echo "Hello $name"
```

Wait! If you include spaces (`name = "Alpha"`), Bash will try to run a command named `name` with arguments `=` and `"Alpha"`. **No spaces!**

## Quotes Matter

1.  **Double Quotes (`" "`)**: Variables are "expanded" (the value is inserted).
2.  **Single Quotes (`' '`)**: The text is taken literally (no expansion).

```bash
echo "Hello $name" # Hello Alpha
echo 'Hello $name' # Hello $name
```

## Environment Variables

These are variables that are available to all programs running in the current shell session. You create them using the **`export`** command.

```bash
export PATH="/usr/local/bin:$PATH"
export API_KEY="secret_123"
```

## Special Variables

| Variable | Description |
| :--- | :--- |
| **$0** | The name of the script itself |
| **$1, $2...** | The arguments passed to the script |
| **$#** | The number of arguments passed |
| **$?** | The "Exit Status" of the last command (0 = Success) |
| **$$** | The Process ID (PID) of the current shell |

## Summary

| Term | Description |
| :--- | :--- |
| **var=val** | Local variable assignment |
| **export** | Making a variable global (Environment) |
| **$(command)** | "Command Substitution" - Storing the output of a command in a variable |
| **${var}** | Braces for clear variable boundaries (e.g., `${name}_file`) |
| **readonly** | Creating a constant variable |
| **Best For** | Storing configuration and temporary data |
| **Logic** | "Global and Local state management" |
| **Safety** | Always quote your variables to prevent "Word Splitting" errors |
| **Modern** | Environment variables are the standard way to configure cloud apps |
| **Standard** | Use `UPPERCASE` for environment variables; `lowercase` for local |
| **Identity** | Variables in shell are all strings by default |
