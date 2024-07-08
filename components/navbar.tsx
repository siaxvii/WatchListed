import { UserButton } from "@clerk/nextjs";
import { CircleUserRound } from "lucide-react";
import MainNav from "./main-nav";
import SearchBar from "./search-bar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Logo from "./home-logo";
import NavbarActions from "./navbar-actions";

const Navbar = async () => {
  return (
    <div className="border-b border-white">
      <div className="sm:px-6 lg:px-8 flex h-20 items-center">
        <Logo />
        <MainNav />

        <div className="ml-auto flex items-center p-2">
          <div className="p-10">
            <SearchBar />
          </div>
          <NavbarActions />
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="rounded-full bg-black border border-white px-4 py-2 text-white font-medium text-medium cursor-pointer hover:opacity-75">
              <SignInButton>
                <button className="flex items-center">
                  <CircleUserRound className="h-5 w-5" />
                  <span className="ml-2 font-bold hidden sm:block whitespace-nowrap">Sign In</span>
                </button>
              </SignInButton>
            </div>
          </SignedOut>

        </div>
      </div>
    </div>
  );
};

export default Navbar;