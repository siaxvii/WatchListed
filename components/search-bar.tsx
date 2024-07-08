"use client"; //should be treated as a client component

import {BiSearch} from 'react-icons/bi';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () =>{
    const router = useRouter();
    const [query, setQuery] = useState<string>("");

    const handleSearch = () => {
        if (query.trim() !== "") {
            router.push(`/search/${query}`);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <div className="flex items-center bg-black p-2 border border-white rounded-md max-md:hidden">
                <input
                    value={query}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setQuery(e.target.value)}
                    className="outline-white bg-transparent mr-2 text-white placeholder:text-white text-[13px] w-72"
                    placeholder="Search"
                    autoComplete="false"
                />
                <button
                    disabled={query === ""}
                    onClick={handleSearch}
                    className='flex-shrink-0'
                >
                    <BiSearch size={20} className='opacity-80 text-white'/>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;