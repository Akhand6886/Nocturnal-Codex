---
title: "Hypothesis Testing & A/B Experimentation"
description: "Null hypothesis testing, p-values, Type I/II errors, two-sample t-tests, and sample size power calculations for production online A/B testing."
---

## 1. The Statistical Framework of A/B Testing

In modern tech companies (Netflix, Meta, Google, Uber), product features are never shipped to 100% of users based on intuition. They are evaluated via **Randomized Controlled Trials (A/B Tests)** to determine whether treatment variant $B$ causes a statistically significant improvement over control $A$.

### The Hypotheses
- **Null Hypothesis ($H_0$)**: There is no true difference between variant $A$ and variant $B$ ($\mu_B - \mu_A = 0$ or $p_B - p_A = 0$). Any observed lift is pure random sampling noise.
- **Alternative Hypothesis ($H_1$)**: There is a real difference ($\mu_B \neq \mu_A$).

---

## 2. Decision Errors: Type I ($\alpha$) vs Type II ($\beta$)

| Reality | Decision: Retain $H_0$ (Do Not Ship) | Decision: Reject $H_0$ (Ship Feature B) |
| :--- | :--- | :--- |
| **$H_0$ is True** (No real change) | Correct Decision ($1 - \alpha$) | **Type I Error ($\alpha$)**: False Positive (Shipping a useless/harmful feature) |
| **$H_1$ is True** (Feature B is better) | **Type II Error ($\beta$)**: False Negative (Missing a real breakthrough) | **Statistical Power ($1 - \beta$)**: True Positive |

### Industry Standard Error Budgets
- **Significance Level $\alpha = 0.05$ (5%)**: Willing to accept a 1 in 20 chance of a false positive.
- **Statistical Power $1 - \beta = 0.80$ (80%)**: $80\%$ chance of detecting the effect if the true lift exists.

```
       Type I Error (α)                     Statistical Power (1 - β)
  False Positive Rate: 5%                    Detection Rate: 80%
┌─────────────────────────┐               ┌─────────────────────────┐
│ Rejecting null when     │               │ Correctly detecting a   │
│ no real effect exists   │               │ true positive lift      │
└─────────────────────────┘               └─────────────────────────┘
```

---

## 3. Two-Sample Z-Test for Conversion Proportions

When comparing conversion rates (e.g. click-through rates $p_A$ and $p_B$ with sample sizes $n_A, n_B$):

### Pooled Sample Proportion
$$\hat{p} = \frac{X_A + X_B}{n_A + n_B}$$

### Test Statistic
$$Z = \frac{\hat{p}_B - \hat{p}_A}{\sqrt{\hat{p}(1 - \hat{p})\left(\frac{1}{n_A} + \frac{1}{n_B}\right)}}$$

Under $H_0$, $Z \sim \mathcal{N}(0, 1)$. If $|Z| > 1.96$ for a two-tailed test at $\alpha = 0.05$, we reject the null hypothesis ($p < 0.05$).

---

## 4. Sample Size Power Calculation (Avoiding Underpowered Tests)

A common engineering mistake is stopping an A/B test early when a temporary positive trend appears (the **Peeking Problem**, which inflates Type I error from 5% to over 30%).

The minimum sample size $n$ required **per variant** before starting the test is given by Evan Miller's formula:

$$n = \frac{2 \left( Z_{\alpha/2} + Z_{\beta} \right)^2 \cdot \sigma^2}{\delta^2}$$

For binary proportions with baseline conversion $p$ and Minimum Detectable Effect (MDE) $\delta$:

$$n \approx \frac{16 \cdot p(1 - p)}{\delta^2} \quad (\text{for } \alpha=0.05, 1-\beta=0.80)$$

---

## 5. Python Implementation: Production A/B Test Evaluator

```python
import numpy as np
from scipy import stats

def evaluate_ab_test(
    conversions_a: int, visitors_a: int,
    conversions_b: int, visitors_b: int,
    alpha: float = 0.05
) -> dict:
    """
    Performs a two-sided Z-test for difference in proportions between Variant A and B.
    """
    p_a = conversions_a / visitors_a
    p_b = conversions_b / visitors_b
    lift = (p_b - p_a) / p_a
    
    # Pooled probability
    p_pool = (conversions_a + conversions_b) / (visitors_a + visitors_b)
    se_pool = np.sqrt(p_pool * (1 - p_pool) * (1 / visitors_a + 1 / visitors_b))
    
    # Z-statistic and p-value
    z_score = (p_b - p_a) / se_pool
    p_value = 2.0 * (1.0 - stats.norm.cdf(abs(z_score)))
    
    is_significant = p_value < alpha
    
    return {
        "variant_a_cvr": p_a,
        "variant_b_cvr": p_b,
        "relative_lift": lift,
        "z_score": z_score,
        "p_value": p_value,
        "is_significant": is_significant,
        "recommendation": "Ship Variant B!" if is_significant and lift > 0 else "Do not ship / Continue testing."
    }

# Example: 10,000 visitors per variant
# Variant A: 1,200 conversions (12.0%)
# Variant B: 1,350 conversions (13.5%)
res = evaluate_ab_test(1200, 10000, 1350, 10000)
print(f"Variant A CVR: {res['variant_a_cvr']*100:.2f}%")
print(f"Variant B CVR: {res['variant_b_cvr']*100:.2f}%")
print(f"Relative Lift: {res['relative_lift']*100:+.2f}%")
print(f"P-Value:       {res['p_value']:.4f} (Significant: {res['is_significant']})")
print(f"Decision:      {res['recommendation']}")
```
