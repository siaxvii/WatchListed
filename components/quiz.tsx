"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Input from "@/components/ui/input";
import TVShowCard from "@/components/TVShowCard";

const Quiz: React.FC = () => {
  const router = useRouter();
  const [genres, setGenres] = useState<string[]>([]);
  const [length, setLength] = useState<string>('');
  const [selectedShows, setSelectedShows] = useState<any[]>([]);
  const [allShows, setAllShows] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    axios.get('/api/shows')
      .then(response => setAllShows(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (query.trim() !== "") {
      setSearchResults(
        allShows.filter(show => 
          show.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 10)
      );
    } else {
      setSearchResults([]);
    }
  }, [query, allShows]);

  const handleGenreChange = (genre: string) => {
    setGenres((prev) => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value);
  };

  const handleShowSelect = (show: any) => {
    setSelectedShows((prev) =>
      prev.includes(show)
        ? prev.filter((s) => s !== show)
        : prev.length < 20
        ? [...prev, show]
        : prev
    );
    setQuery('');
    setSearchResults([]);
  };

  const handleSubmit = async () => {
    console.log({ genres, length, selectedShows });

    router.push('/');
  };

  return (
    <div className="p-8 bg-zinc-950 border border-white rounded-md shadow-zinc-700 shadow-2xl">
      <div className="mb-4">
        <h3 className="text-xl font-semibold pb-4">1. What genres of TV shows do you enjoy?</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'].map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`px-4 py-2 border border-gray-400 hover:bg-zinc-800 rounded-md ${genres.includes(genre) ? 'bg-gray-600 text-white' : 'bg-zinc-900'}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold pb-4 pt-4">2. What is your preferred length for TV shows?</h3>
        <div className="flex flex-col gap-2 mt-2 ml-2">
          {['  Limited Series (no longer than one season)', '  1-3 Seasons', '  3+ Seasons', '  Doesn’t matter to me!'].map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name="length"
                value={option}
                onChange={handleLengthChange}
                checked={length === option}
                className="mr-4"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold pb-4 pt-4">3. Select your top three TV shows:</h3>
        <div className="relative mb-4 mt-4">
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border border-zinc-400 rounded-md"
            placeholder="Search for TV shows"
          />
          {searchResults.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-zinc-900 border border-white rounded-md z-10 max-h-60 overflow-y-auto">
              {searchResults.map((show) => (
                <li 
                  key={show.id}
                  onClick={() => handleShowSelect(show)}
                  className="p-2 cursor-pointer hover:bg-zinc-800"
                >
                  {show.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-wrap gap-8 mt-2">
          {selectedShows.map((show) => (
            <div
              key={show.id}
              className="w-60 cursor-pointer"
              onClick={() => handleShowSelect(show)} //Removes card if you click on it
            >
              <TVShowCard showId={show.id} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={handleSubmit} className="px-14 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white text-white rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Quiz;