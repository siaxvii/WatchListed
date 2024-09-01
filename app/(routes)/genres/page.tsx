"use client";

import React, { useEffect, useState } from "react";
import TVShowCard from "@/components/TVShowCard";
import getShows from "@/actions/get-shows";
import { Spinner } from "@/components/ui/spinner";

const GenresPage: React.FC = () => {
  //1) stores tv shows by genres in an object, and each genre is gonna map to an array of shows.
  const [tvShowsByGenre, setTvShowsByGenre] = useState<Record<string, any[]>>({});
  //2) selectedGenre represents the current genres users selected. It'll first be set to all shows
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>("all");
  //3) page is for the pg number for fetching results
  const [page, setPage] = useState(1);
  //4) the loading boolean is to see whether or not data is being fetched from API
  const [loading, setLoading] = useState(false);
  // Here we have the genres that are most prominent in the database so I defined them here and users can select from these.
  const genres = ["Animation", "Action", "Comedy", "Crime", "Drama", "Family", "Kids", "Sci-Fi", "War & Politics"];
  
  //useEffect is the hook that runs fetchShows() when we change the genre
  //  as well as when the page changes (aka we load more shows)
  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        // here is where we call getShows and if the genre "all" is selected, we'll just show all the shows/movies
        const newShows = await getShows({
          genre: selectedGenre === "all" ? undefined : selectedGenre,
          limit: 10,
          page,
        });

        //here we append the new shows to the ones we've already fetched from a genre
        setTvShowsByGenre((prevShowsByGenre) => ({
          ...prevShowsByGenre,
          [selectedGenre!]: page === 1 ? newShows : [...(prevShowsByGenre[selectedGenre!] || []), ...newShows],
        })); 
      } catch (error) {
        console.error("Error fetching shows: ", error);
      } finally {
        //We set loading to false when we're done fetching
        setLoading(false);
      }
    };
    fetchShows();
  }, [page, selectedGenre]);

  //This function increments page state by 1, for when we have to load more shows
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  //This function handles changing genres
  const handleGenreChange = (genre: string) => {
    //here we update the selected genre
    setSelectedGenre(genre);
    //reset the page to 1
    setPage(1);
    
    //Here we make sure that tvShowsByGenre state is updated by a. using existing shows for the selected genre or 
    //  b. initializing an empty array if no shows were able to be fetched for the specific genre selected.
    setTvShowsByGenre((prevShowsByGenre) => ({
      ...prevShowsByGenre,
      [genre]: prevShowsByGenre[genre] || [],
    }));
  };

  //showsToDisplay defines the list of shows to display on the screen based on the selectedGenre
  const showsToDisplay = selectedGenre ? tvShowsByGenre[selectedGenre] || [] : [];

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      {/* Static genre selection should not re-render */}
      <h1 className="text-4xl font-bold mb-12 text-center mt-8"> Explore By Genre</h1>
      
      <div className="flex justify-center mb-8 flex-wrap">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreChange(genre)}
            className={`mx-2 my-1 px-4 py-2 border border-gray-400 rounded-md ${
              selectedGenre === genre ? "bg-gray-600 text-white" : "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => handleGenreChange("all")}
          className={`mx-2 my-1 px-4 py-2 border border-gray-400 rounded-md ${
            selectedGenre === "all" ? "bg-gray-600 text-white" : "bg-zinc-900 hover:bg-zinc-800"
          }`}
        >
          Show All
        </button>
      </div>
      
      {/* This section will re-render when genre or page changes */}
      {loading && page === 1 ? (
        <div className="flex justify-center mt-8">
          <Spinner size="large"/>
        </div>
      ) : (
        <div>
          {selectedGenre && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-16 mr-10">
              {showsToDisplay.length > 0 ? (
                showsToDisplay.map((show) =>
                  show && show.id ? (
                    <TVShowCard data={show} key={show.id} showId={show.id} />
                  ) : null
                )
              ) : (
                <p className="text-center col-span-full">No shows available for this genre.</p>
              )}
            </div>
          )}

          {showsToDisplay.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-4 py-2 bg-zinc-900 text-white border border-white rounded-md"
                disabled={loading}
              >
                {loading ? <Spinner size="medium" /> : "Load More"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenresPage;