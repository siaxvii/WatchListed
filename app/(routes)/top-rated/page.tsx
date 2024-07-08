import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import NavBar from "@/components/navbar";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NavBar/>
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4 relative">Top Rated</h1>
        <h3 className="text-3x1 font-bold mb-4 relative">Your Top Rated Page</h3>
      </div>
    </div>
  )
}