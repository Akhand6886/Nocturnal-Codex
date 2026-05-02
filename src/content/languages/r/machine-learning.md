---
title: "Machine Learning"
description: "Classification, Regression, and the Tidymodels framework"
---

## ML in R

While Python has `scikit-learn`, **R** has a powerful and consistent framework called **`tidymodels`**. It brings the same clean philosophy of the Tidyverse to machine learning.

```r
library(tidymodels)

# 1. Split data into training and testing
data_split <- initial_split(df, prop = 0.8)
train_data <- training(data_split)
test_data  <- testing(data_split)
```

## The Modeling Workflow

1.  **Specify**: Choose the algorithm (e.g., Random Forest, Logistic Regression).
2.  **Recipe**: Preprocess the data (handling missing values, scaling).
3.  **Fit**: Train the model on your training data.
4.  **Predict**: Use the model on new data.

```r
# Specify a Random Forest model
model_spec <- rand_forest() %>%
  set_engine("ranger") %>%
  set_mode("classification")

# Fit the model
model_fit <- model_spec %>%
  fit(status ~ ., data = train_data)
```

## Evaluation

Wait! After training, you must check how well your model performed. Tidymodels provides a set of metrics like **Accuracy**, **Precision**, and **ROC-AUC**.

```r
results <- predict(model_fit, test_data) %>%
  bind_cols(test_data)

metrics(results, truth = status, estimate = .pred_class)
```

## Why use R for ML?

Wait! R is particularly strong in **Explainable AI**. Because it is built on statistics, it provides more depth into *why* a model made a decision (e.g., feature importance and coefficient analysis).

## Summary

| Term | Description |
| :--- | :--- |
| **Split** | Dividing data into Train/Test sets |
| **Recipe** | Data preprocessing steps |
| **Workflow** | Combining a model and a recipe |
| **Fit** | The actual "Training" phase |
| **ROC-AUC** | A measure of how well a classifier separates classes |
| **Best For** | Predictive analytics and scientific modeling |
| **Logic** | "Train, Validate, Predict" |
| **Safety** | Always evaluate on a separate "Test" set to avoid overfitting |
| **Modern** | Tidymodels is the modern replacement for the older `caret` package |
| **Standard** | Used heavily in risk assessment and medical diagnosis |
| **Identity** | Known for high-quality "Feature Engineering" |
