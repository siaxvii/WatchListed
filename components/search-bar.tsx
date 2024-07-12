"use client";

import { BiSearch } from 'react-icons/bi';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const [allShows, setAllShows] = useState<any[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedShows, setSelectedShows] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/shows')
            .then(response => setAllShows(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (query.trim() !== '') {
            setSearchResults(
                allShows.filter(show =>
                    show.name.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 10)
            );
        } else {
            setSearchResults([]);
        }
    }, [query, allShows]);

    const handleSearch = () => {
        if (query.trim() !== '') {
            router.push(`/search?query=${query}`);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
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

    return (
        <div className="relative">
            <div className="flex items-center bg-black p-2 border border-white rounded-md">
                <input
                    value={query}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setQuery(e.target.value)}
                    className="outline-none bg-transparent mr-2 text-white placeholder:text-white text-[13px] w-72"
                    placeholder="Search"
                    autoComplete="off"
                />
                <button
                    disabled={query === ''}
                    onClick={handleSearch}
                >
                    <BiSearch size={20} className='opacity-80 text-white' />
                </button>
            </div>
            {searchResults.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-zinc-900 border border-white rounded-md z-10 max-h-60 overflow-y-auto mt-2">
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
    );
};

export default SearchBar;

