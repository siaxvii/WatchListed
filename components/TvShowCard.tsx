"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

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
    <div className="relative w-60 m-4 bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-opacity duration-300 hover:opacity-40">
      <div className="relative w-full h-72">
        <Image
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${show.backgroundpath}`}
          alt={show.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 text-center">
        <Link href={`/show/${showId}`} className="text-white text-lg font-semibold">
          {show.name}
        </Link>
        <p className="text-yellow-400 text-sm mt-1 font-bold text-center">
          Rating: {show.watchlistedrating.toFixed(1)}/10
        </p>
      </div>
    </div>
  );
};

export default TVShowCard;