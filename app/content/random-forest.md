---
title: Random Forest
parent: supervised-learning
date: '2025-02-27'
---

# Random Forests: Striking the Balance Between Underfitting and Overfitting

When it comes to decision trees, there's a delicate balance to strike. A deep tree with many leaves might seem powerful, but it often falls into the trap of **overfitting**. This happens because each prediction is based on a small subset of historical data, leading to poor generalization on new data. On the other hand, a shallow tree with few leaves might **underfit**, failing to capture the nuances and distinctions in the raw data.

This tension between underfitting and overfitting isn't unique to decision trees—it's a challenge faced by even the most sophisticated modeling techniques today. However, some models have clever ways to navigate this trade-off, and one such model is the **Random Forest**.

## What is a Random Forest?

A Random Forest is an **ensemble method** that builds multiple decision trees and combines their predictions. Instead of relying on a single tree, it averages the predictions of many trees, which often leads to better predictive accuracy. The "random" part comes from the fact that each tree is trained on a random subset of the data and features, introducing diversity that helps the model generalize better.

One of the great things about Random Forests is that they work well with **default parameters**, making them a reliable choice even if you're not an expert in tuning models. While there are more advanced models out there, many of them require careful parameter tuning to achieve optimal performance.

## A Quick Example

Let's take a look at how you can implement a Random Forest using Python's `scikit-learn` library. Suppose you have your data split into training and validation sets (`train_X`, `val_X`, `train_y`, `val_y`). Here's how you can build and evaluate a Random Forest model:

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# Initialize the model
forest_model = RandomForestRegressor(random_state=1)

# Fit the model on the training data
forest_model.fit(train_X, train_y)

# Make predictions on the validation data
melb_preds = forest_model.predict(val_X)

# Evaluate the model
print(mean_absolute_error(val_y, melb_preds))
```

In this example, we use the RandomForestRegressor class to create a Random Forest model. After training the model on the training data, we make predictions on the validation set and evaluate the performance using the **Mean Absolute Error (MAE)**.

### Why Random Forests?

Random Forests are a powerful tool in the machine learning toolkit. They offer a robust way to handle the trade-off between underfitting and overfitting, often delivering strong performance with minimal tuning. Whether you're just starting out or looking for a reliable model to add to your pipeline, Random Forests are definitely worth considering.
