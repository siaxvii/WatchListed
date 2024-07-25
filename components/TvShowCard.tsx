"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoBookmarkSharp } from "react-icons/io5";
import getShow from "@/actions/get-show";
import { Show } from "@/types";

interface TVShowCardProps {
  showId: number;
  rank?: number;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ showId, rank }) => {
  const [show, setShow] = useState<Show | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const showData = await getShow(showId);
        setShow(showData);
      } catch (err) {
        setError("Failed to fetch show details.");
      }
    };

    fetchShow();
  }, [showId]);

  if (error) return <p>{error}</p>;
  if (!show) return null;

  return (
    <div className="relative w-60 m-4 bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-opacity duration-300 hover:opacity-40">
      {rank && (
        <div className="-top-1 absolute top-0 right-0 flex items-center justify-center space-x-1 z-10">
          <IoBookmarkSharp className="top-0 text-yellow-400 text-5xl" />
          <span className="absolute text-sm text-black font-bold pb-2">#{rank}</span>
        </div>
      )}
      <div className="relative w-full h-72 top-0">
        <Image
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${show.backgroundpath}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 text-center">
        <Link href={`/show/${showId}`} className="text-white text-lg font-semibold">
          {show.name}
        </Link>
        <p className="text-yellow-400 text-sm mt-1 font-bold text-center">
          WatchListed Rating: {show.watchlistedrating.toFixed(1)}/10
        </p>
      </div>
    </div>
  );
};

export default TVShowCard;