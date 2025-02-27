---
title: Overfitting & Underfitting
parent: supervised-learning
date: "2025-02-26"
---

# Overfitting and Underfitting: A Comprehensive Guide

In machine learning, **overfitting** and **underfitting** are two common challenges that can significantly impact the performance of your models. Understanding these concepts is crucial for building models that generalize well to unseen data. In this blog, we’ll explore what overfitting and underfitting are, their relationship with variance and bias, and how to address them effectively.

---

## 1. What is Generalization?

**Generalization** refers to a model’s ability to perform well on unseen data. A model that generalizes well can make accurate predictions on data it has never encountered before. The ultimate goal of machine learning is to build models that generalize effectively, rather than just memorizing the training data.

---

## 2. What is Overfitting?

**Overfitting** occurs when a model learns the training data too well, capturing noise and irrelevant details instead of the underlying patterns. As a result, the model performs exceptionally well on the training data but poorly on unseen data.

### Overfitting in Linear Regression

In linear regression, an overfit model might have a very high degree polynomial that fits the training data perfectly but fails to predict new data accurately. For example, a polynomial of degree 10 might pass through every training point but produce erratic predictions for test data.

### Overfitting in Classification

In classification, an overfit model might create an overly complex decision boundary that perfectly separates the training data but fails to generalize to new data. For instance, a decision boundary that twists and turns to classify every training point correctly but misclassifies many test points.

### Relationship Between Overfitting and Variance

Overfitting is associated with **high variance**. A model with high variance is highly sensitive to small fluctuations in the training data, leading to overly complex models that capture noise. This is why overfitting is often referred to as a high-variance problem.

---

## 3. What is Underfitting?

**Underfitting** occurs when a model is too simple to capture the underlying patterns in the data. It performs poorly on both the training data and unseen data.

### Underfitting in Linear Regression

In linear regression, an underfit model might use a linear function to fit data that has a clear non-linear relationship. For example, fitting a straight line to data that follows a quadratic trend.

### Underfitting in Classification

In classification, an underfit model might use a linear decision boundary to separate classes that are not linearly separable. This results in poor performance on both training and test data.

### Relationship Between Underfitting and Bias

Underfitting is associated with **high bias**. A model with high bias makes strong assumptions about the data, leading to oversimplified models that fail to capture the complexity of the data.

---

## 4. Addressing Overfitting

To combat overfitting, we can use the following strategies:

### 1. Collecting More Training Data

More data can help the model learn the underlying patterns better, reducing the risk of overfitting. However, collecting more data is not always feasible.

### 2. Feature Selection

Selecting the most relevant features and excluding irrelevant ones can simplify the model and reduce overfitting. Techniques like **forward selection**, **backward elimination**, and **recursive feature elimination** can help.

### 3. Regularization

Regularization is a technique that adds a penalty to the model’s cost function to discourage overly complex models. It helps reduce the size of the parameters, making the model less sensitive to noise.

---

## 5. Regularization: A Closer Look

Regularization is particularly useful when you’re uncertain about which features to include or exclude. It works by adding a penalty term to the cost function, which shrinks the model parameters.

### Regularization Function

The regularization term is added to the cost function as follows:

```math
J(w, b) = \text{Original Cost Function} + \lambda \sum_{i=1}^{n} w_i^2
```

Here:

- $$\lambda$$ is the regularization parameter.
- $$\sum_{i=1}^{n} w_i^2$$ is the L2 regularization term (also known as Ridge regularization).

### Example of Regularization

Suppose you’re training a logistic regression model. Without regularization, the cost function might be:

```math
J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]
```

With L2 regularization, it becomes:

```math
J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right] + \lambda \sum_{i=1}^{n} w_i^2
```

#### Choosing the Right Lambda

- **If $$\lambda$$ is too high**: The model becomes too simple, leading to underfitting.
- **If $$\lambda$$ is too low**: The model remains complex, leading to overfitting.
  -The goal is to choose a $$\lambda$$ that balances bias and variance, ensuring good generalization.

---

## 6. Key Takeaways

- ✅ **Generalization** is the ability of a model to perform well on unseen data.

- ✅ **Overfitting** occurs when a model is too complex and captures noise, leading to high variance.

- ✅ **Underfitting** occurs when a model is too simple and fails to capture patterns, leading to high bias.

- ✅ Strategies to address overfitting include collecting more data, feature selection, and regularization.

- ✅ Regularization adds a penalty term to the cost function to reduce model complexity.

- ✅ Choosing the right $$\lambda$$ is crucial to balance bias and variance.

By understanding and addressing overfitting and underfitting, you can build machine learning models that generalize well and perform reliably in real-world scenarios.
