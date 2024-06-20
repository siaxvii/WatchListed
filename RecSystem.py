import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import logging
from typing import List

MAX_FEATURES = 75000
TEST_SIZE = 0.2
RANDOMNESS = 42
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('stopwords', quiet=True)


def main():
    shows = pd.read_csv('TMDB_tv_dataset_v3.csv')
    logger.info("Data loaded successfully")
    logger.info(f"shape of the dataset {shows.shape}")
    shows.drop_duplicates(inplace=True)
    shows.dropna(inplace=True)

    columns = ['id', 'name', 'overview', 'genres', 'number_of_seasons', 'number_of_episodes',
               'first_air_date', 'last_air_date', 'networks', 'vote_average', 'languages']

    # Validate that all required columns exist
    missing_columns = set(columns) - set(shows.columns)
    if missing_columns:
        raise ValueError(f"Missing columns in dataset: {missing_columns}")

    shows = shows[columns]

    # Convert columns to string and combine features
    shows['combined_features'] = (
            shows['overview'].astype(str) + ' ' +
            shows['genres'].astype(str) + ' ' +
            shows['networks'].astype(str) + ' ' +
            shows['number_of_seasons'].astype(str)
    )
    shows = shows.drop(columns=['overview', 'genres'])
    shows['clean_features'] = shows['combined_features'].apply(clean_text)
    training_data, test_data = train_test_split(shows, test_size=TEST_SIZE, random_state=RANDOMNESS)

    tfidf = TfidfVectorizer(max_features=MAX_FEATURES, stop_words='english')
    tfidf_matrix = tfidf.fit_transform(training_data['clean_features'])
    similarity = cosine_similarity(tfidf_matrix, dense_output=False)
    # Test case:
    while True:
        show_to_recommend = input("Enter a show to get similar recommendations (or 'quit' to exit): ")
        if show_to_recommend.lower() == 'quit':
            break
        recommendations = recommend_movies(show_to_recommend, similarity, training_data)
        if isinstance(recommendations, list):
            print("Recommendations:")
            for i, show in enumerate(recommendations, 1):
                print(f"{i}. {show}")
        else:
            print(recommendations)


def recommend_movies(show_name: str, similarity_matrix: csr_matrix, data: pd.DataFrame, n: int = 5) -> List[str]:
    """Recommend similar shows based on the input show name."""
    # Convert the input show name to lowercase
    show_name_lower = show_name.lower()

    # Create a lowercase version of all show names in the dataset
    data['name_lower'] = data['name'].str.lower()

    try:
        # Find the index of the show, ignoring case
        index = data[data['name_lower'] == show_name_lower].index[0]

        distances = sorted(list(enumerate(similarity_matrix[index].toarray().flatten())),
                           reverse=True, key=lambda x: x[1])
        recommended_shows = [data.iloc[i[0]]['name'] for i in distances[1:n + 1]]
        return recommended_shows
    except IndexError:
        return []
    finally:
        # Remove the temporary column we created
        data.drop('name_lower', axis=1, inplace=True)


def clean_text(text: str) -> str:
    """Clean and preprocess the text data."""
    if not isinstance(text, str):
        return ''
    text = text.lower()
    text = re.sub(r'[^\w\s\d]', '', text)
    words = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(word) for word in words]
    return ' '.join(words)


if __name__ == '__main__':
    main()
