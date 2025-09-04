---
title: "Introduction to the Linux Command-Line"
slug: "introduction-to-linux-cli"
order: 5
description: "Learn the essential commands for navigating and interacting with the Linux operating system, a critical skill for any cybersecurity professional."
category: "0. Prerequisites"
tags: ["0. Prerequisites"]
---

## Introduction

The **Command-Line Interface (CLI)** is a powerful text-based interface used to interact with the operating system. While graphical user interfaces (GUIs) are common, the CLI offers more speed, power, and scriptability, making it an essential tool for system administrators and cybersecurity professionals.

Linux is the dominant operating system for servers, cloud infrastructure, and security tools, so mastering its CLI is non-negotiable.

---

## 1. Navigating the File System

Your file system is a tree of directories (folders) and files. Here are the core commands for moving around.

  * **`pwd` (Print Working Directory):** Shows your current location.
    ```bash
    pwd
    # Output: /home/user
    ```

  * **`ls` (List):** Lists the files and directories in the current location.
    ```bash
    ls
    # Output: Desktop Documents Downloads
    ```
    *   **Common Flag:** `ls -la` lists *all* files (including hidden ones, which start with a `.`) in a *long* format, showing permissions, owner, and size.

  * **`cd` (Change Directory):** Moves you to a different directory.
    ```bash
    # Move to the 'Documents' directory
    cd Documents

    # Move back up one level
    cd ..

    # Go directly to your home directory
    cd ~
    ```

-----

## 2. Working with Files and Directories

  * **`touch`:** Creates an empty file.
    ```bash
    touch new_file.txt
    ```

  * **`mkdir` (Make Directory):** Creates a new directory.
    ```bash
    mkdir new_folder
    ```

  * **`cp` (Copy):** Copies files or directories.
    ```bash
    # Copy a file
    cp source.txt destination.txt
    ```

  * **`mv` (Move):** Moves or renames files and directories.
    ```bash
    # Rename a file
    mv old_name.txt new_name.txt

    # Move a file into a directory
    mv new_name.txt ./new_folder/
    ```

  * **`rm` (Remove):** Deletes files.
    ```bash
    rm file_to_delete.txt
    ```
    *   **Warning:** `rm` is permanent! There is no "Recycle Bin."
    *   **To remove an empty directory:** `rmdir folder_name`
    *   **To remove a directory and all its contents (use with extreme caution):** `rm -r folder_name`

  * **`cat` (Concatenate):** Displays the content of a file.
    ```bash
    cat important_notes.txt
    ```

-----

## 3. Getting Help

* **`man` (Manual):** Displays the manual page for a command.
  ```bash
  man ls
  ```
  (Press `q` to quit the manual.)

## Key Takeaways

*   The Linux CLI is a foundational tool for cybersecurity.
*   Mastering basic navigation (`pwd`, `ls`, `cd`) and file manipulation (`touch`, `cp`, `mv`, `rm`) is the first step.
*   Always be careful with the `rm` command, especially with the `-r` flag.

---

**Up Next:** To be a well-rounded professional, you also need to be familiar with the command line on the world's most popular desktop OS. The next article is **Introduction to Windows CMD & PowerShell**.
