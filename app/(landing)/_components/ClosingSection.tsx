import { Button } from "@/components/ui/button";

export default function ClosingSection() {
  return (
    <div className="md:min-h-screen relative py-20 grid bg-white">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 items-center justify-center">
        <h1 className="text-center max-w-md">
          Elevate Your Learning Experience
        </h1>

        <p className="text-center max-w-3xl font-normal">
          Discover the unique insights and perspectives of our esteemed faculty
          members, enabling you to make informed decisions about your education
          and find the professors who align with your academic and personal
          goals
        </p>

        <div className="space-x-4">
          <Button variant={"outline"}>Explore Departments</Button>
          <Button>View Professors</Button>
        </div>
      </div>
    </div>
  );
}
