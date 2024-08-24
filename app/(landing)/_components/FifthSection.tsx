import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function FifthSection() {
  return (
    <div className="md:min-h-screen relative py-20 grid bg-white">
      <div className="w-full relative max-w-5xl mx-auto flex items-center justify-between">
        <div className="h-full flex-1 bg-primary text-primary-foreground p-4 rounded-sm space-y-4 py-8">
          <h1 className="pb-6">Explore by departments</h1>
          <p className="bg-white p-4 font-semibold rounded-sm text-primary">
            Discover professors across a wide range of academics
          </p>
          <p className="bg-white p-4 font-semibold rounded-sm text-primary">
            Browse our extensive collection of professor profiles, each offering
            a unique perspective on their teaching methods, research interests,
            and impact on student success
          </p>
          <p className="bg-white p-4 font-semibold rounded-sm text-primary">
            Gain valuable insights into the qualities that make our professors
            stand out, from their dedication to fostering engaging classrooms to
            their commitment to student mentorship
          </p>
          <p className="bg-white p-4 font-semibold rounded-sm text-primary">
            Stay informed about the latest developments in professor likability,
            tracking trends that can help you make the most of your educational
            experience
          </p>
        </div>
        <div className="h-full flex-1 flex items-center justify-center">
          <Image
            src={"/leaf-night.jpg"}
            alt="cube"
            width={500}
            height={500}
            className="w-96 h-96 rounded-sm object-contain bg-gradient-to-b from-[#0B101C] from-20% to-[#19304A] via-70% via-[#111C27] to-100%"
          />
        </div>
      </div>
    </div>
  );
}
