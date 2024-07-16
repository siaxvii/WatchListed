"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaStar } from "react-icons/fa";

interface Show {
  id: number;
  name: string;
  overview: string;
  rating: number;
  backgroundpath: string;
  genres: string[];
  firstaired: string; 
  lastaired: string; 
  numseason: number; 
  numepisodes: number; 
}

const ShowPage: React.FC = () => {
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      const { pathname } = window.location;
      const showId = pathname.split('/').pop();

      if (showId) {
        try {
          const response = await axios.get(`/api/shows/${showId}`);
          setShow(response.data);
        } catch (err) {
          setError('Failed to fetch show details.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchShow();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!show) return <p>No show data available.</p>;

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long' } as const;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const firstAiredFormatted = formatDate(show.firstaired);
  const lastAiredFormatted = formatDate(show.lastaired);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-[#1B1919] to-[#090909] text-white flex">
      <div className="flex-shrink-0 mr-8">
        <Image
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${show.backgroundpath}`}
          alt={show.name}
          width={300}
          height={450}
          className="rounded-lg border-2 border-white"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">{show.name}</h1>
          <div className="flex items-center text-lg">
            <h3 className="text-xl font-bold pr-2">WatchListed Rating: {show.rating.toFixed(1)}/10 </h3>
            <FaStar className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
        <br></br>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {show.genres.map((genre, index) => (
              <span
                key={index}
                className="px-4 py-2 border border-gray-400 rounded-md bg-zinc-900 text-white"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <br></br>
        <div>
          <p className="pr-20 text-2xl max-w-5xl">{show.overview}</p>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">
            {firstAiredFormatted === lastAiredFormatted ? (
              <span>Last Aired: {lastAiredFormatted}</span>
            ) : (
              <span>Aired: {firstAiredFormatted} - {lastAiredFormatted}</span>
            )}
          </div>
          <div className="text-2xl font-bold">
            <span>
              {show.numseason} {show.numseason === 1 ? 'season' : 'seasons'}
              {show.numepisodes > 0 && (
                <span>, {show.numepisodes} {show.numepisodes === 1 ? 'episode' : 'episodes'}</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;