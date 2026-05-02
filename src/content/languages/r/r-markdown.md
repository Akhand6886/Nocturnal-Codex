---
title: "R Markdown"
description: "Reproducible reports, dashboards, and websites in R"
---

## What is R Markdown?

**R Markdown** is a file format for making dynamic documents with **R**. It combines plain text (written in Markdown) with "chunks" of R code. When you "knit" the document, R runs the code and embeds the results (tables, charts, text) into the final output.

## The Anatomy of an Rmd file

1.  **YAML Header**: Metadata about the document (Title, Author, Output format).
2.  **Narrative**: Plain text describing the analysis.
3.  **Code Chunks**: The actual R code, marked with ` ```{r} `.

```markdown
---
title: "Sales Report"
output: html_document
---

# Analysis
Below is the chart for this month.

```{r}
plot(sales)
```
```

## Why use R Markdown?

Wait! This is the secret to **Reproducible Science**. If your data changes, you don't have to copy and paste new charts into Word. You just click "Knit," and your entire report is automatically updated with the latest results.

## Output Formats

-   **HTML**: For websites and interactive reports.
-   **PDF**: For professional academic papers (uses LaTeX).
-   **Word**: For collaborating with non-coders.
-   **PowerPoint**: For presentations.

## Quarto: The Next Generation

Wait! **Quarto** is the successor to R Markdown. It supports R, Python, Julia, and Observable, allowing for even more powerful multi-language reporting.

## Summary

| Term | Description |
| :--- | :--- |
| **Knit** | The process of rendering the document |
| **YAML** | The configuration header |
| **Chunk** | A block of code inside the document |
| **Echo** | Option to show or hide the code in the output |
| **Message** | Option to show or hide console warnings |
| **Best For** | Reports, Papers, Documentation, and Websites |
| **Logic** | "Code and narrative in one place" |
| **Safety** | Ensures that the results actually match the code |
| **Modern** | Highly used in Data Science teams for communication |
| **Standard** | The standard for academic publishing in R |
| **Identity** | The #1 tool for professional communication in the R world |
