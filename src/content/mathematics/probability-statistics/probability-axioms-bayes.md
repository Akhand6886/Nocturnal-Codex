---
title: "Probability Axioms & Bayes' Theorem"
description: "Kolmogorov probability foundations, conditional probability, the law of total probability, Bayes' rule, and Bayesian spam classification in software engineering."
---

## 1. Kolmogorov's Probability Axioms

Modern probability theory is formalized by Andrey Kolmogorov (1933) on a **Probability Space** $(\Omega, \mathcal{F}, P)$:
- **$\Omega$ (Sample Space)**: The set of all possible outcomes.
- **$\mathcal{F}$ (Event Space)**: A $\sigma$-algebra of subsets of $\Omega$.
- **$P$ (Probability Measure)**: A function $P: \mathcal{F} \to [0, 1]$ satisfying **3 Fundamental Axioms**:

1. **Non-Negativity**: For any event $E \in \mathcal{F}$:
   $$P(E) \ge 0$$
2. **Unit Measure**: The probability of the entire sample space is 1:
   $$P(\Omega) = 1$$
3. **Countable Additivity**: For any countable sequence of mutually disjoint events $E_1, E_2, \dots$ ($E_i \cap E_j = \emptyset$ for $i \neq j$):
   $$P\left( \bigcup_{i=1}^\infty E_i \right) = \sum_{i=1}^\infty P(E_i)$$

From these 3 axioms follow all core theorems: $P(\emptyset) = 0$, $P(E^c) = 1 - P(E)$, and the Union Bound $P(A \cup B) \le P(A) + P(B)$.

---

## 2. Conditional Probability and Independence

The **conditional probability** of event $A$ given that event $B$ has occurred ($P(B) > 0$) is:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

Two events $A$ and $B$ are **statistically independent** if and only if:

$$P(A \cap B) = P(A) \cdot P(B) \iff P(A \mid B) = P(A)$$

In distributed systems, assuming server failure independence when servers share a common power distribution unit (PDU) or switch is a catastrophic SRE anti-pattern (correlated failure).

---

## 3. The Law of Total Probability & Bayes' Theorem

### Law of Total Probability
If $\{B_1, B_2, \dots, B_k\}$ forms a partition of the sample space $\Omega$ ($\bigcup B_i = \Omega$ and $B_i \cap B_j = \emptyset$), then for any event $A$:

$$P(A) = \sum_{i=1}^k P(A \mid B_i) P(B_i)$$

### Bayes' Theorem
By combining conditional probability definitions:

$$P(B_i \mid A) = \frac{P(A \mid B_i) P(B_i)}{P(A)} = \frac{P(A \mid B_i) P(B_i)}{\sum_{j=1}^k P(A \mid B_j) P(B_j)}$$

```
                  P(Evidence | Hypothesis) · P(Hypothesis)
P(Hypothesis | Evidence) = ────────────────────────────────────────────────
                                        P(Evidence)

    ▲                                  ▲                  ▲
    │                                  │                  │
Posterior Probability             Likelihood            Prior
(What we believe now)        (How well data matches)  (What we believed before)
```

---

## 4. Engineering Application: Bayesian Spam Classifier

Given an email text containing words $W = \{w_1, w_2, \dots, w_n\}$, we determine whether the email is Spam ($S$) or Ham ($H$):

$$P(S \mid W) = \frac{P(W \mid S) P(S)}{P(W)}$$

Using the **Naive Bayes Independence Assumption** (words appear independently given the class):

$$P(W \mid S) = \prod_{i=1}^n P(w_i \mid S)$$

To avoid floating-point underflow when multiplying thousands of small probabilities, engineers transform the product into a **sum of log-likelihoods**:

$$\ln P(S \mid W) \propto \ln P(S) + \sum_{i=1}^n \ln P(w_i \mid S)$$

---

## 5. Python Implementation: Naive Bayes Filter with Laplace Smoothing

```python
import numpy as np
import math
from collections import defaultdict

class NaiveBayesTextClassifier:
    def __init__(self, alpha: float = 1.0):
        self.alpha = alpha # Laplace smoothing parameter
        self.class_priors = {}
        self.word_counts = defaultdict(lambda: defaultdict(int))
        self.class_total_words = defaultdict(int)
        self.vocab = set()

    def train(self, documents: list[list[str]], labels: list[str]):
        n_docs = len(documents)
        label_counts = defaultdict(int)
        
        for doc, label in zip(documents, labels):
            label_counts[label] += 1
            for word in doc:
                self.vocab.add(word)
                self.word_counts[label][word] += 1
                self.class_total_words[label] += 1
                
        for label, count in label_counts.items():
            self.class_priors[label] = count / n_docs

    def predict_log_proba(self, doc: list[str]) -> dict[str, float]:
        vocab_size = len(self.vocab)
        scores = {}
        
        for label, prior in self.class_priors.items():
            log_prob = math.log(prior)
            total_words = self.class_total_words[label] + self.alpha * vocab_size
            
            for word in doc:
                # Laplace smoothing: (count + alpha) / (total + alpha * |V|)
                word_count = self.word_counts[label][word]
                prob = (word_count + self.alpha) / total_words
                log_prob += math.log(prob)
                
            scores[label] = log_prob
        return scores

# Training data
train_corpus = [
    (["urgent", "wire", "money", "bank"], "spam"),
    (["lottery", "winner", "claim", "prize"], "spam"),
    (["team", "meeting", "agenda", "tomorrow"], "ham"),
    (["project", "git", "pull", "request"], "ham"),
]
labels = [l for _, l in train_corpus]
docs = [d for d, _ in train_corpus]

nb = NaiveBayesTextClassifier()
nb.train(docs, labels)

test_email = ["meeting", "agenda", "project"]
scores = nb.predict_log_proba(test_email)
predicted = max(scores, key=scores.get)
print(f"Log probabilities: {scores} -> Classification: {predicted}")
```
