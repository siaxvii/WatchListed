import React from 'react';
/*React used to manage state in functional components.
Also allows you create & update state variables within a components */
import Link from 'next/link'; //used for client side navigation between pages in a Next.js app. Quick easy access without loading another page.
import Logo from "./home-logo"
import SearchBar from "./search-bar"
import { CircleUserRound } from 'lucide-react';
//we DONT want a tags so I removed those

const NavBar: React.FC = () => {
    return(
        <nav className='bg-black text-white p-4 flex items-center justify-between border border-white'>
            <div className='flex -1'>
                <Logo />
            </div>
            
            <div className='flex flex-1 justify-evenly items-center gap-x-4'>
                <Link href = "/discover" className='hover:text-gray-400 font-bold text-xl'>
                    Discover
                </Link>
                <Link href = "/genres" className='hover:text-gray-400 font-bold text-xl'>
                    Genres
                </Link>
                <Link href = "/top-rated" className='hover:text-gray-400 font-bold text-xl'>
                    Top Rated
                </Link>
                <Link href = "/recommended" className='hover:text-gray-400 font-bold text-xl'>
                    Recommended
                </Link>
                <SearchBar />
                <div className='flex items-center'>
                    <CircleUserRound className='text-white h-9 w-9 size={24}'/>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;