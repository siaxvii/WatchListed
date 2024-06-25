// app/more/page.tsx
// app/more/page.tsx
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
export default function More() {
  

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
        {/* Stats Section */}
        <div className="w-full bg-gray-800 p-4 flex justify-around items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">150K +</h2>
            <p className="text-sm">Total Shows</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">3K</h2>
            <p className="text-sm">Total Users</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">98%</h2>
            <p className="text-sm">User Satisfaction</p>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-5xl font-bold mb-4">Why Choose Watchlisted?</h1>
          <p className="text-xl mb-4">
            Here is some more information about Watchlisted.
          </p>
          {/* Add more content as needed */}
        </div>
      
    </div>
  );
}
