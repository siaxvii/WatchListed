// Fetches recommendations from the recommendations API based on the quiz answers
'use server'

import { Show } from "@/types";
import getShowsByIDs from "./get-shows-by-ids";

const getRecommendations = async (quiz: String[]): Promise<Show[]> => {
  
    const res = await fetch(`${process.env.RECOMMENDATIONS_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
    });

    if (!res.ok) {
        console.error('Failed to fetch recommendations: ' + res.statusText);
    }
        
    return getShowsByIDs(await res.json());
};

export default getRecommendations;