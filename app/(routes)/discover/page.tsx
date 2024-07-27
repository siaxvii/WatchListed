"use client";
import React, { useEffect, useState } from "react";
import TVShowCard from "@/components/TVShowCard";
import getShows from "@/actions/get-shows";
import { Spinner } from '@/components/ui/spinner';

const Discover: React.FC = () => {
  const [tvShows, setTVShows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        const shows = await getShows({ page, limit: 10 });
        setTVShows(prevShows => {
          //Filters out any shows from new data that are already in the previous state
          const newShows = shows.filter(show => !prevShows.some(prevShow => prevShow.id === show.id));
          return [...prevShows, ...newShows];    //Returns a new array that includes all previous shows and new filtered shows
        });
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
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909] pb-6">
      <h1 className="text-4xl font-bold mb-8 text-center mt-8">All TV Shows</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 px-16 ml-10 mr-10">
        {tvShows.map(show => (
          <TVShowCard
            data= {show}
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
          {loading ? <Spinner size="medium" /> : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Discover;