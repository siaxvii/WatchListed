import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <div className="bg-black">
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-5xl font-bold mb-4 relative right-60 ">Watchlisted</h1>
        <h3 className="text-3xl font-bold mb-4 relative right-60">
          Your Personalized TV Recommendations
        </h3>
        <Link href="/more">
          <Button variant="default" className="mt-4 relative right-60">Read More</Button>
        </Link>
        <Image
          src="/file.png"
          width={348}
          height={278}
          alt="home page icon"
          className="mb-4 relative left-60" 
        />
      </div>
    </div>
  );
}
