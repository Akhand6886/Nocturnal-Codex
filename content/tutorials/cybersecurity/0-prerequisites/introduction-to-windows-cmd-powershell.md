---
title: "Introduction to Windows Cmd & PowerShell"
slug: "introduction-to-windows-cmd-powershell"
order: 6
description: "A guide to the two primary command line interfaces in Windows: the traditional Command Prompt (Cmd) and the modern, powerful PowerShell."
category: "0. Prerequisites"
tags: ["0. Prerequisites"]
---

## Introduction

While Linux dominates the server world, Microsoft Windows is the most widely used desktop operating system in corporate environments. As a cybersecurity professional, you will frequently encounter, analyze, and defend Windows systems. Therefore, understanding its command line tools is just as important as knowing the Linux CLI.

Windows offers two primary command line shells: the classic **Command Prompt (Cmd)** and the modern **PowerShell**.

---

## 1. The Command Prompt (Cmd.exe)

The Command Prompt is the traditional, legacy shell for Windows. It has been around for a long time and is simple and direct. While less powerful than PowerShell, it's quick, reliable, and present on virtually every Windows machine.

### Basic Cmd Commands

Many commands are similar in concept to their Linux counterparts, but with different names.

* **`dir` (Directory):** Lists the files and directories in the current location. (Similar to `ls`)
  ```cmd
  dir
```

  * **`cd` (Change Directory):** Moves you to a different directory. (Identical to Linux)

    ```cmd
    REM Move into a folder named 'Users'
    cd Users

    REM Move back up one level
    cd ..
    ```

  * **`mkdir` (Make Directory):** Creates a new directory. (Identical to Linux)

    ```cmd
    mkdir NewFolder
    ```

  * **`type` (Type):** Displays the content of a text file. (Similar to `cat`)

    ```cmd
    type config.txt
    ```

  * **`del` (Delete):** Deletes a file. (Similar to `rm`)

    ```cmd
    del file_to_delete.txt
    ```

-----

## 2. PowerShell - The Modern Shell

**PowerShell** is a much more advanced command line shell and scripting language. Unlike traditional shells that work with text, PowerShell works with **objects**. This makes it incredibly powerful for system administration and automation.

PowerShell commands, called **cmdlets**, follow a `Verb-Noun` naming convention, like `Get-Process` or `Set-Location`. Many cmdlets also have shorter aliases, including ones that mimic Linux commands.

### Basic PowerShell Commands

  * **`Get-ChildItem` (List Children):** Lists files and directories. Its aliases are `gci`, `dir`, and `ls`.

    ```powershell
    Get-ChildItem
    ```

  * **`Set-Location` (Set Location):** Changes the current directory. Its aliases are `sl`, `cd`.

    ```powershell
    Set-Location -Path C:\Users\
    ```

  * **`New-Item` (New Item):** Creates a new file or directory.

    ```powershell
    # Create a new directory
    New-Item -ItemType Directory -Name "NewFolder"

    # Create a new file
    New-Item -ItemType File -Name "new_file.txt"
    ```

  * **`Get-Content` (Get Content):** Displays the content of a file. Its aliases are `gc`, `type`, and `cat`.

    ```powershell
    Get-Content -Path .\config.txt
    ```

  * **`Remove-Item` (Remove Item):** Deletes a file or directory. Its aliases are `ri`, `del`, and `rm`.

    ```powershell
    Remove-Item -Path .\file_to_delete.txt
    ```

-----

## Key Takeaways

  * Windows systems are a major part of the corporate landscape, making Windows CLI skills essential.
  * **Cmd.exe** is the simple, traditional shell, good for quick and basic tasks.
  * **PowerShell** is the modern, object-oriented shell, essential for advanced administration and automation.
  * Many PowerShell cmdlets have aliases that are familiar to Linux users (e.g., `ls`, `cd`, `rm`).
  * As a security professional, you'll use PowerShell to hunt for threats, automate security tasks, and perform forensic analysis on Windows systems.

-----

**Up Next:** You've now been introduced to the command line on both major platforms. The final prerequisite is to learn the basics of a language that can automate your work on any system. The next article is **Basic Scripting with Python**.
