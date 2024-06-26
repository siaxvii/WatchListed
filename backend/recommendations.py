import sys
import json
import logging
from RecSystem1 import load_data, recommend_movies

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_recommendations(movie_name):
    try:
        similarity_matrix, training_data = load_data()
        recommendations = recommend_movies(movie_name, similarity_matrix, training_data)
        return recommendations
    except Exception as e:
        logger.error(f"Error in get_recommendations: {e}")
        return {"error": str(e)}

if __name__ == '__main__':
    try:
        if len(sys.argv) > 1:
            movie_name = sys.argv[1]
            recommendations = get_recommendations(movie_name)
            print(json.dumps(recommendations))
        else:
            print(json.dumps([]))
    except Exception as e:
        logger.error(f"Error in main: {e}")
        print(json.dumps({"error": str(e)}))
