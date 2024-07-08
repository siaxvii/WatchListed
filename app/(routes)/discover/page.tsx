import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import NavBar from "@/components/navbar";
// pages/discover.tsx

import React from "react";
import TvShowCard from "@/components/TvShowCard";

const Discover: React.FC = () => {
  const tvShows = [
    {
      title: "Breaking Bad",
      imageUrl: "/images/breaking_bad.jpg", // Ensure you have this image in your public/images folder
      rating: 9.5,
      description: "A high school chemistry teacher turned methamphetamine producer navigates the dangers of the drug trade.",
    },
    {
      title: "Stranger Things",
      imageUrl: "/images/stranger_things.jpg", // Ensure you have this image in your public/images folder
      rating: 8.8,
      description: "A group of kids in the 1980s uncover supernatural mysteries and government conspiracies in their small town.",
    },
    // Add more TV shows as needed
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar/>
      <h1 className="text-4xl font-bold mb-8">All TV Shows</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tvShows.map((show, index) => (
          <TvShowCard
            key={index}
            title={show.title}
            imageUrl={show.imageUrl}
            rating={show.rating}
            description={show.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
