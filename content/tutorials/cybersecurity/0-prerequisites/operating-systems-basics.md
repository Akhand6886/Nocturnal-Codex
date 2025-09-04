---
title: "Operating Systems Basics"
description: "Learn what an operating system (OS) is, its core functions, and why it is a critical battleground in cybersecurity."
tags: ["prerequisites", "os", "systems"]
---

## Introduction

If hardware components are the body of a computer, the **Operating System (OS)** is its soul. The OS is the most important piece of software on any computer, acting as the intermediary between you (the user) and the physical hardware. It manages everything from your mouse clicks to the complex scheduling of CPU tasks.

For a cybersecurity professional, the OS is often the main target of an attack and the primary environment that must be defended.

---

## 1. What is an Operating System?

An **Operating System** is a powerful software program that manages computer hardware and software resources, and provides common services for computer programs. The three most common operating systems for personal computers are Microsoft Windows, macOS, and Linux.

The OS has four primary jobs:
* **Process Management:** Manages which programs get to use the CPU and for how long.
* **Memory Management:** Allocates and deallocates RAM to different programs.
* **File System Management:** Organizes and keeps track of files on the hard drive.
* **Device Management:** Controls hardware devices through their drivers (e.g., printers, webcams, keyboards).

---

## 2. The Kernel: The Core of the OS

The **Kernel** is the central component of an operating system. It has complete control over everything in the system. It's the first program loaded on start-up and it handles the rest of the start-up process, as well as input/output requests from software, translating them into data-processing instructions for the CPU.

* **Analogy:** If the OS is the government of a country, the kernel is the head of state. It has the ultimate authority and makes the most critical decisions.
* **Cybersecurity Relevance:** An attacker who compromises the kernel gains complete control over the system. This level of access is often called "root" on Linux/macOS or "SYSTEM" on Windows. Kernel-level exploits are among the most severe vulnerabilities.

---

## 3. Processes and Threads

* A **Process** is an instance of a computer program that is being executed. When you double-click an application icon, you are starting a new process.
* A **Thread** is the smallest sequence of programmed instructions that can be managed independently by a scheduler. A single process can contain multiple threads, allowing it to perform several tasks at once (e.g., a word processor spell-checking in the background while you type).

* **Cybersecurity Relevance:** Malware often runs as a hidden process or injects malicious threads into legitimate processes (like your web browser) to steal information or persist on a system. Security professionals use tools like the Task Manager (Windows) or `ps`/`top` (Linux) to monitor and analyze running processes.

---

## 4. File Systems and Permissions

A **File System** is how the OS organizes data on a storage device like a hard drive. It's a hierarchical structure of directories (folders) and files. Crucially, the file system also includes a set of rules, or **permissions**, that dictate who can read, write, and execute files.

* **Cybersecurity Relevance:** Incorrect file permissions are a common security flaw. If a sensitive configuration file is accidentally made writable by any user, an attacker could modify it to gain control of the system. Ransomware's primary goal is to encrypt the user's files within the file system, making them inaccessible.

---

## Key Takeaways

* The **OS** is the bridge between hardware and user applications.
* The **Kernel** is the core of the OS with the highest level of privilege.
* Malware often hides as a **process** or **thread**.
* Proper **file permissions** are a simple yet critical security control.
* Securing the OS ("hardening") is a fundamental task in defending any computer system.

---

**Up Next:** You've learned about the hardware (the body) and the OS (the soul). Now it's time to understand how computers talk to each other. The next article is **Networking Fundamentals (OSI, TCP/IP)**.