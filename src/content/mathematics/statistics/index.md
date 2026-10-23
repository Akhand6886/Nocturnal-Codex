---
title: "Mathematical Statistics & Data Inference"
slug: "statistics"
description: "The mathematical science of empirical data inference, parameter estimation (MLE, MAP), confidence intervals, non-parametric bootstrapping, hypothesis testing, production A/B experimentation, and generalized linear models."
iconName: "math"
topics:
  - section: "Part I: Descriptive Statistics & Exploratory Analysis"
    description: "Measures of central tendency, dispersion metrics, robust statistics, and quantile-quantile diagnostics."
    items:
      - title: "Descriptive Statistics & Data Summaries"
        description: "Mean, median, trimmed mean, variance, IQR, MAD, skewness, kurtosis, and Q-Q plot diagnostics."
        slug: "descriptive-statistics-data-summaries"
  - section: "Part II: Point Estimation & Sampling Distributions"
    description: "Finite sample estimators, sampling distributions, likelihood theory, and Bayesian point estimation."
    items:
      - title: "Sampling Distributions & Standard Error"
        description: "Bessel's correction, degrees of freedom, standard error of the mean, Student's t, Chi-square, and F distributions."
        slug: "sampling-distributions-standard-error"
      - title: "Maximum Likelihood Estimation (MLE)"
        description: "Likelihood functions, score equations, Fisher information matrix, Cramér-Rao lower bound, and asymptotic efficiency."
        slug: "maximum-likelihood-estimation"
      - title: "Method of Moments & Bayesian MAP"
        description: "Method of moments, conjugate priors (Beta-Binomial, Normal-Normal), MAP estimation, and L1/L2 regularization as priors."
        slug: "method-of-moments-map"
  - section: "Part III: Confidence Intervals & Resampling Methods"
    description: "Frequentist interval estimation, non-parametric bootstrap, and permutation testing."
    items:
      - title: "Confidence Intervals & Margin of Error"
        description: "Frequentist interpretation, Z-intervals, Student's t-intervals, Wilson score interval, and sample size sizing."
        slug: "confidence-intervals"
      - title: "Resampling Methods: Bootstrap & Jackknife"
        description: "Empirical distribution functions, non-parametric bootstrap, percentile/BCa intervals, jackknife variance, and permutation tests."
        slug: "resampling-bootstrap-jackknife"
  - section: "Part IV: Hypothesis Testing & Experimentation"
    description: "Statistical decision theory, parametric and non-parametric tests, and production A/B test engineering."
    items:
      - title: "Hypothesis Testing Foundations"
        description: "Null and alternative hypotheses, p-values, Type I/II errors, statistical power, and Neyman-Pearson lemma."
        slug: "hypothesis-testing-foundations"
      - title: "Parametric Tests: Z-Test, T-Test & ANOVA"
        description: "One/two-sample tests, Welch's t-test, One/Two-Way ANOVA, Tukey HSD, and Benjamini-Hochberg FDR control."
        slug: "parametric-tests-z-t-anova"
      - title: "A/B Testing & Production Experimentation"
        description: "Sample size power planning, Minimum Detectable Effect (MDE), CUPED variance reduction, and sequential testing."
        slug: "ab-testing-experimentation"
      - title: "Non-Parametric Tests: Chi-Square & Rank Tests"
        description: "Chi-square goodness-of-fit, test of independence, Mann-Whitney U, Wilcoxon signed-rank, and Kruskal-Wallis."
        slug: "nonparametric-tests-chi-square"
  - section: "Part V: Regression & Generalized Linear Models"
    description: "Linear and generalized regression models, Ordinary Least Squares, and maximum likelihood classification."
    items:
      - title: "Linear Regression & Ordinary Least Squares"
        description: "OLS closed-form solution, Gauss-Markov theorem (BLUE), residual diagnostics, homoscedasticity, and multicollinearity."
        slug: "linear-regression-ols"
      - title: "Logistic Regression & Generalized Linear Models"
        description: "GLM exponential family, logit link, Iteratively Reweighted Least Squares (IRLS), odds ratios, and ROC/AUC."
        slug: "logistic-regression-glm"
---

## The Science of Empirical Inference

Where **Probability Theory** reasons deductively from a known generative model to unknown data outcomes ($\text{Model} \implies \text{Data}$), **Mathematical Statistics** reasons inductively in reverse: given observed, noisy, finite empirical samples, what is the underlying data-generating process ($\text{Data} \implies \text{Model}$)?

```
+-----------------------------------------------------------------------------------+
|                        PROBABILITY VS MATHEMATICAL STATISTICS                     |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  PROBABILITY THEORY (Deductive):                                                  |
|  [Known Generative Distribution P(X; theta)] ======> Predict Expected Samples    |
|                                                                                   |
|  MATHEMATICAL STATISTICS (Inductive / Inferential):                               |
|  [Observed Data Samples {x_1, x_2, ..., x_n}] =====> Infer Parameter theta,       |
|                                                      Test Hypotheses,             |
|                                                      Quantify Uncertainty         |
+-----------------------------------------------------------------------------------+
```

---

## Core Pillars in Software Engineering & Data Systems

### 1. Controlled Experimentation & Production A/B Testing
Every modern software platform (Netflix, Google, Meta, Amazon) validates product changes, ranking algorithms, and backend architectures via statistical hypothesis testing. Engineers must compute **Statistical Power** ($1 - \beta$), size sample windows for a given **Minimum Detectable Effect (MDE)**, prevent false discoveries using **Variance Reduction (CUPED)**, and avoid the notorious peeking problem through **Sequential Testing**.

### 2. Machine Learning Parameter Estimation
Supervised and unsupervised machine learning algorithms are statistical estimators:
- Training a neural network with cross-entropy loss is mathematically equivalent to **Maximum Likelihood Estimation (MLE)** on a categorical Bernoulli model.
- Ridge ($L_2$) and Lasso ($L_1$) weight regularization are exact **Maximum A Posteriori (MAP)** estimators under Gaussian and Laplace Bayesian priors.
- Feature selection relies on **Variance Inflation Factors (VIF)** and statistical significance tests.

### 3. Systems Observability & Robust Metrics
Production metrics (latencies, query durations) are heavily right-skewed and multimodal. Relying on the arithmetic mean ($O(\bar{x})$) masks critical system outages because extreme outliers dominate. Statistical literacy teaches engineers to employ **robust location estimators** (percentiles $p50, p95, p99$, Median Absolute Deviation), quantile-quantile plots, and non-parametric bootstrap resampling to monitor SLAs accurately.

---

## Pedagogical Progression

1. **Descriptive & Exploratory Analysis**: Foundational metrics of center and spread, robust statistics, and distributional diagnostics.
2. **Point Estimation & Sampling Distributions**: Unbiasedness, consistency, Fisher information, Cramér-Rao lower bounds, Maximum Likelihood Estimation, and Bayesian MAP.
3. **Confidence Intervals & Resampling**: Quantifying parameter uncertainty without parametric assumptions via the Non-Parametric Bootstrap and Jackknife.
4. **Hypothesis Testing & Experimentation**: Rigorous statistical decision theory, Type I/II errors, $p$-values, parametric tests ($Z$, $t$, ANOVA), non-parametric rank tests, and production A/B testing with CUPED.
5. **Regression & Statistical Modeling**: Ordinary Least Squares (OLS), the Gauss-Markov theorem, residual diagnostics, and Generalized Linear Models (Logistic Regression).
