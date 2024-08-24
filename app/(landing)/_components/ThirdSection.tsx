import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ThirdSection() {
  return (
    <div className="md:min-h-screen relative py-20 grid bg-white">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        {" "}
        <div>
          <Image
            src={"/professor-hero.png"}
            alt="professor"
            width={500}
            height={500}
            className="rounded-t-xl object-cover"
          />
          <h4 className="text-center bg-scampi-700 text-white p-4 rounded-b-sm">
            Meet our featured faculty
          </h4>
        </div>
        <div className="max-w-lg">
          <h1>Professor Profiles</h1>
          <p className="text-scampi-900 my-4">
            Explore in-depth profiles of our esteemed professors, with detailed
            information about their backgrounds, teaching styles
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Uncover Honest Reviews</li>
            <li>Track Likability Trends</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
