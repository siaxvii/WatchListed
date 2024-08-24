import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from fuzzywuzzy import process


def load_data(shows_path='venv/final.csv', ratings_path='venv/ratings.csv'):
    try:
        shows = pd.read_csv(shows_path)
        ratings = pd.read_csv(ratings_path)
    except FileNotFoundError as e:
        print(f"Error loading data: {e}")
        return None, None
    return shows, ratings

def clean_text(text):
    return re.sub("[^a-zA-Z0-9\s]", "", text).lower()

def prepare_data(shows):
    shows = shows.dropna(subset=["genres"])
    shows["clean_name"] = shows["name"].apply(clean_text)
    shows["clean_overview"] = shows["overview"].apply(clean_text)
    shows["combined_features"] = (
            shows["genres"] + " " + shows["clean_name"] + " " + shows["clean_overview"] + " " + shows["languages"]
    )
    return shows


def vectorize_features(shows):
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words='english')
    tfidf = vectorizer.fit_transform(shows["combined_features"])
    return tfidf


def find_best_match(partial_name, show_names):
    best_match = process.extractOne(partial_name, show_names)
    return best_match[0] if best_match[1] >= 90 else None


def calculate_genre_similarity(genre1, genre2):
    set1 = set(eval(genre1))
    set2 = set(eval(genre2))
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    return len(intersection) / len(union) if union else 0


def get_recommendations(title, shows, tfidf):
    best_match = find_best_match(title, shows['name'])
    if best_match is None:
        return None

    title_cleaned = clean_text(best_match)
    show_row = shows[shows['clean_name'] == title_cleaned]
    if show_row.empty:
        return None

    index = show_row.index[0]
    show_language = show_row['languages'].values[0]
    show_genres = show_row['genres'].values[0]

    query_vector = tfidf[index]
    content_similarity = cosine_similarity(query_vector, tfidf).flatten()

    genre_similarity = np.array([calculate_genre_similarity(show_genres, genres) for genres in shows['genres']])

    similarity = (content_similarity * 0.7) + (genre_similarity * 0.3)

    language_mask = shows['languages'] == show_language
    similarity = similarity * language_mask.values
    similarity[index] = 0

    similar_indices = np.argsort(similarity)[::-1][:10]
    similar_indices = [i for i in similar_indices if similarity[i] > 0]

    results = shows.iloc[similar_indices].copy()
    results['similarity'] = similarity[similar_indices]
    results = results.sort_values('similarity', ascending=False)

    return results[['id', 'similarity']]


def main():
    shows, ratings = load_data()
    if shows is None or ratings is None:
        return

    shows = prepare_data(shows)
    tfidf = vectorize_features(shows)

    show_inputs = []
    for _ in range(3):
        show_input = input("Please enter a show you like (or press Enter to finish): ").strip()
        if show_input:
            show_inputs.append(show_input)
        else:
            break

    if not show_inputs:
        print("No shows entered.")
        return

    all_recommendations = pd.DataFrame()
    for show_input in show_inputs:
        recommendations = get_recommendations(show_input, shows, tfidf)
        if recommendations is not None and not recommendations.empty:
            all_recommendations = pd.concat([all_recommendations, recommendations])

    if not all_recommendations.empty:
        all_recommendations = all_recommendations.drop_duplicates(subset=['name']).sort_values('similarity', ascending=False)
        top_recommendations = all_recommendations.head(10)
        print(top_recommendations[['name', 'genres', 'languages']])
    else:
        print(f"No recommendations found for the shows entered: {', '.join(show_inputs)}")


if __name__ == "__main__":
    main()
