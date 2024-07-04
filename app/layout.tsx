import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WatchListed",
  description: "Your Personalized TV Show Recommendation App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <SignedOut>
                <SignInButton>
                  <Button className="ml-4">Sign In</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>      
              </SignedIn>
            </header>
            <main>
              {children}
            </main>
            <footer>© 2024 WatchListed, Inc. All rights reserved.</footer>
          </ThemeProvider>
        </body>
        
      </html>
    </ClerkProvider>
  );
}