---
id: "r"
name: "R"
slug: "r"
description: "A language and environment for statistical computing, data analysis, and publication-quality visualization."
iconName: "r"
year: 1993
creator: "Ross Ihaka, Robert Gentleman"
paradigm: ["Functional", "Object-Oriented", "Procedural"]
useCases: ["Statistical Analysis", "Data Visualization", "Bioinformatics", "Academic Research"]
website: "https://www.r-project.org/"
category: "Data"
featured: false
difficulty: "Intermediate"
---

## Overview

R is a programming language and software environment for statistical computing and graphics. It is widely used among statisticians and data miners for developing statistical software and data analysis. R provides a wide variety of statistical techniques (linear and nonlinear modelling, classical statistical tests, time-series analysis, classification, clustering) and graphical techniques through its extensive package ecosystem (CRAN).

## Key Features

- **Statistical computing** — Built-in support for statistical tests, models, and distributions
- **ggplot2** — Grammar of graphics for publication-quality visualization
- **CRAN** — Over 19,000 contributed packages
- **R Markdown** — Reproducible reports combining code, results, and narrative
- **Vectorized operations** — Operate on entire vectors/matrices without explicit loops

## Code Example

```r
# R data analysis with tidyverse
library(dplyr)
library(ggplot2)

mtcars %>%
  filter(mpg > 20) %>%
  group_by(cyl) %>%
  summarise(avg_hp = mean(hp), count = n()) %>%
  ggplot(aes(x = factor(cyl), y = avg_hp, fill = factor(cyl))) +
  geom_col() +
  labs(title = "Average HP by Cylinder Count (MPG > 20)")
```

## Learning Resources

- [R for Data Science](https://r4ds.hadley.nz/)
- [CRAN Task Views](https://cran.r-project.org/web/views/)
- [RStudio Education](https://education.rstudio.com/)
