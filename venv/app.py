from contextlib import asynccontextmanager
from fastapi import FastAPI

# from Recommender import get_recommendations
import Recommender


@asynccontextmanager
async def lifespan(app: FastAPI):

    Recommender.get_recommendations(title, shows, tfidf)


    # Load the ML model
    ml_models["answer_to_everything"] = fake_answer_to_everything_ml_model
    yield
    # Clean up the ML models and release the resources
    ml_models.clear()

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"Hello": "World"}