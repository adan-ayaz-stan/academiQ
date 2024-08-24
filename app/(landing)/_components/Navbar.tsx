"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { userId } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full p-4 py-2 bg-white h-fit z-50">
      <div className="flex flex-row items-center w-full max-w-5xl gap-2 mx-auto">
        <Image
          src={"/logo.png"}
          width={175}
          height={175}
          alt="logo"
          className="object-contain mr-auto"
        />

        <Button variant={"link"} asChild>
          <Link href={"/"}>Home</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href={"/professors"}>Professors</Link>
        </Button>

        {/* Sign In */}
        <Button asChild>
          <Link href={userId ? "/chat" : "/sign-in"}>
            {userId ? "Chat" : "Sign In"}
          </Link>
        </Button>
      </div>
    </nav>
  );
}
