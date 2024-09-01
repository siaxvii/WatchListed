"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function More() {
  const router = useRouter();
  const { user } = useUser();
  
  const handleStartNowClick = () => {
    if (user) {
      //If user is signed in, redirects to homepage
      router.push('/');
    } else {
      // User is not signed in, redirect to sign-up page
      router.push('/sign-up');
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <div className="bg-black">
      </div>
        <div className="p-12 flex justify-around items-center">
          <div className="text-center">
            <h2 className="text-6xl font-bold">150K+</h2>
            <p className="text-md font-bold pt-2">Total Shows</p>
          </div>
          <div className="text-center">
            <h2 className="text-6xl font-bold">3K</h2>
            <p className="text-md font-bold pt-2">Total Users</p>
          </div>
          <div className="text-center">
            <h2 className="text-6xl font-bold">98%</h2>
            <p className="text-md font-bold pt-2">User Satisfaction</p>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-4xl font-bold mb-4">Why Choose Watchlisted?</h1>
          <ul className="list-disc list-inside text-3xl space-y-10 pt-12 mt-6">
            <li><strong>Personalized Recommendations:</strong> Tailored just for you.</li>
            <li><strong>Extensive Database:</strong> Thousands of shows to explore, updated daily.</li>
            <li><strong>Quick Access:</strong> Save your favorite TV shows to a WatchList.</li>
          </ul>
        </div>
        <div className="flex justify-center mt-16 p-4">
          <button onClick={handleStartNowClick} className="px-14 py-2 bg-zinc-900 hover:shadow-amber-400 transition-shadow duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border border-white text-white rounded-md">
            Sign Up!
          </button>
        </div>
      
    </div>
  );
}
