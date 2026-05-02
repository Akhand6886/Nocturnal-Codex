---
title: "Plotting"
description: "Visualizing data in 2D and 3D with MATLAB"
---

## Creating Your First Plot

**MATLAB** is famous for its simple and powerful plotting commands. To create a basic line plot, you just need the `plot()` function.

```matlab
x = 0:0.1:10;
y = sin(x);
plot(x, y)
```

## Customizing the Plot

Wait! You can add labels, titles, and legends in just a few lines.

```matlab
title('Sine Wave')
xlabel('Time (s)')
ylabel('Amplitude')
grid on
```

## Multiple Data Sets

To add a second line to the same chart, use the **`hold on`** command.

```matlab
plot(x, sin(x))
hold on
plot(x, cos(x), 'r--') % Red dashed line
legend('Sine', 'Cosine')
```

## Common Plot Types

| Function | Description |
| :--- | :--- |
| **plot** | 2D Line plot |
| **scatter** | Scatter plot |
| **bar** | Bar chart |
| **histogram**| Frequency distribution |
| **pie** | Pie chart |
| **surf** | 3D Surface plot (Very famous in MATLAB!) |
| **contour** | 2D Contour plot |

## 3. Subplots

You can display multiple charts in a single window using **`subplot(rows, cols, index)`**.

```matlab
subplot(2, 1, 1); plot(x, y1);
subplot(2, 1, 2); plot(x, y2);
```

## Summary

| Term | Description |
| :--- | :--- |
| **figure** | Open a new plot window |
| **clf** | Clear the current figure |
| **axis** | Set the axis limits |
| **grid** | Turn on/off the grid lines |
| **saveas** | Save the plot to a file (PNG, PDF, etc.) |
| **Best For** | Visualizing scientific data and engineering results |
| **Logic** | "Visualize as you calculate" |
| **Safety** | High-precision rendering of mathematical functions |
| **Modern** | The `plot` command has been optimized for billions of data points |
| **Standard** | Use `xlabel`, `ylabel`, and `title` on every professional plot |
| **Identity** | The "Surface Plot" is the iconic image of MATLAB |
