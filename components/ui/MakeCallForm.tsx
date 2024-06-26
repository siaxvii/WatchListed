'use client';

import React, { useState } from 'react';

const MakeCallForm = () => {
  const [movieName, setMovieName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/getRecommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ movieName })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Recommendations:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={movieName}
        onChange={handleInputChange}
        placeholder="Enter movie name"
        required
      />
      <button type="submit">Get Recommendations</button>
    </form>
  );
};

export default MakeCallForm;
