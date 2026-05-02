---
title: "Data Wrangling"
description: "Mastering dplyr: filtering, grouping, and mutating data"
---

## What is dplyr?

**`dplyr`** is the grammar of data manipulation in **R**. It provides a set of "verbs" (functions) that solve the most common data transformation challenges.

## The Five Main Verbs

1.  **`filter()`**: Pick observations based on their values.
2.  **`select()`**: Pick variables (columns) by their names.
3.  **`mutate()`**: Create new variables as functions of existing ones.
4.  **`arrange()`**: Reorder the rows.
5.  **`summarize()`**: Collapse many values down to a single summary (e.g., mean).

```r
results <- df %>%
  filter(age > 18) %>%
  select(name, score) %>%
  mutate(percent = score / 100) %>%
  arrange(desc(percent))
```

## Grouping Logic

Wait! The real power of `dplyr` comes from **`group_by()`**. This allows you to perform calculations for specific categories within your data.

```r
# Calculate average score by country
summary_data <- df %>%
  group_by(country) %>%
  summarize(
    avg_score = mean(score, na.rm = TRUE),
    total_count = n()
  )
```

## Why use dplyr?

-   **Intuitive**: The code reads like a story.
-   **Fast**: Written in C++ for high performance.
-   **Flexible**: Works with Data Frames, Tibbles, and even remote Database tables.

## Summary

| Verb | Description |
| :--- | :--- |
| **filter** | Keeping specific rows |
| **select** | Keeping specific columns |
| **mutate** | Adding new columns |
| **summarize**| Aggregating data (Mean, Sum, etc.) |
| **group_by** | Segmenting your analysis |
| **arrange** | Sorting |
| **Best For** | Cleaning and preparing data for modeling or visualization |
| **Logic** | "Data transformation as a sequence of steps" |
| **Safety** | Prevents "Off-by-one" errors common in manual loops |
| **Modern** | The industry standard for data cleaning |
| **Standard** | Use the pipe (`%>%`) to chain these verbs together |
| **Identity** | The "Workhorse" of the Tidyverse |
| **join** | Merging two data frames (`left_join`, `inner_join`) |
