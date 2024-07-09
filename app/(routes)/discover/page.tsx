"use client";

import React, { useEffect, useState } from "react";
import TvShowCard from "@/components/TVShowCard";
import axios from "axios";

const Discover: React.FC = () => {
  const [tvShow, setTvShow] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      try {
        // Fetch show with ID 2
        const response = await axios.get(`/api/shows/2`);
        setTvShow(response.data);
      } catch (error) {
        console.error("Error fetching show:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <h1 className="text-4xl font-bold mb-8 text-center">TV Show Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tvShow ? (
          <TvShowCard
            key={tvShow.id}
            showId={tvShow.id}
          />
        ) : (
          <p className="text-center">No show found</p>
        )}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setTvShow(null)} // Optional: To clear the show
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Clear"}
        </button>
      </div>
    </div>
  );
};

export default Discover;