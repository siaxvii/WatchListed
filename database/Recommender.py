import pandas as pd
import tensorflow as tf
import tensorflow_recommenders as tfrs
from sklearn.preprocessing import MultiLabelBinarizer, StandardScaler
import numpy as np

df = pd.read_csv('final.csv')
df['genres'] = df['genres'].apply(eval)

mlb = MultiLabelBinarizer()
genres_encoded = mlb.fit_transform(df['genres'])
df = pd.concat([df, pd.DataFrame(genres_encoded, columns=mlb.classes_, index=df.index)], axis=1)

df['name'] = df['name'].astype(str)

scaler = StandardScaler()
additional_features = df[['number_of_seasons', 'number_of_episodes', 'vote_average',
                          'weighted_rating', 'vote_count', 'popularity', 'watchlisted_rating']]
additional_features_scaled = scaler.fit_transform(additional_features)

train_indices = np.random.rand(len(df)) < 0.8
train_df = df[train_indices]
val_df = df[~train_indices]

tf_train_dataset = tf.data.Dataset.from_tensor_slices({
    "show_name": train_df["name"].values,
    "genres": train_df[mlb.classes_].values.tolist(),
    "additional_features": scaler.transform(train_df[additional_features.columns]).tolist()
}).shuffle(len(train_df)).batch(32)

tf_val_dataset = tf.data.Dataset.from_tensor_slices({
    "show_name": val_df["name"].values,
    "genres": val_df[mlb.classes_].values.tolist(),
    "additional_features": scaler.transform(val_df[additional_features.columns]).tolist()
}).batch(32)


class EnhancedShowModel(tfrs.Model):
    def __init__(self):
        super().__init__()
        embedding_dimension = 256
        self.show_embedding = tf.keras.Sequential([
            tf.keras.layers.StringLookup(vocabulary=df["name"].unique(), mask_token=None),
            tf.keras.layers.Embedding(len(df["name"].unique()) + 1, embedding_dimension),
            tf.keras.layers.Dense(embedding_dimension, activation="relu"),
            tf.keras.layers.Dropout(0.5)
        ])
        self.genre_embedding = tf.keras.Sequential([
            tf.keras.layers.Dense(embedding_dimension, activation="relu"),
            tf.keras.layers.Dense(embedding_dimension, activation="relu"),
            tf.keras.layers.Dropout(0.5)
        ])
        self.additional_embedding = tf.keras.Sequential([
            tf.keras.layers.Dense(embedding_dimension, activation="relu"),
            tf.keras.layers.Dropout(0.5)
        ])
        self.combiner = tf.keras.Sequential([
            tf.keras.layers.Dense(embedding_dimension, activation="relu"),
            tf.keras.layers.Dense(embedding_dimension, activation="relu"),
            tf.keras.layers.Dense(embedding_dimension, activation="relu")
        ])
        self.task = tfrs.tasks.Retrieval()

    def compute_loss(self, features, training=False):
        show_embeddings = self.show_embedding(features["show_name"])
        genre_embeddings = self.genre_embedding(features["genres"])
        additional_embeddings = self.additional_embedding(features["additional_features"])
        combined_embeddings = tf.concat([show_embeddings, genre_embeddings * 2, additional_embeddings], axis=1)
        combined_embeddings = self.combiner(combined_embeddings)
        return self.task(show_embeddings, combined_embeddings)

    def call(self, inputs):
        show_embeddings = self.show_embedding(inputs["show_name"])
        genre_embeddings = self.genre_embedding(inputs["genres"])
        additional_embeddings = self.additional_embedding(inputs["additional_features"])
        combined_embeddings = tf.concat([show_embeddings, genre_embeddings * 2, additional_embeddings], axis=1)
        combined_embeddings = self.combiner(combined_embeddings)
        return combined_embeddings


enhanced_model = EnhancedShowModel()
enhanced_model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001))

def recommend_shows(selected_show_names, user_genre_preferences):
    selected_show_features = np.array([get_additional_features(show_name) for show_name in selected_show_names])
    query = {
        "show_name": tf.constant(selected_show_names, dtype=tf.string),
        "genres": tf.constant([user_genre_preferences for _ in selected_show_names], dtype=tf.float32),
        "additional_features": tf.constant(selected_show_features, dtype=tf.float32)
    }
    scores = enhanced_model(query)
    top_k = 10
    top_recommendations_indices = tf.argsort(scores, direction="DESCENDING", axis=1)[:, :top_k]

    top_recommendations_names = []
    seen = set()
    for indices in top_recommendations_indices:
        unique_recs = []
        for index in indices.numpy():
            show_name = df['name'].iloc[index]
            show_genres = df[mlb.classes_].iloc[index].values
            if show_name not in seen and np.sum(user_genre_preferences * show_genres) > 0:
                unique_recs.append(show_name)
                seen.add(show_name)
            if len(unique_recs) >= top_k:
                break
        top_recommendations_names.append(unique_recs)
    return top_recommendations_names[0]


def get_additional_features(show_name):
    if show_name in df['name'].values:
        return df[df['name'] == show_name][additional_features.columns].values[0]
    else:
        return np.mean(additional_features_scaled, axis=0)


random_shows = df.sample(n=3)
selected_show_names = random_shows['name'].tolist()
user_genre_preferences = mlb.transform([list(set().union(*random_shows['genres']))])[0]
recommendations = recommend_shows(selected_show_names, user_genre_preferences)
print("Recommendations:", recommendations)