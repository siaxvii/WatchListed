"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex items-center space-x-20 gap-28">
        <div className="hidden lg:block mr-8">
          <Image
            src="/images/file.png"
            width={300}
            height={200}
            alt="home page icon"
          />
          <div className="text-white text-center text-5xl font-bold mt-4 lg:mt-8">
            WatchListed
          </div>
        </div>
        <div className="flex-shrink-0">
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" fallbackRedirectUrl="/quiz" />
        </div>
      </div>
    </div>
  );
}