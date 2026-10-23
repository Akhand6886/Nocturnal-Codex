---
title: "Conditional Probability & Bayes' Theorem"
description: "Mathematical formulation of conditional probability, the Law of Total Probability, Bayesian updating, Naive Bayes derivation, and Simpson's paradox."
---

## 1. The Calculus of Conditioned Knowledge

In deterministic mathematics, an assertion is either true or false. In real-world software engineering, robotics, and machine learning, beliefs must be updated dynamically as new evidence (telemetry, test results, sensor readings, user actions) arrives. 

**Conditional probability** formalizes the restructuring of a sample space when partial information is revealed.

```
+-----------------------------------------------------------------------------------------+
|                                    BAYESIAN INFERENCE CYCLE                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|        +-------------------+                                                            |
|        | PRIOR P(H)        |  --> Initial domain belief before observing evidence       |
|        +-------------------+                                                            |
|                  |                                                                      |
|                  v                                                                      |
|        +-------------------+                                                            |
|        | LIKELIHOOD P(E|H) |  --> Probability that hypothesis produces evidence E       |
|        +-------------------+                                                            |
|                  |                                                                      |
|                  v                                                                      |
|        +-------------------+                                                            |
|        | POSTERIOR P(H|E)  |  --> Updated belief: P(H|E) = P(E|H) * P(H) / P(E)         |
|        +-------------------+                                                            |
|                  |                                                                      |
|                  +------------> Becomes NEW PRIOR for subsequent observations!          |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Mathematical Formalism

### 2.1 Conditional Probability Definition
Let $A$ and $B$ be events in a probability space $(\Omega, \mathcal{F}, P)$ with $P(B) > 0$. The **conditional probability of $A$ given $B$** is defined as:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

*Geometric Intuition*: When event $B$ occurs, $B$ effectively becomes our new restricted sample space $\Omega'$. Any outcome outside $B$ has probability zero. The only portion of $A$ that can still occur is the intersection $A \cap B$, re-normalized by the total measure of $B$.

### 2.2 The Multiplication Rule (Chain Rule of Probability)
Rearranging the conditional probability definition gives the probability of a joint intersection:

$$P(A \cap B) = P(A \mid B) P(B) = P(B \mid A) P(A)$$

For $n$ arbitrary events $A_1, A_2, \dots, A_n$:

$$P\left(\bigcap_{i=1}^n A_i\right) = P(A_1) \cdot P(A_2 \mid A_1) \cdot P(A_3 \mid A_1 \cap A_2) \cdots P\left(A_n \mid \bigcap_{j=1}^{n-1} A_j\right)$$

> In Natural Language Processing (Autoregressive Large Language Models like GPT), the probability of generating a sequence of tokens $w_1, w_2, \dots, w_T$ is computed exactly by this chain rule:
> $$P(w_1, \dots, w_T) = \prod_{t=1}^T P(w_t \mid w_1, \dots, w_{t-1})$$

---

## 3. Law of Total Probability

Let $B_1, B_2, \dots, B_k$ form a **partition** of the sample space $\Omega$. That is:
1. $B_i \cap B_j = \emptyset$ for all $i \neq j$ (mutually disjoint).
2. $\bigcup_{i=1}^k B_i = \Omega$ (collectively exhaustive).
3. $P(B_i) > 0$ for all $i$.

Then for any event $A \in \mathcal{F}$:

$$P(A) = \sum_{i=1}^k P(A \cap B_i) = \sum_{i=1}^k P(A \mid B_i) P(B_i)$$

```
Partition of Omega:
+----------------------------------------------------+
|  B1              |  B2             |  B3           |
|         +-------------------+                      |
|        /          |          \                     |
|       |  A n B1   |   A n B2  |     A n B3         |
|        \          |          /                     |
|         +-------------------+                      |
|                  |                 |               |
+----------------------------------------------------+
Area of A = Sum over all i of (Area of A inside Bi)
```

---

## 4. Bayes' Theorem: Derivation & Interpretation

### Theorem Derivation
From the multiplication rule:
$$P(H \cap E) = P(H \mid E) P(E) = P(E \mid H) P(H)$$

Dividing both sides by $P(E)$:

$$P(H \mid E) = \frac{P(E \mid H) P(H)}{P(E)}$$

Expanding the denominator using the Law of Total Probability across a partition of hypotheses $\{H_1, H_2, \dots, H_k\}$:

$$P(H_j \mid E) = \frac{P(E \mid H_j) P(H_j)}{\sum_{i=1}^k P(E \mid H_i) P(H_i)}$$

### Terminology Breakdown
| Term | Notation | Meaning |
| :--- | :--- | :--- |
| **Prior** | $P(H)$ | Initial belief in hypothesis $H$ before collecting evidence $E$. |
| **Likelihood** | $P(E \mid H)$ | Probability that evidence $E$ would be generated if $H$ is true. |
| **Evidence (Marginal)** | $P(E)$ | Total probability of observing evidence $E$ across all possible hypotheses. |
| **Posterior** | $P(H \mid E)$ | Updated belief in hypothesis $H$ after observing evidence $E$. |

---

## 5. Concrete Engineering Example: Network Intrusion Detection

A cybersecurity network intrusion detection system (IDS) flags malicious packets:
- True attack prevalence on the corporate network: $P(\text{Attack}) = 0.001$ ($0.1\%$).
- Sensitivity (True Positive Rate): $P(\text{Alert} \mid \text{Attack}) = 0.99$ ($99\%$).
- False Positive Rate: $P(\text{Alert} \mid \text{Benign}) = 0.01$ ($1\%$).

If an alert triggers on a random packet, what is the true probability that the packet is malicious?

### Step-by-Step Calculation:
1. **Prior probabilities**:
   $$P(\text{Attack}) = 0.001, \quad P(\text{Benign}) = 0.999$$
2. **Marginal Evidence $P(\text{Alert})$**:
   $$P(\text{Alert}) = P(\text{Alert} \mid \text{Attack})P(\text{Attack}) + P(\text{Alert} \mid \text{Benign})P(\text{Benign})$$
   $$P(\text{Alert}) = (0.99 \times 0.001) + (0.01 \times 0.999) = 0.00099 + 0.00999 = 0.01098$$
3. **Posterior Probability**:
   $$P(\text{Attack} \mid \text{Alert}) = \frac{0.00099}{0.01098} \approx 0.09016 \quad (9.02\%)$$

> **The Base Rate Fallacy**: Even with a $99\%$ accurate detection model, roughly $91\%$ of raised alerts are false alarms! This occurs because the baseline event is rare ($0.1\%$).

---

## 6. The Naive Bayes Classifier

In text classification, spam filtering, and sentiment analysis, an item is described by a feature vector $\mathbf{x} = (x_1, x_2, \dots, x_d)$. We seek the class $c \in \mathcal{C}$ that maximizes $P(C = c \mid \mathbf{x})$.

By Bayes' theorem:
$$P(C = c \mid \mathbf{x}) \propto P(C = c) P(\mathbf{x} \mid C = c)$$

Computing $P(x_1, \dots, x_d \mid c)$ directly requires estimating $2^d - 1$ parameters (exponential complexity). The **Naive Bayes assumption** asserts that features are **conditionally independent given the class**:

$$P(\mathbf{x} \mid C = c) = \prod_{j=1}^d P(x_j \mid C = c)$$

### Classification Decision Rule (Log-Space)
To avoid floating-point underflow when multiplying hundreds of small probabilities:

$$\hat{c} = \arg\max_{c \in \mathcal{C}} \left[ \ln P(C = c) + \sum_{j=1}^d \ln P(x_j \mid C = c) \right]$$

---

## 7. Simpson's Paradox

**Simpson's Paradox** is a counter-intuitive phenomenon where a statistical trend that appears in several distinct groups reverses or disappears when the groups are aggregated.

### Production Example: Latency Optimization A/B Test
An engineering team tests a new compression algorithm (Variant B) against Variant A across Desktop and Mobile users:

| Platform | Variant A (Old) | Variant B (New) | Winner |
| :--- | :--- | :--- | :--- |
| **Mobile** | $150 \text{ ms}$ ($100$ requests) | **$120 \text{ ms}$** ($900$ requests) | **Variant B** |
| **Desktop** | $40 \text{ ms}$ ($900$ requests) | **$30 \text{ ms}$** ($100$ requests) | **Variant B** |
| **Overall Average** | **$51.0 \text{ ms}$** | $111.0 \text{ ms}$ | **Variant A!** |

### Mathematical Explanation:
- Variant A Average: $\frac{100(150) + 900(40)}{1000} = \frac{15000 + 36000}{1000} = 51.0 \text{ ms}$.
- Variant B Average: $\frac{900(120) + 100(30)}{1000} = \frac{108000 + 3000}{1000} = 111.0 \text{ ms}$.

Variant B is faster on Mobile ($120 < 150$) and faster on Desktop ($30 < 40$), yet its aggregated average is more than double! The confounding variable is the **traffic distribution**: Variant B was routed predominantly to mobile users, who naturally experience higher cellular latency. Always condition on confounding variables!

---

## 8. Python Implementation: Bayesian Spam Classifier

```python
import math
from collections import defaultdict

