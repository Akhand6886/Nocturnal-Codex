---
title: "Basic Scripting with Python"
slug: "basic-scripting-with-python"
order: 7
description: "Learn the fundamentals of Python scripting for automation and cybersecurity tasks."
category: "0. Prerequisites"
tags: ["0. Prerequisites"]
---

## Introduction

So far, you've learned to execute commands one by one in the command line. But what if you need to run hundreds of commands, or perform a complex task that changes based on the results of a previous command? This is where scripting comes in.

A **script** is simply a text file containing a sequence of commands. Writing scripts allows you to **automate** repetitive tasks, create your own custom tools, and analyze data far more efficiently than you could manually. For cybersecurity professionals, scripting is a superpower.

We will use **Python** for our examples because it's easy to learn, incredibly powerful, and has become the de facto language for security automation and data analysis.

---

## 1. Core Scripting Concepts

Every useful script is built from a few fundamental building blocks.

* **Variables:** A way to store and label information for later use.
  ```python
  target_ip = "127.0.0.1"
  port_number = 80
  is_active = True
````

  * **Control Flow (`if`/`else`):** A way to make decisions in your script.

    ```python
    if is_active:
        print("The target is active.")
    else:
        print("The target is not active.")
    ```

  * **Loops (`for`):** A way to repeat an action multiple times.

    ```python
    ports_to_check = [22, 80, 443, 8080]

    for port in ports_to_check:
        print(f"Checking port {port}...")
    ```

-----

## 2. Your First Security Script: A Simple Port Scanner

Let's combine these concepts to build a basic tool. A **port scanner** is a program that checks which ports are "open" on a target computer, which can indicate which services are running. This is a fundamental step in reconnaissance.

This script will attempt to connect to a list of common ports on a given IP address.

```python
# Import the 'socket' library, which lets us make network connections
import socket

# --- Configuration ---
# The IP address you want to scan. 127.0.0.1 is your own computer.
target_ip = "127.0.0.1" 
# A list of common ports to check
ports_to_scan = [21, 22, 80, 443, 3306, 8080]

print(f"Scanning target: {target_ip}\n")

# --- The Main Logic ---
# Loop through each port in our list
for port in ports_to_scan:
    try:
        # Create a new socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        
        # Set a timeout so the script doesn't hang forever
        sock.settimeout(1.0)
        
        # Try to connect to the IP and port
        result = sock.connect_ex((target_ip, port))
        
        # If the result is 0, the connection was successful, meaning the port is open
        if result == 0:
            print(f"Port {port}: OPEN")
        # else:
            # You could add an 'else' here to print if a port is closed, but we'll keep it clean for now.
            # print(f"Port {port}: CLOSED")

        # Close the connection
        sock.close()

    except socket.error as err:
        print(f"Couldn't connect to server: {err}")

print("\nScan complete.")
```

-----

## Key Takeaways

  * **Scripting** allows you to automate tasks and build your own tools.
  * **Python** is the preferred language for many cybersecurity tasks due to its simplicity and powerful libraries.
  * Core concepts like **variables**, **control flow**, and **loops** are the building blocks of all scripts.
  * Even with a few lines of code, you can build powerful tools that mimic the functionality of real-world security software.

-----

**Congratulations!** You have completed the **Prerequisites** section of the Cybersecurity Roadmap. You now have the foundational knowledge of hardware, operating systems, networking, and scripting that will be essential for everything that comes next.

**Up Next:** It's time to officially begin your cybersecurity studies. The next section is **1. Security Foundations**, starting with the article **What is Cybersecurity?**
