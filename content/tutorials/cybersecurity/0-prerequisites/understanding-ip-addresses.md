---
title: "Understanding IP Addresses"
slug: "understanding-ip-addresses"
order: 4
category: "0. Prerequisites"
description: "A clear explanation of IPv4 and IPv6 addresses, the difference between public and private IPs, and their role in computer networking."
tags: ["prerequisites", "networking", "ip address"]
---

## Introduction

Every device connected to a network, including the internet, needs a unique identifier so that data can be sent to and from it correctly. In the world of TCP/IP networking, this identifier is the **Internet Protocol (IP) Address**.

Think of an IP address as a mailing address for your computer. If you want to receive a package (data), you need to provide a unique address where it can be delivered. For a cybersecurity professional, IP addresses are fundamental to tracking activity, identifying threats, and configuring security devices.

---

## 1. IPv4 - The Workhorse of the Internet

**Internet Protocol version 4 (IPv4)** has been the standard for decades. It's a 32-bit number, which means there is a total of $2^{32}$ (about 4.3 billion) possible addresses.

* **Structure:** It's represented as four blocks of numbers, each ranging from 0 to 255, separated by dots. This is called dot-decimal notation.
* **Example:** `172.217.167.78` (This is one of Google's IP addresses).
* **The Problem:** The world has run out of new IPv4 addresses due to the massive growth of the internet. This led to the development of its successor, IPv6.

---

## 2. IPv6 - The Next Generation

**Internet Protocol version 6 (IPv6)** is the modern standard, created to solve the address exhaustion problem of IPv4. It is a 128-bit number, providing a virtually limitless number of unique addresses ($2^{128}$).

* **Structure:** It's represented as eight blocks of four hexadecimal digits, separated by colons.
* **Example:** `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
* **Adoption:** While adoption is growing, the entire internet is still in a long transition period from IPv4 to IPv6. Both are used simultaneously.

---

## 3. Public vs. Private IP Addresses

Not all IP addresses are visible on the public internet. They are separated into two categories:

* **Public IP Address:** This is the address assigned to you by your Internet Service Provider (ISP). It is unique across the entire internet and is the address that external servers see when you visit a website.
* **Private IP Address:** This address is used within a private, local network (like your home Wi-Fi). Devices inside your home (laptop, phone, smart TV) each have a unique private IP address, but they all share the *same* public IP address when accessing the internet. This is made possible by a process called **Network Address Translation (NAT)**, typically handled by your router.

**Common Private IP Ranges:**
* `10.0.0.0` to `10.255.255.255`
* `172.16.0.0` to `172.31.255.255`
* `192.168.0.0` to `192.168.255.255`

**Cybersecurity Relevance:** An attacker's public IP address is a key piece of information for tracking them. Firewalls are configured to block traffic from known malicious public IP addresses. Understanding the difference between public and private IPs is crucial for network forensics and incident response.

---

## Key Takeaways

* An **IP Address** is a unique identifier for a device on a network.
* **IPv4** is the older, 32-bit standard, while **IPv6** is the newer, 128-bit standard created to provide more addresses.
* A **Public IP** is your unique address on the global internet.
* A **Private IP** is your address on a local network (e.g., behind a router).
* Security tools and logs are filled with IP addresses; understanding them is non-negotiable for any security role.

---

**Up Next:** Interacting with many security tools and servers requires proficiency with a text-based interface. It's time to learn about the most common one. The next article is **Introduction to the Linux CLI**.
