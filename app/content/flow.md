---
title: Fitting and Predicting
date: "2025-02-01"
---

# Fit and Predict: A Machine Learning Workflow

## 1. Introduction: What Does “Fit and Predict” Mean?

In machine learning, **fitting** a model means training it to recognize patterns in data, while **predicting** involves using those patterns to forecast outcomes. This guide walks through this core workflow using house price prediction as an example.

**Key Concepts**:

- `fit()`: Trains the model on data.
- `predict()`: Generates predictions from new inputs.

---

## 2. Step 1: Prepare Your Dataset

### **Load and Inspect Data**

```python
import pandas as pd
data = pd.read_csv('housing_data.csv')

# View structure and missing values
print(data.head())
print(data.isnull().sum())
```

### Key Tasks

- Remove or impute missing values.
- Identify relevant features (e.g., SquareFeet, Bedrooms).

---

## 3. Step 2: Fit the Model

### **Define Features (X) and Target (y)**

```python
X = data[['SquareFeet', 'Bedrooms']]
y = data['SalePrice']
```

### **Train a Decision Tree**

```python
from sklearn.tree import DecisionTreeRegressor
model = DecisionTreeRegressor()
model.fit(X, y)  # Fit the model to the data
```

### What Happens During Fitting:

- The model learns rules like:

```bash
if SquareFeet > 2000 and Bedrooms == 3 → predict $420,000
```

## 4. Step 3: Make Predictions

### Generate Price Estimates

```python
new_data = [[1800, 2], [2400, 4]]  # New houses to predict
predictions = model.predict(new_data)
print(predictions)  # e.g., [320000, 475000]
```

### **Evaluate Accuracy with MAE**

```python
from sklearn.metrics import mean_absolute_error
train_predictions = model.predict(X)
mae = mean_absolute_error(y, train_predictions)
print(f"Training Error: ${mae:.2f}")
```

## 5. Step 4: Validate and Improve

### **Avoid Overfitting with a Validation Set**

```python
from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2)

model.fit(X_train, y_train)
val_mae = mean_absolute_error(y_val, model.predict(X_val))
print(f"Validation Error: ${val_mae:.2f}")
```

### **Upgrade to a Random Forest**

```python
from sklearn.ensemble import RandomForestRegressor
improved_model = RandomForestRegressor(n_estimators=100)
improved_model.fit(X_train, y_train)
```

## FAQ: Common Fitting Challenges

### **Q: Why does my model perform poorly on new data?**

Overfitting: The model memorized noise in the training data.

Fix: Simplify the model or use cross-validation.

### **Q: How much data do I need to fit a model?**

- Start with at least 100-1000 samples per feature. Smaller datasets benefit from algorithms like decision trees.

### **Q: What if predictions are nonsensical?**

- Check for:
  -- Data leaks (e.g., target variable accidentally included in features).
  -- Incorrect feature scaling.

Fitting and predicting is the core of machine learning—train models, validate, and refine for accurate results.
