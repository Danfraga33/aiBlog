---
title: Linear Regression
parent: supervised-learning
date: "2025-02-09"
---

# Understanding Linear Regression: A Beginner’s Perspective

Linear regression is one of the fundamental techniques in machine learning. It’s a **supervised learning algorithm** used for predicting a continuous output based on input features. The key concepts of linear regression are linear regression modelling, cost functions, and gradient descent (optimizing). For non-linear, we use other regression strategies.

## 1. Linear Regression: The Basics

In **supervised learning**, we have two main types of tasks:

- **Regression**: Predicting continuous values (e.g., house prices, stock prices).
- **Classification**: Predicting categories (e.g., spam vs. not spam).

Linear regression falls under **regression**. It assumes a **linear relationship** between the input features and the output. The general equation for a single-feature linear regression is:

```math
\hat{y} = wx + b
```

| Term          | Description                                             |
| ------------- | ------------------------------------------------------- |
| $$ \hat{y} $$ | The predicted output.                                   |
| $$ w $$       | Weight, represents the influence of $$ x $$ on $$ y $$. |
| $$ x $$       | The input feature.                                      |
| $$ b $$       | The bias term (y-intercept).                            |

The simplest version of linear regression involves a **single feature**, meaning we predict an outcome based on just one input. The prediction is made by multiplying the input by a weight (which determines its influence) and adding a bias term (which adjusts the overall prediction).

The goal is to find the best values for the weight and bias so that the model makes accurate predictions.

## 2. Cost Function: Measuring Error

Since we’re dealing with **supervised learning**, we have actual output values $$ y $$, which allows us to calculate **error**. We use the **Mean Squared Error (MSE)** as the cost function:

```math
J(w, b) = \frac{1}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)^2
```

where:

- $ n $ is the number of training samples.
- $ \hat{y_i}$ is the predicted value for sample $i$,
- $y_i$ is the actual value.

The goal is to minimize $J(w, b)$ so that our model makes the best possible predictions.

## 3. Gradient Descent: Optimizing the Weights

We update $$ w $$ and $$ b $$ iteratively using **gradient descent**. This optimization algorithm moves in the direction of the negative gradient of the cost function to find the lowest possible error.

$$
w = w - \alpha \frac{\partial J}{\partial w}
$$

$
b = b - \alpha \frac{\partial J}{\partial b}
$

where:

- $$\alpha$$ is the **learning rate**, controlling how big the update steps are.
- $$ \frac{\partial J}{\partial w} $$ and $$ \frac{\partial J}{\partial b} $$ are the gradients (derivatives of the cost function).

A **learning rate that is too high** may cause the model to overshoot and fail to converge. A **learning rate that is too low** will make training painfully slow.

### Debugging Learning Rate Issues

- If **cost function increases**, there might be a **bug in the code** or the **learning rate is too high**.
- A common trick is to start with a **very small learning rate** and see if the cost function decreases steadily.

## 4. Vectorization: Making Computation Efficient

In real-world applications, we often have **multiple features** instead of just one. Instead of computing predictions individually, we use **vectorization** to optimize calculations using matrix operations.

Instead of:

$$
\hat{y} = w_1 x_1 + w_2 x_2 + w_3 x_3 + b
$$

we use:

$$

\hat{Y} = XW + b
$$

where:

- $ X $ is a **matrix** of shape $ (m, n) $, where $ m $ is the number of training samples and $ n $ is the number of features.
- $ W $ is a **vector** of shape $ (n, 1) $ containing all the weights.
- $ b $ is a **scalar** or sometimes a **vector** for broadcasting.
- $ \hat{Y} $ is a **vector** of predictions.

### **Why Use Vectorization?**

- **Speed**: Performing operations on entire matrices instead of looping over individual features is much faster.
- **Efficiency**: Libraries like NumPy, TensorFlow, and PyTorch are optimized for vectorized operations.

Instead of computing each weight update separately, gradient descent is applied using matrix multiplication:

$$
W = W - \alpha \frac{1}{m} X^T (XW - Y)
$$

This is **much faster** than updating weights one by one.

## 5. When Linear Regression Fails: Non-Linearity

If the data is **not linearly related**, a simple **linear regression model won’t work**. The model may underfit, meaning it won’t capture the patterns in the data.

### **Solutions:**

1. **Polynomial Regression**:

   - If the relationship is curved, we can add polynomial features like $ x^2 $, $ x^3 $, etc.
   - This transforms linear regression into a **higher-degree polynomial model**.

2. **Feature Engineering**:

   - We can **create new features** that capture relationships.
   - Example: If **frontage ($ x_1 $)** and **depth ($ x_2 $)** define an area, we can introduce **area ($ x_3 $)** as a feature:

$$
   x_3 = x_1 \times x_2
$$

- This can help the model learn **non-linear relationships** without needing polynomial regression.

## **Final Thoughts**

Linear regression is one of the first algorithms many data scientists and machine learning engineers learn, but fully understanding concepts like **cost functions, gradient descent, vectorization, and feature engineering** can significantly improve how we apply it.

### **Key Takeaways:**

✅ **Linear regression finds the best-fit line for continuous predictions.**  
✅ **The cost function measures error.**
✅ **Gradient descent optimizes it.**
✅ **Vectorization makes computations efficient by using matrix operations.**  
✅ **Feature engineering and polynomial regression help when relationships aren’t linear.**
