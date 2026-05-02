---
title: "Data Visualization"
description: "The Grammar of Graphics: Mastering ggplot2"
---

## What is ggplot2?

**`ggplot2`** is a system for declaratively creating graphics, based on **The Grammar of Graphics**. You provide the data, tell ggplot2 how to map variables to aesthetics, what graphical primitives to use, and it takes care of the details.

```r
library(ggplot2)

ggplot(data = mtcars, aes(x = wt, y = mpg)) +
  geom_point() +
  geom_smooth(method = "lm") +
  labs(title = "Weight vs. Fuel Efficiency")
```

## The Layered Grammar

Wait! Building a plot in ggplot2 is like building a sandwich. You add layers using the **`+`** operator.

1.  **Data**: What are you plotting?
2.  **Aesthetics (`aes`)**: Which variables map to the X-axis, Y-axis, Color, or Size?
3.  **Geometries (`geom`)**: How should the data be represented? (Points, Bars, Lines, etc.)
4.  **Facets**: Should the plot be split into sub-plots?
5.  **Themes**: What should the overall "look" be?

## Common Geometries

| Geom | Plot Type |
| :--- | :--- |
| **geom_point()** | Scatter Plot |
| **geom_line()** | Line Chart |
| **geom_bar()** | Bar Chart |
| **geom_boxplot()**| Box Plot |
| **geom_histogram()**| Histogram |
| **geom_density()** | Density Plot |

## Faceting

Wait! You can create multiple small charts for different categories in just one line using **`facet_wrap()`**.

```r
ggplot(df, aes(x, y)) + geom_point() + facet_wrap(~category)
```

## Summary

| Term | Description |
| :--- | :--- |
| **aes** | Aesthetic mapping (Connecting data to visuals) |
| **geom** | The type of plot |
| **labs** | Labels (Title, Subtitle, Axis names) |
| **theme** | The stylistic look (e.g., `theme_minimal()`) |
| **+** | The operator used to add layers |
| **Best For** | Creating high-quality, professional data visualizations |
| **Logic** | "Declarative plotting: Describe WHAT, not HOW" |
| **Safety** | Automatic scaling and legend generation |
| **Modern** | The most popular visualization library in the world |
| **Standard** | Used by data journalists and researchers globally |
| **Identity** | The "Masterpiece" of the R ecosystem |
| **Scalability** | Handles millions of points efficiently |
