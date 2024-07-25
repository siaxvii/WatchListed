"use client"; // Use this line only if using the `app` directory structure and you want client-side fetching

import React, { useEffect, useState } from 'react';
import TVShowCard from '@/components/TVShowCard';
import getTopRatedShows from '@/actions/get-top-rated';
import { Show } from '@/types';
import { Spinner } from '@/components/ui/spinner';

const TopRatedShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopRatedShows = async () => {
      setLoading(true);
      try {
        const showData = await getTopRatedShows({ page, limit: 10 });
        setShows(prevShows => {
          //Filters out any shows from new data that are already in the previous state
          const newShows = showData.filter(show => !prevShows.some(prevShow => prevShow.id === show.id));
          return [...prevShows, ...newShows];    //Returns a new array that includes all previous shows and new filtered shows
        });
      } catch (err) {
        console.error('Failed to fetch top-rated shows.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopRatedShows();
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909] pb-6">
      <h1 className="text-4xl font-bold mb-8 text-center mt-8">Top Rated</h1>
      <div className="flex justify-center px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {shows.map((show, index) => (
            <TVShowCard
              key={show.id}
              showId={show.id}
              rank={index < 10 ? index + 1 : undefined} //Passes rank for top 10 shows
            />
          ))}
        </div>
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

export default TopRatedShows;