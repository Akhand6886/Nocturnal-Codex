---
id: r
name: R
slug: r
description: >-
  A language and environment for statistical computing, data analysis, and
  publication-quality visualization.
iconName: r
year: 1993
creator: 'Ross Ihaka, Robert Gentleman'
paradigm:
  - Functional
  - Object-Oriented
  - Procedural
useCases:
  - Statistical Analysis
  - Data Visualization
  - Bioinformatics
  - Academic Research
website: 'https://www.r-project.org/'
category: Data
featured: false
difficulty: Intermediate
topics:
  - section: Basics
    items:
      - title: Introduction to R
        description: 'RStudio, REPL, and the R ecosystem'
        slug: introduction-to-r
      - title: Data Types
        description: 'Vectors, factors, matrices, lists, and data frames'
        slug: data-types
      - title: Operators & Control Flow
        description: 'Vectorized operations, if/else, for, apply family'
        slug: operators-control-flow
      - title: Functions
        description: 'Function definition, scoping, and anonymous functions'
        slug: functions
  - section: Data Manipulation
    items:
      - title: Tidyverse
        description: 'dplyr, tidyr, stringr, and the pipe operator (%>%)'
        slug: tidyverse
      - title: Data Import/Export
        description: 'readr, readxl, and database connections'
        slug: data-import-export
      - title: Data Wrangling
        description: 'filter, mutate, group_by, summarise, joins'
        slug: data-wrangling
  - section: Visualization
    items:
      - title: ggplot2
        description: 'Grammar of Graphics, geoms, aesthetics, and themes'
        slug: ggplot2
      - title: Interactive Plots
        description: 'plotly, Shiny dashboards, and htmlwidgets'
        slug: interactive-plots
      - title: R Markdown
        description: 'Reproducible reports, Quarto, and literate programming'
        slug: r-markdown
  - section: Statistics & ML
    items:
      - title: Statistical Tests
        description: 't-test, chi-square, ANOVA, and regression'
        slug: statistical-tests
      - title: Machine Learning
        description: 'caret, tidymodels, random forests, and cross-validation'
        slug: machine-learning
      - title: Time Series
        description: 'ARIMA, forecasting, and zoo/xts packages'
        slug: time-series
---

## Overview

R is a programming language and software environment for statistical computing and graphics. It provides a wide variety of statistical techniques and graphical techniques through its extensive package ecosystem (CRAN with 19,000+ packages).

## Key Features

- **Statistical computing** — Built-in support for statistical tests, models, and distributions
- **ggplot2** — Grammar of graphics for publication-quality visualization
- **CRAN** — Over 19,000 contributed packages
- **R Markdown** — Reproducible reports combining code, results, and narrative
- **Vectorized operations** — Operate on entire vectors/matrices without explicit loops

## Code Example

```r
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
