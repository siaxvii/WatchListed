"use client";
import React, { useEffect, useState } from "react";
import TVShowCard from "@/components/TVShowCard";
import axios from "axios";

const Discover: React.FC = () => {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/shows?page=${page}&limit=20`);
        setTvShows(prevShows => [...prevShows, ...response.data]);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <h1 className="text-4xl font-bold mb-8 text-center mt-8">All TV Shows</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
        {tvShows.map(show => (
          <TVShowCard
            key={show.id}
            showId={show.id}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLoadMore}
          className="px-4 py-2 bg-zinc-900 text-white border border-white rounded-md"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Discover;