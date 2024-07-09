// components/Quiz.tsx

"use client"; // Should be treated as a client component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const Quiz: React.FC = () => {
  const router = useRouter();
  const [genres, setGenres] = useState<string[]>([]);
  const [length, setLength] = useState<string>('');
  const [selectedShows, setSelectedShows] = useState<string[]>([]);
  const [allShows, setAllShows] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all TV shows
    axios.get('/api/shows')
      .then(response => setAllShows(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleGenreChange = (genre: string) => {
    setGenres((prev) => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value);
  };

  const handleShowChange = (showId: string) => {
    setSelectedShows((prev) => prev.includes(showId) ? prev.filter(id => id !== showId) : [...prev, showId]);
  };

  const handleSubmit = async () => {
    // Store user preferences here (e.g., save to the database)
    console.log({ genres, length, selectedShows });

    // Redirect to the homepage or another page
    router.push('/');
  };

  return (
    <div className="p-8 bg-white text-black rounded-md">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">What genres of TV shows do you enjoy?</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'].map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`px-4 py-2 border rounded-md ${genres.includes(genre) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">What is your preferred length for TV shows?</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {['Limited Series (no longer than one season)', '1-3 Seasons', '3+ Seasons', 'Doesn’t matter to me!'].map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name="length"
                value={option}
                onChange={handleLengthChange}
                checked={length === option}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Select your top three TV shows:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {allShows.map((show) => (
            <button
              key={show.id}
              onClick={() => handleShowChange(show.id)}
              className={`px-4 py-2 border rounded-md ${selectedShows.includes(show.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {show.name}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </div>
  );
};

export default Quiz;

