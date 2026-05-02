---
title: "Data Import & Export"
description: "Reading CSV, Excel, and SQL data into R"
---

## Getting Data In

**R** can read data from almost any source. The most common format is **CSV**.

```r
# Base R
data <- read.csv("data.csv")

# Tidyverse (Faster and smarter)
library(readr)
data <- read_csv("data.csv")
```

## Supported Formats

| Format | Library | Function |
| :--- | :--- | :--- |
| **CSV** | `readr` | `read_csv()` |
| **Excel** | `readxl` | `read_excel()` |
| **JSON** | `jsonlite` | `fromJSON()` |
| **SQL** | `DBI` | `dbGetQuery()` |
| **SPSS/Stata** | `haven` | `read_spss()` |

## Exporting Data

Saving your results is just as easy.

```r
write_csv(data, "results.csv")
```

Wait! If you want to save an R object and its exact state (including types and factor levels), use the **`.rds`** format.

```r
saveRDS(data, "my_data.rds")
new_data <- readRDS("my_data.rds")
```

## Connecting to Databases

R can connect directly to production databases (PostgreSQL, MySQL, BigQuery, etc.). This allows you to pull the exact data you need without manual exports.

## Summary

| Term | Description |
| :--- | :--- |
| **CSV** | Comma-Separated Values |
| **Header** | The first row containing column names |
| **Delimiter** | The character separating values (comma, tab, etc.) |
| **Working Dir**| Use `getwd()` and `setwd()` to manage where R looks for files |
| **Best For** | Getting raw data into your analytical pipeline |
| **Logic** | "Data accessibility" |
| **Safety** | Modern functions automatically handle malformed rows |
| **Modern** | `readr` and `vroom` are significantly faster than base R |
| **Standard** | Always use `stringsAsFactors = FALSE` (default in R 4.0+) |
| **Identity** | R's ability to handle "Messy" data is world-class |
