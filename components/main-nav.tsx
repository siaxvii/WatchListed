"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const MainNav = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const routes = [
    { href: "/discover", label: "Discover" },
    { href: "/genres", label: "Genres" },
    { href: "/top-rated", label: "Top Rated" },
    { href: "/recommended", label: "Recommended" }
  ];

  return (
    <nav className="mx-12 flex lg:space-x-14 font-bold whitespace-nowrap">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn('text-lg transition-colors hover:text-gray-400')}
        >
          <div className="relative">
            {route.label}
            {pathname === route.href && (
              <div
                className={cn(
                  'absolute mt-1 w-full h-0.5',
                  theme === 'dark' ? 'bg-neutral-300' : 'bg-neutral-300'
                )}
              />
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;