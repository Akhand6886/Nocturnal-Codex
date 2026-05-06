---
title: "Information Theory"
slug: "information-theory"
description: "The mathematical study of the quantification, storage, and communication of information. The core of data compression and cryptography."
iconName: "math"
---

## Introduction to Information Theory

Proposed by Claude Shannon in 1948, Information Theory changed everything. It provided the mathematical proof that all communication—whether a phone call, a JPEG image, or a DNA sequence—can be measured and optimized.

### 1. Entropy: Measuring Uncertainty
- **Shannon Entropy**: Quantifies the amount of "surprise" or information in a random variable. 
- **Higher Entropy** means more randomness and more information needed to describe the state.
- *Application*: Decision Trees in ML use "Information Gain" (reduction in entropy) to decide which feature to split on.

### 2. Source Coding (Compression)
How can we represent information using the fewest bits possible?
- **Huffman Coding**: A variable-length coding algorithm used in ZIP files and JPEG images.
- **Lossy vs. Lossless**: Understanding the mathematical limits of what can be compressed without losing data.

### 3. Channel Coding (Error Correction)
How do we send data over "noisy" wires without it getting corrupted?
- **Checksums and CRC**: Basic error detection.
- **Hamming Codes and Reed-Solomon**: Advanced codes that can actually "fix" bit errors in real-time.
- *Application*: QR codes, Satellite communications, and ECC RAM.

### 4. Cryptography and Complexity
- **Bitwise Operations**: Using the properties of XOR for fast encryption.
- **Hash Functions**: Measuring the "avalanche effect"—where a small change in input leads to a massive change in the output entropy.

---

### The Pulse of the Digital Age
Information Theory is the reason we can stream 4K video over a thin wire and store thousands of books on a tiny chip. It defines the ultimate physical limits of computation.
