---
title: "Statistical Tests"
description: "Hypothesis testing, T-tests, ANOVA, and P-values in R"
---

## The Heart of R

**R** was built by statisticians, for statisticians. As a result, performing complex statistical tests is incredibly easy. Most tests follow a simple formula syntax: **`y ~ x`** (read as "y depends on x").

## 1. T-Tests (Comparing Means)

Used to check if there is a significant difference between the means of two groups.

```r
# Comparing two groups
t.test(score ~ group, data = df)
```

## 2. ANOVA (Comparing Multiple Means)

Used when you have more than two groups to compare.

```r
model <- aov(score ~ category, data = df)
summary(model)
```

## 3. Correlation

Checking how two variables are related to each other.

```r
cor(df$height, df$weight)
cor.test(df$height, df$weight)
```

## 4. Linear Regression (`lm`)

Wait! Linear regression is one of the most common tasks in R. The `lm()` function creates a model that describes the relationship between variables.

```r
model <- lm(price ~ size + location, data = house_data)
summary(model) # Gives you the R-squared and P-values
```

## Understanding P-Values

Wait! In R, a **P-value** less than **0.05** is usually considered "Statistically Significant." R provides these values automatically in the `summary()` of almost every test.

## Summary

| Test | Function | Description |
| :--- | :--- | :--- |
| **T-Test** | `t.test()` | Difference between 2 means |
| **ANOVA** | `aov()` | Difference between 3+ means |
| **Chi-Square** | `chisq.test()` | Relationship between categories |
| **Regression** | `lm()` | Predicting one value from others |
| **Summary** | `summary()` | View the detailed results |
| **Best For** | Scientific research, A/B testing, and hypothesis validation |
| **Logic** | "Is the effect I'm seeing real or just noise?" |
| **Safety** | Check your "Assumptions" (Normal distribution, etc.) before testing |
| **Modern** | The `broom` package can turn test results into clean Data Frames |
| **Standard** | Officially used by clinical researchers and economists |
| **Identity** | R is the "Truth" language for statistics |
