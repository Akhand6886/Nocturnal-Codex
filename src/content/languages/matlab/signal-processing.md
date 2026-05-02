---
title: "Signal Processing"
description: "FFT, Filtering, and the Signal Processing Toolbox in MATLAB"
---

## What is Signal Processing?

**Signal Processing** is the math of manipulating data streams (audio, radio, medical signals). **MATLAB** is the undisputed world leader in this field. It provides a massive collection of functions to analyze and filter signals.

## 1. Fast Fourier Transform (FFT)

Wait! The **FFT** is the most important tool in signal processing. it converts a signal from the "Time Domain" (what it looks like over time) to the "Frequency Domain" (what notes or frequencies it contains).

```matlab
Y = fft(signal);
P2 = abs(Y/L);
plot(f, P2) % Plotting the frequency spectrum
```

## 2. Filtering

You can remove noise from a signal using digital filters like **Butterworth** or **Chebyshev**.

```matlab
[b, a] = butter(6, 0.2); % Create a 6th order low-pass filter
filtered_signal = filter(b, a, noisy_signal);
```

## 3. Spectrograms

A **Spectrogram** allows you to see how the frequency of a signal changes over time. It is used heavily in speech recognition and music analysis.

```matlab
spectrogram(signal, hamming(128), 120, 128, fs, 'yaxis')
```

## Why use MATLAB?

-   **High Precision**: MATLAB's algorithms are verified by decades of engineering use.
-   **Interactive Apps**: Use the **Filter Designer** to visually design and test your filters before writing any code.
-   **Hardware Interop**: You can stream signals directly from your sound card, a software-defined radio (SDR), or an Arduino.

## Summary

| Term | Description |
| :--- | :--- |
| **FFT** | Fast Fourier Transform |
| **Filter** | Removing unwanted parts of a signal |
| **Sampling** | The rate at which the signal was recorded (Hz) |
| **Spectrum** | The range of frequencies in a signal |
| **Nyquist** | The rule that says you must sample at 2x the max frequency |
| **Best For** | Audio, Radar, Medical Imaging, and Communications |
| **Logic** | "Mathematical manipulation of data streams" |
| **Safety** | High-precision floating point math prevents signal distortion |
| **Modern** | Powering modern 5G and AI-based signal analysis |
| **Standard** | Officially used by companies like NASA, Boeing, and Apple |
| **Identity** | The #1 reason engineers buy MATLAB |
