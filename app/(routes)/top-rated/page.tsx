"use client"; // Use this line only if using the `app` directory structure and you want client-side fetching

import React, { useEffect, useState } from 'react';
import TVShowCard from '@/components/TVShowCard';
import getTopRatedShows from '@/actions/get-top-rated';
import { Show } from '@/types';

const TopRatedShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopRatedShows = async () => {
      try {
        const showData = await getTopRatedShows();
        setShows(showData);
      } catch (err) {
        setError('Failed to fetch top-rated shows.');
      }
    };

    fetchTopRatedShows();
  }, []);

  if (error) return <p>{error}</p>;
  if (shows.length === 0) return <p>Loading...</p>;

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <h1 className="text-4xl font-bold mb-8 text-center mt-8">Top Rated</h1>
      <div className="flex justify-center px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-14 gap-50 max-w-screen-lg">
          {shows.map(show => (
            <TVShowCard
              key={show.id}
              showId={show.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRatedShows;
