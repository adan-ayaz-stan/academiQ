import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="min-h-screen grid bg-scampi-700 pt-24 text-white">
      {/*  */}

      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="max-w-xl">
          <h1>Explore Our Professors:</h1>
          <h2>
            An easy way to make your
            <br /> educational decisions
          </h2>

          <p className="my-8 text-scampi-200">
            Discover a wealth of professor profiles, reviews, and insights on
            our comprehensive application. Easily submit your own feedback and
            track professor likability over time
          </p>

          <Button variant={"secondary"} asChild>
            <Link href={"/sign-in"}>Submit Your Professor Review</Link>
          </Button>
        </div>

        <Image
          src={"/hero.png"}
          alt="leaf"
          width={500}
          height={500}
          className="w-96 h-96 object-contain rounded-3xl"
        />
      </div>
    </div>
  );
}
