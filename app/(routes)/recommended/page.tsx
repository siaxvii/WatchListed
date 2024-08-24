"use client";

import { useEffect, useState } from "react";
import TVShowCard from "@/components/TVShowCard";
import { Spinner } from "@/components/ui/spinner";
import getRecommendations from "@/actions/get-recommendations";

export default function Recommended() {
  const [allShows, setAllShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        //Check if recommendations are stored in localStorage
        // const storedRecommendations = localStorage.getItem('recommendations');

        // if (storedRecommendations) {
        //   setAllShows(JSON.parse(storedRecommendations));
        //   setLoading(false);
        //   return;
        // }

        const quizData = localStorage.getItem('quiz');
        if (!quizData) throw new Error("Quiz data not in localStorage");

        const quiz = JSON.parse(quizData);
        if (quiz.length != 3) throw new Error('Needs exactly 3 shows in quiz data');
        
        const recommendations = await getRecommendations(quiz);
        if (!recommendations) throw new Error('Failed to fetch recommendations');

        //Store recommendations in localStorage
        // localStorage.setItem('recommendations', JSON.stringify(recommendations));
        
        setAllShows(recommendations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center mt-8">Recommended</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-16 mr-10">
          {allShows.map(show => (
            <div key={show.id} className="w-60 cursor-pointer">
              <TVShowCard data={show} showId={show.id} />
            </div>
          ))}
        </div>
        {loading ? <Spinner size="medium" /> : null}
      </div>
    </div>
  )
}