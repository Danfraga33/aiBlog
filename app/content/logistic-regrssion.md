---
title: Logisitic Regression
parent: supervised-learning
date: "2025-02-16"
---

# Understanding Logistic Regression: A Beginner’s Perspective

Logistic regression is another fundamental technique in machine learning, often used for **classification tasks**. Unlike linear regression, which predicts continuous values, logistic regression predicts **probabilities** and classifies data into categories. The key concepts of logistic regression include the logistic function, cost functions, and gradient descent. Let’s dive into the details.

## 1. What is Logistic Regression?

Logistic regression is a **supervised learning algorithm** used primarily for **binary classification**, where the goal is to predict one of two possible outcomes (e.g., yes/no, true/false). It can also be extended to handle **multi-class classification** problems.

### The Logistic Function

The logistic function is defined as:

```math
\sigma(z) = \frac{1}{1 + e^{-z}}
```

### The Core Idea

At its heart, logistic regression models the probability that a given input belongs to a specific class. It does this by using the logistic function (also known as the **sigmoid function**), which maps any real-valued number into a value between 0 and 1. This output can be interpreted as a probability.

```math
\sigma(z) = \frac{1}{1 + e^{-z}}
```

where

The logistic function ensures that the output is always between 0 and 1, making it suitable for probability estimation.

## 2. How Does Logistic Regression Make Predictions?

Once the logistic function computes the probability, a **decision boundary** is used to classify the input into one of the two classes. Typically, a threshold of 0.5 is used:

```math
\hat{y} =
\begin{cases}
1 & \text{if } \sigma(z) \geq 0.5 \\
0 & \text{if } \sigma(z) < 0.5
\end{cases}
```

This means:

- If the predicted probability is **greater than or equal to 0.5**, the model predicts class 1.
- If the predicted probability is **less than 0.5**, the model predicts class 0.

## 3. Measuring Performance: The Cost Functions

In logistic regression, we need a way to measure how well the model is performing. For this, we use the log loss (also known as binary cross-entropy) function. This function quantifies the difference between the predicted probabilities and the actual labels.

### The Log Loss Function

The cost function for logistic regression is:

```math
J(w, b) = -\frac{1}{n} \sum_{i=1}^{n} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]
```

where:

- $ n $ is the number of training samples,
- $ \hat{y_i} $ is the actual label for sample $i$ (0 or 1),
- $ \hat{y} $ is the predicted probability for sample $ i $

The goal is to **minimize** this cost function, as a lower value indicates better predictions.

## 4. Optimizing the Model: Gradient Descent

To find the optimal weights and bias that minimize the cost function, we use **gradient descent**. This iterative optimization algorithm adjusts the weights and bias in the direction of the negative gradient of the cost function

```math
w = w - \alpha \frac{\partial J}{\partial w}
```

```math
b = b - \alpha \frac{\partial J}{\partial b}
```

where:

- $$\alpha$$ is the **learning rate**, which controls the size of the update steps.
- $$ \frac{\partial J}{\partial w} $$ and $$ \frac{\partial J}{\partial b} $$ are the gradients of the cost function with respect to the weights and bias.

### Choosing the Right Learning Rate

- A **learning rate that is too high** can cause the model to overshoot the optimal solution and fail to converge.
- A **learning rate that is too low** can make training slow and inefficient.
- A common strategy is to start with a small learning rate and adjust it based on the model’s performance.

## 5. Speeding Up Computations: Vectorization

In practice, logistic regression often involves **multiple features** and large datasets. To make computations efficient, we use **vectorization**, which allows us to perform operations on entire matrices instead of looping through individual features.

### Matrix Representation

Instead of computing predictions one by one, we use matrix operations:

```math
Z = XW + b
```

where:

- $ X $ is a **matrix** of shape ($m,n$) where $m$ is the number of training samples and $n$ is the number of features
- $W$ is the **vector** of shape ($n,1$) containing all the weights
- $b$ is a **scalar** or sometimes a **vector** for broadcasting.
- $Z$ is a **vector** of linear combinations.

Benefits of Vectorization

- **Speed**: Matrix operations are highly optimized in libraries like NumPy, TensorFlow, and PyTorch.
- **Efficiency**: Reduces the need for explicit loops, making the code cleaner and faster.

## 6. Handling Complex Data: Beyond Linearity

Logistic regression assumes a **linear relationship** between the input features and the log-odds of the output. However, real-world data is often more complex and may not follow a linear pattern

### When Logistic Regression Fails

If the data is not linearly separable, logistic regression may struggle to classify the data accurately. This can lead to underfitting, where the model fails to capture the underlying patterns.

Since we’re dealing with **supervised learning**, we have actual output values $$ y $$, which allows us to calculate **error**. We use the **Mean Squared Error (MSE)** as the cost function:

1. Feature Engineering: Create new features that capture non-linear relationships. Example: If you have features like
2. Regularization: Techniques like **L1 (Lasso)** and **L2 (Ridge)** regularization can help prevent overfitting by penalizing large weights.
3. Kernel Methods: Transform the data into a higher-dimensional space where it becomes linearly separable.

## 7. Practical Tips and Best Practices

To get the most out of logistic regression, consider the following tips:

- **Normalize Features**: Scaling input features can help gradient descent converge faster.
- **Regularization**: Use regularization to avoid overfitting, especially with high-dimensional data.
- **Evaluate Performance**: Use metrics like accuracy, precision, recall, and F1-score to evaluate your model.
- **Experiment with Learning Rates**: Start with a small learning rate and adjust it based on the model’s performance.

## 8. Key Takeaways

- ✅ Logistic regression is used for binary and multi-class classification. -
- ✅ The logistic function maps predictions to probabilities between 0 and 1.
- ✅ The log loss function measures the error between predictions and actual labels.
- ✅ Gradient descent optimizes the model by minimizing the cost function.
- ✅ Vectorization speeds up computations by using matrix operations.
- ✅ Feature engineering and regularization help handle non-linear data and prevent overfitting.