class NaiveBayesClassifier:
    """
    Multinomial Naive Bayes classifier with Laplace (add-1) smoothing
    for spam email detection.
    """
    def __init__(self, alpha: float = 1.0):
        self.alpha = alpha
        self.class_counts = defaultdict(int)
        self.word_counts = defaultdict(lambda: defaultdict(int))
        self.total_words = defaultdict(int)
        self.vocab = set()
        self.total_docs = 0

    def fit(self, documents: list[tuple[list[str], str]]):
        for tokens, label in documents:
            self.total_docs += 1
            self.class_counts[label] += 1
            for token in tokens:
                self.vocab.add(token)
                self.word_counts[label][token] += 1
                self.total_words[label] += 1

    def predict_log_proba(self, tokens: list[str]) -> dict[str, float]:
        vocab_size = len(self.vocab)
        log_probs = {}

        for label in self.class_counts:
            # Prior log P(C = c)
            prior = math.log(self.class_counts[label] / self.total_docs)
            
            # Sum of log likelihoods: log P(w_i | C = c) with Laplace smoothing
            likelihood = 0.0
            for token in tokens:
                count = self.word_counts[label][token]
                prob = (count + self.alpha) / (self.total_words[label] + self.alpha * vocab_size)
                likelihood += math.log(prob)
                
            log_probs[label] = prior + likelihood

        return log_probs

    def predict(self, tokens: list[str]) -> str:
        log_probs = self.predict_log_proba(tokens)
        return max(log_probs, key=log_probs.get)

