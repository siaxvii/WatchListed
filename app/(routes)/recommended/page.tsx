"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import getRecommendations from "@/actions/get-recommendations";
import RecommendedShowCard from "@/components/RecommendedShowCard";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Recommended() {
  const [allShows, setAllShows] = useState<any[]>([]);
  const [visibleShows, setVisibleShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

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
          setVisibleShows(recommendations.slice(0, 3)); // Show the first 3 recommendations

        } else if (storedRecommendations) {
          // If quiz data is missing but recommendations exist in cache, use cached recommendations
          setAllShows(JSON.parse(storedRecommendations));
          setVisibleShows(JSON.parse(storedRecommendations).slice(0, 3));
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
  }, [user]); // Added isSignedIn as a dependency to refetch recommendations if sign-in status changes

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

  const handleStartNowClick = () => {
    if (!user) router.push('/sign-up');
  };

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-center mb-20">
          {loading 
            ? "Curating Your Personal WatchList..." 
            : user 
              ? "Top Picks For You" 
              : 
              <div className="mt-12">
                <h1> Sign in to view recommended shows! </h1>
                <Button variant="default" className="mt-12 hover:shadow-amber-400 transition-shadow duration-300 ease-in-out hover:shadow-md transform hover:scale-105" onClick={handleStartNowClick}> Start now! </Button>
              </div>
          }
        </h1>
        {user && (
          <div className="grid grid-cols-3 gap-10 px-16 mr-10">
            {visibleShows.map(show => (
              <div key={show.id} className="w-60 cursor-pointer">
                <RecommendedShowCard data={show} showId={show.id} onRemove={handleRemove} />
              </div>
            ))}
          </div>
        )}
        {loading && <Spinner size="large" />}
      </div>
    </div>
  );
}