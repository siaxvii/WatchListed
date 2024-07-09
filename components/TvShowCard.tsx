"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface TVShowCardProps {
  showId: number;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ showId }) => {
  const [show, setShow] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(`/api/shows/${showId}`);
        setShow(response.data);
      } catch (err) {
        setError("Failed to fetch show details.");
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!show) return <p>No show data available.</p>;

  return (
    <div className="relative w-60 h-80 m-4 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${show.backgroundpath}`}
        alt={show.name}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-semibold">{show.name}</h3>
        <p className="text-yellow-400 text-sm">Rating: {show.rating.toFixed(1)}/10</p>
        <p className="text-gray-300 text-sm mt-2">{show.overview}</p>
      </div>
    </div>
  );
};

export default TVShowCard;