---
id: "matlab"
name: "MATLAB"
slug: "matlab"
description: "A numerical computing platform for engineering, scientific research, and mathematical modeling."
iconName: "mathworks"
year: 1984
creator: "Cleve Moler (MathWorks)"
paradigm: ["Procedural", "Object-Oriented", "Functional"]
useCases: ["Numerical Computing", "Signal Processing", "Control Systems", "Machine Learning"]
website: "https://www.mathworks.com/products/matlab.html"
category: "Data"
featured: false
difficulty: "Intermediate"
---

## Overview

MATLAB (Matrix Laboratory) is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. It allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages. MATLAB is widely used in academia and industry for engineering, scientific research, and mathematical modeling.

## Key Features

- **Matrix-first** — Every data type is a matrix; operations are vectorized by default
- **Toolboxes** — Specialized packages for signal processing, control systems, deep learning
- **Simulink** — Visual model-based design for dynamic systems
- **Live scripts** — Interactive documents combining code, output, and formatted text
- **GPU computing** — Accelerate computations with GPU arrays

## Code Example

```matlab
% MATLAB: Signal processing example
t = 0:0.001:1;
signal = sin(2*pi*50*t) + 0.5*sin(2*pi*120*t);
noisy = signal + 2*randn(size(t));

% FFT analysis
Y = fft(noisy);
f = (0:length(Y)-1) * 1000 / length(Y);
plot(f(1:500), abs(Y(1:500)));
title('Frequency Spectrum');
xlabel('Frequency (Hz)');
```

## Learning Resources

- [MATLAB Documentation](https://www.mathworks.com/help/matlab/)
- [MATLAB Onramp (Free)](https://matlabacademy.mathworks.com/)
- [MIT OpenCourseWare — MATLAB](https://ocw.mit.edu/)
