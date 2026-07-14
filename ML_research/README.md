**ConnectToCare: ML Training \& Validation Pipeline**

This directory contains the offline machine learning experiments used to generate the Clinical Behavioral Weights utilized in the ConnectToCare production application.



**Overview**

To ensure our application provides clinically relevant insights, we performed offline feature importance analysis on the Q-CHAT-10 dataset. This allows the ConnectToCare backend to intelligently prioritize behavioral screenings without requiring heavy, live ML inference in a clinical production environment.



**Folder Contents**

EarlyAutismDetection.ipynb: The Jupyter Notebook containing the training pipeline (Random Forest/XGBoost). This script generates the normalized feature importance weights used in our FastAPI backend.



qchat\_dataset.csv: The proxy research dataset used to train the model.



**Methodology**

Data Training: We trained our models on the Q-CHAT-10 proxy dataset to identify high-predictive behavioral markers.



Feature Mapping: We extracted the feature importance scores and normalized them into a weight map (ML\_BEHAVIORAL\_WEIGHTS).



Clinical Validation: These findings were cross-referenced against independent 2025 clinical research (e.g., Chen et al.) to ensure the weights align with established behavioral red flags (Joint Attention, Pretend Play, etc.).



Offline Integration: These validated weights are exported as a static lookup table to our production FastAPI server to ensure zero-latency behavioral sorting.



**Reproducibility**

To reproduce our results:



* Ensure pandas, scikit-learn, and xgboost are installed.



* Open EarlyAutismDetection.ipynb in Jupyter or Google Colab.



* Ensure qchat\_dataset.csv is in the same directory.



* Run the cells to generate the feature importance weights.

