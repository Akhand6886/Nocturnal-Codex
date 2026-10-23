---
title: "Non-Parametric Tests: Chi-Square & Rank Tests"
description: "Categorical hypothesis testing with Chi-Square, Fisher's exact test, and rank-based non-parametric tests (Mann-Whitney U, Wilcoxon, Kruskal-Wallis)."
---

## 1. When Parametric Assumptions Fail

Classical parametric tests (such as Student's $t$-test and ANOVA) assume data is drawn from continuous Gaussian distributions. 

However, in many real-world software scenarios:
1. Data is **categorical** (e.g., error codes, operating system choice, subscription tier).
2. Data is **ordinal** (e.g., star ratings 1 to 5, user satisfaction tiers).
3. Data has extreme outliers and extreme skew where normal approximations completely fail.

**Non-parametric tests** make **no assumptions** regarding the underlying mathematical probability distribution.

```
+-----------------------------------------------------------------------------------------+
|                         PARAMETRIC VS NON-PARAMETRIC TEST PAIRS                         |
+-----------------------------------------------------------------------------------------+
|  Goal                   Parametric Test (Normal)      Non-Parametric Alternative        |
|  -------------------------------------------------------------------------------------  |
|  2 Independent Groups   Two-Sample Welch's t-test     Mann-Whitney U Test (Rank-Sum)    |
|  2 Paired Groups        Paired t-test                 Wilcoxon Signed-Rank Test         |
|  3+ Groups              One-Way ANOVA (F-test)        Kruskal-Wallis H Test             |
|  Categorical Counts     Proportions Z-test            Chi-Square (chi^2) Test / Fisher  |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Chi-Square ($\chi^2$) Goodness-of-Fit Test

Tests whether an observed categorical frequency distribution $O_1, O_2, \dots, O_k$ matches an expected theoretical probability distribution $E_1, E_2, \dots, E_k$.

### 2.1 The Test Statistic
$$\chi^2 = \sum_{i=1}^k \frac{(O_i - E_i)^2}{E_i} \sim \chi^2_{k - 1}$$

where:
- $O_i$ is the observed count in bucket $i$.
- $E_i = n \cdot p_i$ is the expected count under $H_0$.
- Degrees of freedom: $\nu = k - 1$ (minus additional estimated parameters).

### 2.2 Application: Testing Random Number Generator Uniformity
Testing whether a hash function distributes $n = 10,000$ keys uniformly across $k = 10$ shards ($E_i = 1000$ for all $i$):
- If $\chi^2$ is small, differences between observed and expected counts are consistent with pure random chance.
- If $\chi^2 > \chi^2_{\text{crit}}$, shard routing is non-uniform (hash collision bias detected!).

> **Cochran's Criterion**: The Chi-Square approximation requires that all expected counts $E_i \ge 1$ and at least $80\%$ of cells have $E_i \ge 5$.

---

## 3. Chi-Square Test of Independence (Contingency Tables)

Used to test whether two categorical variables are statistically independent (e.g., Browser Type vs Subscription Conversion).

Given an $r \times c$ **contingency table**:

| Browser | Converted | Not Converted | Row Total ($R_i$) |
| :--- | :--- | :--- | :--- |
| **Chrome** | $O_{11}$ | $O_{12}$ | $R_1$ |
| **Safari** | $O_{21}$ | $O_{22}$ | $R_2$ |
| **Firefox** | $O_{31}$ | $O_{32}$ | $R_3$ |
| **Column Total ($C_j$)** | $C_1$ | $C_2$ | **Total $N$** |

### 3.1 Expected Counts under Null Hypothesis ($H_0: \text{Independent}$)
Under independence, $P(\text{Row } i \cap \text{Col } j) = P(\text{Row } i) P(\text{Col } j) = \frac{R_i}{N} \frac{C_j}{N}$.
Multiplying by total sample size $N$:

$$E_{ij} = \frac{R_i \cdot C_j}{N}$$

### 3.2 Test Statistic & Degrees of Freedom
$$\chi^2 = \sum_{i=1}^r \sum_{j=1}^c \frac{(O_{ij} - E_{ij})^2}{E_{ij}} \sim \chi^2_{\nu}$$

$$\text{Degrees of Freedom: } \nu = (r - 1)(c - 1)$$

### 3.3 Fisher's Exact Test (Small Samples)
When cell counts are small ($E_{ij} < 5$), the asymptotic $\chi^2$ approximation fails. For a $2 \times 2$ table:

$$P = \frac{\binom{a + b}{a} \binom{c + d}{c}}{\binom{N}{a + c}} = \frac{(a+b)!(c+d)!(a+c)!(b+d)!}{a! \, b! \, c! \, d! \, N!}$$

Fisher's test computes exact hypergeometric probabilities without any large-sample approximations.

---

## 4. Rank-Based Non-Parametric Tests

When continuous data is heavily skewed (e.g., web latencies), rank-based tests discard raw values and analyze **order ranks** $1, 2, \dots, N$. This renders the test immune to extreme outliers!

### 4.1 Mann-Whitney $U$ Test (Wilcoxon Rank-Sum)
Non-parametric test for comparing two independent groups:
$$H_0: P(X > Y) = P(Y > X) = 0.5 \quad \text{(Stochastically identical)}$$

#### Algorithm:
1. Combine observations from Group A ($n_1$) and Group B ($n_2$) into a single pool of size $N = n_1 + n_2$.
2. Sort all $N$ values in ascending order and assign ranks $1, 2, \dots, N$.
3. Compute the rank sum $R_1$ for Group 1 and $R_2$ for Group 2.
4. Compute the $U$-statistics:
   $$U_1 = n_1 n_2 + \frac{n_1(n_1 + 1)}{2} - R_1, \qquad U_2 = n_1 n_2 + \frac{n_2(n_2 + 1)}{2} - R_2$$
   $$U = \min(U_1, U_2)$$
5. For large samples ($n_1, n_2 > 20$), $U$ is normally distributed with:
   $$\mu_U = \frac{n_1 n_2}{2}, \qquad \sigma_U = \sqrt{\frac{n_1 n_2 (n_1 + n_2 + 1)}{12}}$$

---

### 4.2 Wilcoxon Signed-Rank Test (Paired Samples)
The non-parametric counterpart to the paired $t$-test:
1. Calculate differences $d_i = x_{1, i} - x_{2, i}$. Discard pairs with $d_i = 0$.
2. Rank the **absolute differences** $|d_i|$ from smallest to largest.
3. Sum the ranks corresponding to positive differences ($W^+$) and negative differences ($W^-$).
4. The test statistic is $W = \min(W^+, W^-)$.

---

### 4.3 Kruskal-Wallis $H$-Test (3+ Groups)
The non-parametric counterpart to One-Way ANOVA:
Ranks all observations across all $k$ groups simultaneously:

$$H = \frac{12}{N(N + 1)} \sum_{j=1}^k \frac{R_j^2}{n_j} - 3(N + 1) \sim \chi^2_{k - 1}$$

where $R_j$ is the sum of ranks in group $j$, and $N = \sum n_j$.

---

## 5. Python Implementation: Chi-Square & Mann-Whitney U

```python
import numpy as np
import scipy.stats as stats

def demonstrate_nonparametric_tests():
    # 1. Chi-Square Test of Independence
    # Rows: User Tier (Free vs Pro)
    # Cols: Churned vs Retained
    # Table: [[Free_Churn, Free_Retain], [Pro_Churn, Pro_Retain]]
    contingency_table = np.array([
        [240, 760],   # Free: 24% churn
        [60,  940]    # Pro:   6% churn
    ])

    chi2, p_val, dof, expected = stats.chi2_contingency(contingency_table)
    print("=== Chi-Square Test of Independence ===")
    print(f"Chi2 Statistic: {chi2:.4f}, p-value: {p_val:.4e}, df: {dof}")
    print(f"Significant association: {p_val < 0.05}")

    # 2. Mann-Whitney U Test: Skewed Server Latency
    rng = np.random.default_rng(42)
    # System A: Pareto heavy-tailed distribution (shape=1.5)
    latencies_a = rng.pareto(a=1.5, size=80) * 20.0
    # System B: Pareto heavy-tailed distribution (shape=2.2, faster)
    latencies_b = rng.pareto(a=2.2, size=80) * 20.0

    u_stat, p_mw = stats.mannwhitneyu(latencies_a, latencies_b, alternative='two-sided')
    print("\n=== Mann-Whitney U Test (Heavy-Tailed Latency) ===")
    print(f"U-statistic: {u_stat:.2f}, p-value: {p_mw:.4f}")
    print(f"Group A Median: {np.median(latencies_a):.2f} ms")
    print(f"Group B Median: {np.median(latencies_b):.2f} ms")

if __name__ == "__main__":
    demonstrate_nonparametric_tests()
```

---

## 6. Key Takeaways

1. **Robust to Outliers**: Rank-based tests operate on ordinal ordering, making them immune to extreme numerical spikes.
2. **Chi-Square for Categorical Data**: Use goodness-of-fit to test distribution conformity, and contingency tables to test independence.
3. **Fisher's Exact for Sparse Cells**: When expected counts $E_{ij} < 5$, use Fisher's exact test.
