"use client";

import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  if (!isMounted) { return null; }

  return ( 
    <div className="ml-auto flex items-center mr-6">
        <Button onClick={() => router.push('/watchlist')} className="rounded-full bg-black border border-white hover:opacity-60">
            <Bookmark size={22} color="white" />
        </Button>
    </div>
  );
}
 
export default NavbarActions;