import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SixthSection() {
  return (
    <div className="md:min-h-screen relative py-20 grid bg-white">
      <div className="w-full relative max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="h-full flex-1 bg-[url('/prof-chair-moon.jpg')] text-primary-foreground p-4 rounded-sm space-y-4 flex flex-col justify-end">
          <div className="bg-black/10 backdrop-blur-sm p-4 rounded-sm">
            <p className="bg-white p-4 font-semibold rounded-sm text-primary">
              Our comprehensive professor database allows you to easily search,
              filter, and sort through a wide range of faculty members,
              empowering you to find the perfect fit for your educational needs
            </p>
          </div>
        </div>
        <div className="h-full flex-1 flex items-center justify-center">
          <div className="bg-scampi-50 rounded-xl p-4 max-w-sm py-8">
            <h1>Quick Links</h1>
            <p className="my-4">
              Navigate our professor hub with ease, accessing key information
              and resources to support your academic journey
            </p>

            <Button>Explore Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
