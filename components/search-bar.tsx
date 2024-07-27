"use client";

import { BiSearch } from 'react-icons/bi';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getShows from '@/actions/get-shows';

const SearchBar: React.FC = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    useEffect(() => {
        const fetchFilteredShows = async () => {
          if (query.trim() !== "") {
            try {
              const filteredShows = await getShows({ search: query, limit: 10 });
              setSearchResults(filteredShows);
            } catch (error) {
              console.error('Error fetching filtered shows:', error);
            }
          } else {
            setSearchResults([]);
          }
        };
    
        fetchFilteredShows();
      }, [query]);

    const handleSearch = () => {
        if (query.trim() !== '') {
            router.push(`/search?query=${query}`);
            setQuery('');
            setSearchResults([]);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
            setQuery('');
            setSearchResults([]);
        }
    };

    const handleShowSelect = (show: any) => {
        setQuery('');
        setSearchResults([])
        router.push(`/show/${show.id}`);
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
                <button disabled={query === ''} onClick={handleSearch}>
                    <BiSearch size={20} className='opacity-80 text-white' />
                </button>
            </div>
            {searchResults.length > 0 && (
                <ul className="absolute top-full z-20 left-0 w-full bg-zinc-900 border border-white rounded-md z-10 max-h-60 overflow-y-auto mt-2">
                    {searchResults.map((show) => (
                        <li
                            key={show.id}
                            onClick={() => handleShowSelect(show)}
                            className="p-2 cursor-pointer gap-4 hover:bg-zinc-800"
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
