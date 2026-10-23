---
title: "Linear Regression & Ordinary Least Squares"
description: "Mathematical derivation of OLS closed-form solutions, the Gauss-Markov theorem (BLUE), projection matrices, residual diagnostics, homoscedasticity, and multicollinearity."
---

## 1. Linear Modeling & Matrix Formulation

Linear regression is the foundational workhorse of statistical modeling and supervised machine learning. It models the relationship between a continuous dependent response variable $y \in \mathbb{R}$ and a vector of $p$ explanatory features $\mathbf{x} = (x_1, x_2, \dots, x_p)^T$:

$$y_i = \beta_0 + \beta_1 x_{i1} + \beta_2 x_{i2} + \dots + \beta_p x_{ip} + \epsilon_i, \quad i = 1, \dots, n$$

### Matrix Formulation
Stacking all $n$ observations into vector and matrix notation:

$$\mathbf{y} = \mathbf{X}\mathbf{\beta} + \mathbf{\epsilon}$$

$$\begin{bmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{bmatrix} = \begin{bmatrix} 1 & x_{11} & \cdots & x_{1p} \\ 1 & x_{21} & \cdots & x_{2p} \\ \vdots & \vdots & \ddots & \vdots \\ 1 & x_{n1} & \cdots & x_{np} \end{bmatrix} \begin{bmatrix} \beta_0 \\ \beta_1 \\ \vdots \\ \beta_p \end{bmatrix} + \begin{bmatrix} \epsilon_1 \\ \epsilon_2 \\ \vdots \\ \epsilon_n \end{bmatrix}$$

where $\mathbf{X} \in \mathbb{R}^{n \times (p+1)}$ is the **Design Matrix** (including a column of ones for the intercept), $\mathbf{\beta} \in \mathbb{R}^{p+1}$ is the parameter vector, and $\mathbf{\epsilon} \sim \mathcal{N}(\mathbf{0}, \sigma^2 \mathbf{I})$ is unobserved noise.

---

## 2. Derivation of Ordinary Least Squares (OLS)

We seek the parameter vector $\hat{\mathbf{\beta}}$ that minimizes the **Sum of Squared Residuals (SSR)**:

$$S(\mathbf{\beta}) = \|\mathbf{y} - \mathbf{X}\mathbf{\beta}\|_2^2 = (\mathbf{y} - \mathbf{X}\mathbf{\beta})^T (\mathbf{y} - \mathbf{X}\mathbf{\beta})$$

Expanding the quadratic matrix product:
$$S(\mathbf{\beta}) = \mathbf{y}^T \mathbf{y} - \mathbf{y}^T \mathbf{X}\mathbf{\beta} - \mathbf{\beta}^T \mathbf{X}^T \mathbf{y} + \mathbf{\beta}^T \mathbf{X}^T \mathbf{X}\mathbf{\beta} = \mathbf{y}^T \mathbf{y} - 2\mathbf{\beta}^T \mathbf{X}^T \mathbf{y} + \mathbf{\beta}^T \mathbf{X}^T \mathbf{X}\mathbf{\beta}$$

### Taking the Gradient with Respect to $\mathbf{\beta}$:
$$\nabla_\mathbf{\beta} S(\mathbf{\beta}) = -2\mathbf{X}^T \mathbf{y} + 2\mathbf{X}^T \mathbf{X}\mathbf{\beta}$$

Setting the gradient to zero yields the celebrated **Normal Equations**:

$$\mathbf{X}^T \mathbf{X} \mathbf{\beta} = \mathbf{X}^T \mathbf{y}$$

Assuming $\mathbf{X}$ has full column rank ($p+1 \le n$ and columns are linearly independent), the Gram matrix $\mathbf{X}^T \mathbf{X}$ is invertible:

$$\hat{\mathbf{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$$

```
+---------------------------------------------------------------------------------+
|                                 THE OLS CLOSED-FORM                             |
+---------------------------------------------------------------------------------+
|                                                                                 |
|                      beta_hat = (X^T * X)^(-1) * X^T * y                        |
|                                                                                 |
+---------------------------------------------------------------------------------+
```

---

## 3. Geometric Interpretation: Orthogonal Projections

The fitted predictions are:

$$\hat{\mathbf{y}} = \mathbf{X}\hat{\mathbf{\beta}} = \mathbf{X}(\mathbf{X}^T \mathbf{X})^{-1}\mathbf{X}^T \mathbf{y} = \mathbf{H}\mathbf{y}$$

The matrix $\mathbf{H} = \mathbf{X}(\mathbf{X}^T \mathbf{X})^{-1}\mathbf{X}^T \in \mathbb{R}^{n \times n}$ is called the **Hat Matrix** (it "puts the hat on $y$").

### Properties of the Hat Matrix:
1. **Symmetric**: $\mathbf{H}^T = \mathbf{H}$.
2. **Idempotent**: $\mathbf{H}^2 = \mathbf{H}$ (projecting twice is identical to projecting once).
3. **Orthogonal Projection**: $\mathbf{H}$ projects the observed vector $\mathbf{y} \in \mathbb{R}^n$ orthogonally onto the subspace spanned by the columns of $\mathbf{X}$ ($C(\mathbf{X})$).

```
Geometric Visualization of OLS:
R^n Space:
   y (Observed target)
   ^
   |  \
   |    \  Residual e = y - y_hat (Orthogonal to subspace!)
   |      \
   |        v
   +--------+------------------------> Column space C(X)
   0        y_hat = H * y (Fitted prediction)
            [Orthogonal Projection of y onto C(X)]
```

The residual vector $\mathbf{e} = \mathbf{y} - \hat{\mathbf{y}} = (\mathbf{I} - \mathbf{H})\mathbf{y}$ is strictly perpendicular to every column of $\mathbf{X}$:
$$\mathbf{X}^T \mathbf{e} = \mathbf{0}$$

---

## 4. The Gauss-Markov Theorem (BLUE)

Why is OLS the universal choice over other regression techniques?

### Theorem (Gauss-Markov)
Under the classical linear regression assumptions:
1. Strict exogeneity: $E[\mathbf{\epsilon} \mid \mathbf{X}] = \mathbf{0}$.
2. Homoscedasticity and uncorrelated errors: $\text{Var}(\mathbf{\epsilon} \mid \mathbf{X}) = \sigma^2 \mathbf{I}$.

The OLS estimator $\hat{\mathbf{\beta}}$ is **BLUE**: the **Best Linear Unbiased Estimator**. 

That is, for any other linear unbiased estimator $\tilde{\mathbf{\beta}}$, its covariance matrix satisfies:
$$\text{Cov}(\tilde{\mathbf{\beta}}) - \text{Cov}(\hat{\mathbf{\beta}}) \ge \mathbf{0} \quad \text{(Positive Semi-Definite)}$$
No linear unbiased estimator can ever achieve lower variance than OLS!

---

## 5. Goodness of Fit & Diagnostic Metrics

### 5.1 Coefficient of Determination ($R^2$)
Measures the proportion of total variance in the dependent variable explained by the model:

$$R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}} = 1 - \frac{\sum_{i=1}^n (y_i - \hat{y}_i)^2}{\sum_{i=1}^n (y_i - \bar{y})^2}$$

- $R^2 = 1.0$: Perfect fit.
- $R^2 = 0.0$: Model predicts no better than the sample mean $\bar{y}$.

### 5.2 Adjusted $R^2$
Adding random noise features to $\mathbf{X}$ can never decrease $R^2$. **Adjusted $R^2$** penalizes model complexity:

$$R^2_{\text{adj}} = 1 - \frac{\text{SS}_{\text{res}} / (n - p - 1)}{\text{SS}_{\text{tot}} / (n - 1)}$$

---

## 6. Classical Assumptions & Diagnostic Pitfalls

```
+---------------------------------------------------------------------------------+
|                               REGRESSION ASSUMPTIONS                            |
+---------------------------------------------------------------------------------+
|  1. LINEARITY:        Relationship between X and E[y] is linear.                |
|  2. HOMOSCEDASTICITY: Constant error variance Var(e_i) = sigma^2 (No fan-out).  |
|  3. INDEPENDENCE:     Errors are uncorrelated (No time-series autocorrelation). |
|  4. NO MULTICOLLINEARITY: Features are not linearly redundant.                  |
|  5. NORMAL RESIDUALS: e_i ~ N(0, sigma^2) (Required for t-tests on beta).       |
+---------------------------------------------------------------------------------+
```

### Multicollinearity & Variance Inflation Factor (VIF)
When features are strongly correlated, $\mathbf{X}^T \mathbf{X}$ becomes near-singular (ill-conditioned). Parameter estimates $\hat{\mathbf{\beta}}$ suffer massive variance and wild instability.

The **Variance Inflation Factor (VIF)** for feature $j$ is:

$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$

where $R_j^2$ is the $R^2$ from regressing feature $x_j$ against all other remaining features.
- $\text{VIF} = 1$: Completely orthogonal (no collinearity).
- $\text{VIF} > 5$ or $10$: Severe multicollinearity; features must be pruned or regularized via Ridge ($L_2$).

---

## 7. Python Implementation: OLS from Scratch via NumPy

```python
import numpy as np
import scipy.stats as stats

class LinearRegressionOLS:
    """
    Ordinary Least Squares Linear Regression implemented from first principles
    with standard error, t-statistics, p-values, and R^2 diagnostics.
    """
    def __init__(self):
        self.beta = None
        self.se = None
        self.t_stats = None
        self.p_values = None
        self.r_squared = None
        self.r_squared_adj = None

    def fit(self, X: np.ndarray, y: np.ndarray):
        n, p = X.shape
        # Add intercept column of ones
        X_design = np.hstack([np.ones((n, 1)), X])
        k = p + 1  # Total parameters including intercept

        # OLS Closed form: beta = (X^T * X)^(-1) * X^T * y
        xtx = X_design.T @ X_design
        xty = X_design.T @ y
        self.beta = np.linalg.solve(xtx, xty)

        # Residuals and degrees of freedom
        y_pred = X_design @ self.beta
        residuals = y - y_pred
        df_residuals = n - k
        sigma_sq = np.sum(residuals ** 2) / df_residuals

        # Covariance matrix of coefficients: sigma^2 * (X^T * X)^(-1)
        cov_beta = sigma_sq * np.linalg.inv(xtx)
        self.se = np.sqrt(np.diagonal(cov_beta))

        # Hypothesis testing for each coefficient: H_0: beta_j = 0
        self.t_stats = self.beta / self.se
        self.p_values = 2.0 * (1.0 - stats.t.cdf(np.abs(self.t_stats), df=df_residuals))

        # R-squared metrics
        ss_tot = np.sum((y - np.mean(y)) ** 2)
        ss_res = np.sum(residuals ** 2)
        self.r_squared = 1.0 - (ss_res / ss_tot)
        self.r_squared_adj = 1.0 - ((ss_res / df_residuals) / (ss_tot / (n - 1)))

    def summary(self):
        print(f"R-squared: {self.r_squared:.4f} | Adjusted R-squared: {self.r_squared_adj:.4f}")
        print("-----------------------------------------------------------------")
        print(f"{'Feature':<12} | {'Coef':<10} | {'Std Error':<10} | {'t-stat':<10} | {'p-value':<10}")
        print("-----------------------------------------------------------------")
        for i, (b, se, t, p) in enumerate(zip(self.beta, self.se, self.t_stats, self.p_values)):
            name = "Intercept" if i == 0 else f"Feature_{i}"
            print(f"{name:<12} | {b:<10.4f} | {se:<10.4f} | {t:<10.4f} | {p:<10.4e}")

if __name__ == "__main__":
    rng = np.random.default_rng(42)
    n_samples = 500
    X_raw = rng.normal(0, 1, size=(n_samples, 2))
    # True relationship: y = 5.0 + 3.2 * x1 - 1.8 * x2 + noise
    y_raw = 5.0 + 3.2 * X_raw[:, 0] - 1.8 * X_raw[:, 1] + rng.normal(0, 0.5, size=n_samples)

    model = LinearRegressionOLS()
    model.fit(X_raw, y_raw)
    print("=== OLS Regression Analytical Summary ===")
    model.summary()
```

---

## 8. Key Takeaways

1. **Normal Equations**: $\hat{\mathbf{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{y}$ is the global minimum of the quadratic residual surface.
2. **Orthogonal Projection**: The prediction $\hat{\mathbf{y}} = \mathbf{H}\mathbf{y}$ is the orthogonal projection of $\mathbf{y}$ onto the column space of $\mathbf{X}$.
3. **Gauss-Markov Optimality**: OLS is the Best Linear Unbiased Estimator (BLUE) under spherical errors.
