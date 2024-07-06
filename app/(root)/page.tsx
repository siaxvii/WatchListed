// src/app/page.tsx
import { Button } from "@/components/ui/button";
//import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-black">
      <NavBar />
      <UserButton />
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
