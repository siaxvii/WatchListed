// Displays recommended shows based on the user's quiz results
"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import getRecommendations from "@/actions/get-recommendations";
import RecommendedShowCard from "@/components/RecommendedShowCard";

export default function Recommended() {
  const [allShows, setAllShows] = useState<any[]>([]);
  const [visibleShows, setVisibleShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Check if recommendations are stored in localStorage
        const storedRecommendations = localStorage.getItem('recommendations');
        
        if (storedRecommendations) {
          const recommendations = JSON.parse(storedRecommendations);
          setAllShows(recommendations);
          setVisibleShows(recommendations.slice(0, 3));
          setLoading(false);
          return;
        }

        const quizData = localStorage.getItem('quiz');

        // If the quiz data exists, clear the old recommendations and fetch new ones
        if (quizData) {
          // Clear old recommendations
          localStorage.removeItem('recommendations');
          
          const quiz = JSON.parse(quizData);
          if (quiz.length !== 3) throw new Error('Needs exactly 3 shows in quiz data');

          const recommendations = await getRecommendations(quiz);
          if (!recommendations) throw new Error('Failed to fetch recommendations');

          // Store new recommendations in localStorage
          localStorage.setItem('recommendations', JSON.stringify(recommendations));

          setAllShows(recommendations);
          window.location.reload();  // Reloads the page to show the new recommendations

        } else if (storedRecommendations) {
          // If quiz data is missing but recommendations exist in cache, use cached recommendations
          setAllShows(JSON.parse(storedRecommendations));
        } else {
          // No recommendations and no quiz data, handle this scenario as needed (e.g., show an error)
          console.error('No quiz data or recommendations found');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleRemove = (id: number) => {
    // Filter out the show with the given ID
    const updatedShows = allShows.filter(show => show.id !== id);
    setAllShows(updatedShows);

    // Update the recommendations in localStorage
    localStorage.setItem("recommendations", JSON.stringify(updatedShows));
    // Update visible shows
    const nextVisibleShows = updatedShows.slice(0, 3); // Get the next 3 shows
    setVisibleShows(nextVisibleShows);
  };

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-center mb-20"> {loading ? "Curating Your Personal WatchList..." : "Top Picks For You"} </h1>
        <div className="grid grid-cols-3 gap-10 px-16 mr-10">
          {visibleShows.map(show => (
            <div key={show.id} className="w-60 cursor-pointer">
              <RecommendedShowCard data={show} showId={show.id} onRemove={handleRemove}/>
            </div>
          ))}
        </div>
        {loading ? <Spinner size="large" /> : null}
      </div>
    </div>
  );
}