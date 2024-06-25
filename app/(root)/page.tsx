// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-black-900 w-full border-4 border-white-500">
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-white">Discover</Button>
          <Button variant="ghost" className="text-white">Genres</Button>
          <Button variant="ghost" className="text-white">Top Rated</Button>
          <Button variant="ghost" className="text-white">Recommended</Button>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded text-black"
          />
          <UserButton />
        </div>
      </div>
      {/* Page Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-5xl font-bold mb-4 relative right-60 ">Watchlisted</h1>
        <h3 className="text-3xl font-bold mb-4 relative right-60">
          Your Personalized TV Recommendations
        </h3>
        <Link href="/more">
        <Button variant="default" className="mt-4 relative right-60">Read More</Button>
        </Link>
        <Image
          src="/next"
          width={348}
          height={278}
          alt="home page icon"
          className="mb-4 relative left-60" 
        />
      </div>
    </div>
  );
}
