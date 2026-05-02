---
title: "Interactive Plots"
description: "Zooming, hovering, and dynamic charts with Plotly"
---

## Beyond Static Images

While `ggplot2` creates beautiful static images, sometimes you need a plot that your users can interact with. In **R**, the **`plotly`** package allows you to turn your charts into interactive HTML widgets.

```r
library(plotly)

p <- ggplot(mtcars, aes(wt, mpg)) + geom_point()

# Convert a static ggplot to an interactive one!
ggplotly(p)
```

Wait! With just that one function, your users can now:
-   **Hover** to see exact data values.
-   **Zoom** in on specific areas.
-   **Click** legends to toggle data visibility.
-   **Download** the plot as a high-res image.

## Leaflet (Interactive Maps)

If you have geographic data, **`leaflet`** is the standard for interactive maps.

```r
library(leaflet)

leaflet() %>%
  addTiles() %>% # Add default OpenStreetMap map tiles
  addMarkers(lng=174.768, lat=-36.852, popup="The birthplace of R")
```

## Shiny: Interactive Apps

Wait! If you want to build a complete dashboard or an interactive web application using only R (no HTML/CSS/JS required), use **Shiny**. It allows you to create sliders, inputs, and reactive outputs that update as the user interacts with them.

## Summary

| Term | Description |
| :--- | :--- |
| **Plotly** | Turn static charts into interactive ones |
| **Leaflet** | Interactive maps |
| **Shiny** | Full-stack interactive web apps in R |
| **Widget** | A standalone interactive component |
| **HTML** | The format used for interactive output |
| **Best For** | Dashboards, presentations, and data exploration |
| **Logic** | "Let the user discover the data" |
| **Safety** | Interactive plots are great for finding "hidden" outliers |
| **Modern** | Highly used in business intelligence (BI) reports |
| **Standard** | Integrates perfectly with R Markdown and Shiny |
| **Identity** | Known for high engagement in online data journalism |