# Demonstration
if __name__ == "__main__":
    train_data = [
        (["urgent", "wire", "transfer", "money", "now"], "spam"),
        (["claim", "free", "lottery", "cash", "prize"], "spam"),
        (["team", "meeting", "architecture", "review", "tomorrow"], "ham"),
        (["git", "pull", "request", "merged", "deploy"], "ham"),
        (["schedule", "lunch", "coffee", "meeting"], "ham"),
    ]

    nb = NaiveBayesClassifier()
    nb.fit(train_data)

    test_msg = ["urgent", "meeting", "deploy", "review"]
    print("Test Tokens:", test_msg)
    print("Log Probabilities:", nb.predict_log_proba(test_msg))
    print("Predicted Class:", nb.predict(test_msg))
```

---

## 9. Summary & Best Practices

1. **Conditioning Restricts the Universe**: $P(A \mid B) = P(A \cap B) / P(B)$ normalizes the probability within the subspace where $B$ holds.
2. **Bayes' Theorem Inverts Conditional Information**: Allows finding causal or diagnostic probabilities $P(\text{Cause} \mid \text{Effect})$ from generative likelihoods $P(\text{Effect} \mid \text{Cause})$.
3. **Beware Rare Base Rates**: When base rates $P(H)$ are tiny, even high-sensitivity tests produce predominantly false positives unless false positive rates are infinitesimally small.
4. **Simpson's Paradox**: Never aggregate rates across heterogeneous groups without checking for confounding sample allocations.
