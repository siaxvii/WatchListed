"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import TVShowCard from "@/components/TVShowCard";
import { Spinner } from '@/components/ui/spinner';
import getShows from "@/actions/get-shows";

const SearchResults: React.FC = () => {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState<string>('');
    const [allShows, setAllShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (searchParams) {
            const queryParam = searchParams.get('query');
            setQuery(queryParam || '');
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchShows = async () => {
            setLoading(true);
            try {
                const shows = await getShows({ search: query });
                setAllShows(shows);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (query.trim() !== '') {
            fetchShows();
        } else {
            setLoading(false);
            setAllShows([]);
        }
    }, [query]);

    const searchResults = useMemo(() => {
        if (loading || query.trim() === '') return [];
        return allShows.filter(show =>
            show.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, allShows, loading]);

    return (
        <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909] p-10">
            <h1 className="text-2xl font-semibold mb-4 ml-4">
                {loading ? <Spinner size="large" /> : `${searchResults.length} search results for "${query}"`}
            </h1>

            {searchResults.length === 0 && !loading ? (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-center text-xl">
                        No results found for "{query}".
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-10">
                    {searchResults.map((show) => (
                        <div key={show.id} className="w-60 cursor-pointer">
                            <TVShowCard data={show} showId={show.id} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;