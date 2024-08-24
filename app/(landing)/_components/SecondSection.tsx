import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function SecondSection() {
  return (
    <div className="md:min-h-screen relative py-20 grid bg-white">
      <hr className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-scampi-900" />
      <hr className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%-5px)] w-full bg-scampi-900" />
      {/*  */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-black/20 z-10 p-4 flex flex-col items-center gap-8 justify-center rounded-xl text-center text-white">
          <h1 className="w-fit text-6xl">In a sky full of stars</h1>

          <h1>Which one is going to be yours?</h1>
        </div>
        <Image
          src={"/houses.jpg"}
          alt="House image"
          width={750}
          height={500}
          className="w-full flex-1 object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
