"use client"; // should be treated as a client component

import React from "react";
import Image from "next/image";

interface TvShowCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  description: string;
}

const TvShowCard: React.FC<TvShowCardProps> = ({ title, imageUrl, rating, description }) => {
  return (
    <div className="relative w-60 h-80 m-4 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="text-yellow-400 text-sm">Rating: {rating}/10</p>
        <p className="text-gray-300 text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default TvShowCard;