---
title: "Time Series"
description: "Forecasting and analyzing trends over time in R"
---

## What is Time Series?

A **Time Series** is a sequence of data points indexed in time order. **R** is a world leader in time series analysis, thanks to its deep statistical heritage. It is used for forecasting stock prices, weather patterns, and sales trends.

## The `ts` object

In base R, you convert a vector into a time series using the `ts()` function.

```r
sales_ts <- ts(sales_data, start = c(2020, 1), frequency = 12)
```

## Decomposing Trends

Wait! Any time series can be broken down into three components:
1.  **Trend**: The long-term direction (up or down).
2.  **Seasonality**: Repeating patterns (e.g., higher sales every December).
3.  **Noise**: Random variation.

```r
plot(decompose(sales_ts))
```

## Forecasting with `fable`

Modern R uses the **`tidyverts`** ecosystem (specifically the `fable` package) for forecasting.

```r
library(fable)

# Automatically choose the best model (ARIMA or ETS)
fit <- df %>%
  model(arima = ARIMA(sales))

# Forecast 12 months into the future
forecast(fit, h = "1 year") %>%
  autoplot(df)
```

## Summary

| Term | Description |
| :--- | :--- |
| **ARIMA** | A popular statistical model for forecasting |
| **Seasonality**| Patterns that repeat over a fixed period |
| **Lag** | Looking at the previous time point's value |
| **Stationary** | A series whose properties don't change over time |
| **Best For** | Finance, Economics, and Demand Planning |
| **Logic** | "The past informs the future" |
| **Safety** | Beware of "Black Swan" events that history can't predict |
| **Modern** | The `tsibble` package provides a tidy way to handle time series data |
| **Standard** | Officially used by central banks and government agencies |
| **Identity** | R's `forecast` package is the most cited in the world |
