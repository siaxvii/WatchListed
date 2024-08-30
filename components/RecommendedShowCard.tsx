// Card component for recommended shows
"use client";

import React, { useState, MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoBookmarkSharp } from "react-icons/io5";
import useWatchlist from "@/actions/use-watchlist";
import { Show } from "@/types";
import { Bookmark, X, ThumbsDown } from "lucide-react";
import IconButton from "./ui/icon-button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface TVShowCardProps {
  data: Show;
  showId: number;
  rank?: number;
  onRemove: (id: number) => void;
}

const RecommendedShowCard: React.FC<TVShowCardProps> = ({ data, showId, rank, onRemove }) => {
  const [error, setError] = useState<string | null>(null);
  const watchlist = useWatchlist();

  const onSaveToWatchList: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    watchlist.addItem(data);
  }

  const onRemoveFromWatchList: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    watchlist.removeItem(data.id);
  };

  if (error) return <p>{error}</p>;

  const isInWatchlist = watchlist.items.some(item => item.id === data.id);

  const onRemoveFromRecommended: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Call the onRemove function passed from the parent component to remove the show
    onRemove(data.id);
  };

  return (
    <Link href={`/show/${showId}`} className="block relative w-60 m-4 bg-zinc-800 overflow-visible rounded-lg shadow-lg hover:scale-105 transition-opacity duration-300 group hover:opacity-50">
      <div className="gap-x-6 pb-2 absolute w-full flex justify-center bottom-28 opacity-0 group-hover:opacity-100 z-20">
      {!isInWatchlist && (
        <HoverCard>
          <HoverCardTrigger>
            <IconButton
              onClick={onSaveToWatchList}
              icon={<Bookmark size={25} className="text-gray-800" />}
              className="opacity-100"
            />
          </HoverCardTrigger>
          <HoverCardContent>
            Save To WatchList
          </HoverCardContent>
        </HoverCard>
      )}

      {isInWatchlist && (
        <HoverCard>
          <HoverCardTrigger>
              <IconButton
                onClick={onRemoveFromWatchList}
                icon={<X size={25} className="text-gray-800" />}
              />
          </HoverCardTrigger>
          <HoverCardContent>
            Remove From WatchList
          </HoverCardContent>
        </HoverCard>
        )}
        <HoverCard>
            <HoverCardTrigger>
                <IconButton
                  onClick={onRemoveFromRecommended}
                  icon={<ThumbsDown size={25} className="text-gray-800" />}
                />
            </HoverCardTrigger>
            <HoverCardContent>
              Not Interested
            </HoverCardContent>
          </HoverCard>
      </div>
      {rank && (
        <div className="-top-1 absolute right-0 flex items-center justify-center space-x-1 z-10">
          <IoBookmarkSharp className="text-yellow-400 text-5xl" />
          <span className="absolute text-sm text-black font-bold pb-2">#{rank}</span>
        </div>
      )}
      <div className="relative w-full h-72 top-0">
        <Image
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.backgroundpath}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 text-center">
        <Link href={`/show/${showId}`} className="text-white text-lg font-semibold">
          {data.name}
        </Link>
        <p className="text-yellow-400 text-sm mt-1 font-bold text-center">
          WatchListed Rating: {data.watchlistedrating.toFixed(2)}/10
        </p>
      </div>
    </Link>
  );
  
};

export default RecommendedShowCard;