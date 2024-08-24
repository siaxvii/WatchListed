import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Recommender import get_recommendations, vectorize_features, load_data, prepare_data

#============== DATA PREP ===================

allShows, ratings = load_data()

if allShows is None or ratings is None:
    print("No shows found")
    exit()

allShows = prepare_data(allShows)
tfidf = vectorize_features(allShows)

#============ API ENDPOINTS =================

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/recommendations")
async def recommend_shows(shows: list[str]):

    if len(shows) != 3:
        return {"error": "Please submit exactly 3 shows"}

    all_recommendations = pd.DataFrame()
    for show in shows:
        recommendations = get_recommendations(show, allShows, tfidf)
        if recommendations is not None and not recommendations.empty:
            all_recommendations = pd.concat([all_recommendations, recommendations])

    if all_recommendations.empty:
        return {"error": f"No recommendations found for the shows entered: {', '.join(shows)}"}
    
    top_recommendations = all_recommendations.sort_values('similarity', ascending=False).head(10)

    # Convert DataFrame to a list of dictionaries for JSON serialization
    recommendations_list = top_recommendations['id'].tolist()
    return recommendations_list

@app.get("/recommendations")
async def rec():
    return {"Please submit a POST request to /recommendations with a list of 3 shows."}