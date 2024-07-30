from flask import Flask, request, jsonify
import pandas as pd
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import MultiLabelBinarizer, StandardScaler
from Recommender import recommend_shows, df, mlb, additional_features, enhanced_model

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    selected_show_names = data['selectedShows']
    user_genre_preferences = mlb.transform([data['genres']])[0]

    recommendations = recommend_shows(selected_show_names, user_genre_preferences)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)