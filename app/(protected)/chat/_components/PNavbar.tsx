"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SVGProps, useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const firstWord = pathname?.split("/")[1];

  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const scrollDiff = currentScrollPosition - prevScrollPosition;
      if (scrollDiff < -10) {
        // scrolled up by 50px
        setScrollingUp(true);
      } else if (scrollDiff > 10) {
        // scrolled down by 50px
        setScrollingUp(false);
      }
      setPrevScrollPosition(currentScrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPosition]);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full py-2 px-4 bg-transparent z-50 transition-all duration-700",
        scrollingUp ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center gap-12">
          {/* Logo */}
          <Button variant={"ghost"} className="py-2 h-fit">
            <MaterialSymbolsLogoDev className="w-12 h-12" />
            Logo
          </Button>

          {/*  */}
          <Link href={"/chat"}>
            <Button className="font-semibold hidden md:block h-fit">
              Chat
            </Button>
          </Link>
        </div>

        <Button asChild>
          <SignOutButton>Log Out</SignOutButton>
        </Button>
      </div>
    </div>
  );
}

export function MaterialSymbolsLogoDev(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6 15h2.4q.475 0 .813-.337t.337-.813v-3.7q0-.475-.337-.812T8.4 9H6zm1.15-1.15v-3.7H8.4v3.7zM10.875 15h2.45v-1.15h-2.05v-1.3h1.3V11.4h-1.3v-1.25h2.05V9h-2.45q-.325 0-.537.212t-.213.538v4.5q0 .325.213.538t.537.212m5.15-.025q.325 0 .563-.213t.312-.537L18.3 9h-1.2l-1.075 4.1L14.95 9h-1.2l1.4 5.225q.075.325.313.538t.562.212M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
      ></path>
    </svg>
  );
}
export function MdiGithubFace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M20.38 8.53c.16-.4.68-1.99-.17-4.14c0 0-1.31-.39-4.3 1.61c-1.25-.33-2.58-.38-3.91-.38c-1.32 0-2.66.05-3.91.38c-2.99-2.03-4.3-1.61-4.3-1.61c-.85 2.15-.33 3.74-.16 4.14C2.61 9.62 2 11 2 12.72c0 6.44 4.16 7.89 10 7.89c5.79 0 10-1.45 10-7.89c0-1.72-.61-3.1-1.62-4.19M12 19.38c-4.12 0-7.47-.19-7.47-4.19c0-.95.47-1.85 1.27-2.58c1.34-1.23 3.63-.58 6.2-.58c2.59 0 4.85-.65 6.2.58c.8.73 1.3 1.62 1.3 2.58c0 3.99-3.37 4.19-7.5 4.19m-3.14-6.26c-.82 0-1.5 1-1.5 2.22c0 1.23.68 2.24 1.5 2.24c.83 0 1.5-1 1.5-2.24c0-1.23-.67-2.22-1.5-2.22m6.28 0c-.83 0-1.5.99-1.5 2.22c0 1.24.67 2.24 1.5 2.24c.82 0 1.5-1 1.5-2.24c0-1.23-.64-2.22-1.5-2.22z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
