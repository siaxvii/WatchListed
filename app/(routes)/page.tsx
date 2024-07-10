"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import More from "./more/page";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const moreRef = useRef<HTMLDivElement>(null); // Create a ref for More component

  const handleReadMoreClick = () => {
    if (moreRef.current) {
      moreRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to More component smoothly
    }
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <div className="flex flex-grow items-center justify-center pb-16">
        <div className="flex flex-col items-start space-y-4 p-20 mb-20">
          <h1 className="text-5xl font-bold">Watchlisted</h1>
          <h3 className="text-2xl italic">
            TV Show recommendations, <br/> tailored for you. 
          </h3>
          <div className="h-1"></div>
          <h4 className="text-md mt-6">
            Discover your next favorite TV show <br /> with WatchListed. Whether you're a <br /> binge-watcher or a casual viewer, <br /> WatchListed curates a tailored list of <br /> must-watch content based on your <br /> unique tastes. Simply input your <br /> top three favorite shows, and let our <br /> advanced algorithms do the rest. <br />
          </h4>
          <div className="h-1"></div>
          <div className="flex-col space-x-8"> 
            <Button variant="default" className="hover:shadow-zinc-800 shadow-lg" onClick={handleReadMoreClick}>Read More</Button>
            <Button variant="default" className="hover:shadow-cyan-800 shadow-lg" onClick={() => router.push('/sign-up')}> Start now! </Button>
          </div>
        </div>
        <div className="p-20 ml-12 mb-4">
          <Image
            src="/images/phones.png"
            width={400}
            height={300}
            alt="home page icon"
          />
        </div>
      </div>
      <div ref={moreRef}>
        <More />
      </div>
    </div>
  );
}
