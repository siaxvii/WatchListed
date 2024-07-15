"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TVShowCard from "@/components/TvShowCard";

const SearchResults: React.FC = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const [allShows, setAllShows] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryParam = searchParams.get('query');
        setQuery(queryParam || '');

        axios.get('/api/shows')
            .then(response => setAllShows(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (query.trim() !== '') {
            setSearchResults(
                allShows.filter(show =>
                    show.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        } else {
            setSearchResults([]);
        }
    }, [query, allShows]);

    return (
        <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
            <h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>
            <div className="flex flex-wrap gap-4">
                {searchResults.map((show) => (
                    <div key={show.id} className="w-60 cursor-pointer">
                        <TVShowCard showId={show.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;



