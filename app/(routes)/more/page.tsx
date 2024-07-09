export default function More() {
  return (
    <div className="min-h-screen text-white flex flex-col bg-gradient-to-r from-[#1B1919] to-[#090909]">
      <div className="bg-black">
      </div>
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
        </div>
      
    </div>
  );
}
