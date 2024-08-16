"use client";
import React, { useEffect, useState } from "react";
import TVShowCard from "@/components/TvShowCard";
import getShows from "@/actions/get-shows";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
// importing button to be consistent with the Genre page design 


const Genres: React.FC = () => {
  const [tvShowsByGenre, setTvShowsByGenre] = useState<Record<string, any[]>>({});
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  //const [genres, setGenres] = useState<string[]>([]);
  
  const genres = ["Action", "Comedy", "Drama", "Crime", "Horror", "Fantasy", "Sci-Fi", "Thriller"];
  
  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      try {
        //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
        //const genresData = await res.json();
        //const genresList = genresData.map((genreObj: { genres: string }) => genreObj.genres);

        //setGenres(genresList);

        //const showsByGenre: Record<string, any[]> = {};

        const newShows = await getShows({
          genre: selectedGenre === "all" ? undefined : selectedGenre,
          limit: 10,
          page,
        });


        setTvShowsByGenre((prevShowsByGenre) => ({
          ...prevShowsByGenre,
          [selectedGenre!]: [...(prevShowsByGenre[selectedGenre!] || []), ...newShows],
        })); 
      } catch (error) {
        console.error("Error fetching shows: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [page, selectedGenre]);


  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleGenreChange = (genre : string) => {
    setSelectedGenre(genre);
    setPage(1);
    setTvShowsByGenre((prevShowsByGenre) => ({
      ...prevShowsByGenre,
      [genre]: prevShowsByGenre[genre] || [],
    }));
  };

  const showsToDisplay = selectedGenre ? tvShowsByGenre[selectedGenre] || [] : [];

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <h1 className="text-4xl font-bold mb-8 text-center mt-8"> Explore By Genre</h1>
      { loading && page === 1 ? (
        <div className="flex justify-center mt-8">
          <Spinner size = "large"/>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mb-8 flex-wrap">
            {genres.map((genre) => (
              <Button
                key={genre}
                onClick={() => handleGenreChange(genre)}
                className={`mx-2 my-1 ${selectedGenre === genre ? "bg-gray-300" : "bg-gray-600"}`}
              >
                {genre}
              </Button>
            ))}
            <Button 
              onClick={() => handleGenreChange("all")}
              className={`mx-2 my-1 ${selectedGenre === "all" ? "bg-gray-300" : "bg-gray-600"}`}
            >
              Show All
            </Button>
          </div>

          {selectedGenre && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
              {showsToDisplay.length > 0 ? (
                showsToDisplay.map((show) => 
                  show && show.id ? (
                    <TVShowCard
                      key={show.id}
                      showId={show.id}
                    />
                  ) : null 
                )
              ) : (
                <p className="text-center col-span-full">No shows avaliable for this genre.</p>
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
}



      

/*
So basically, have buttons for each genre
*/
export default Genres;
