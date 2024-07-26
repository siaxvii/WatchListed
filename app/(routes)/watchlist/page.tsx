"use client";

import useWatchList from "@/actions/use-watchlist";
import TVShowCard from "@/components/TVShowCard";
import { useEffect, useState } from "react";

const Watchlist = () => {

    const watchlist = useWatchList();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) { return null; }

    return ( 
        <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909] pb-6">
            <h1 className="text-4xl font-bold mb-8 text-center mt-8">Your Watchlist ({watchlist.items.length})</h1>

            {watchlist.items.length === 0 && <p >No items added to wishlist.</p>}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 px-16">
                {watchlist.items.map((item) => (
                    <TVShowCard data={item} showId={item.id}/>
                ))} 
            </div>


        </div>
     );
}
 
export default Watchlist;