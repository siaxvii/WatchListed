import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white">
      
      <h1 className="text-5xl font-bold mb-4 relative">Watchlisted</h1>
      <h3 className="text-3x1 font-bold mb-4 relative">Your Personalized TV Recommendations</h3>
      <Button variant="default" className="mt-4 relative">Read More</Button>
    </div>
  )
}
