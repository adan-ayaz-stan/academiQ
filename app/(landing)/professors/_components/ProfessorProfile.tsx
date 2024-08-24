import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  BookIcon,
  BoxIcon,
  ImageIcon,
  LocateIcon,
  Star,
  TagIcon,
} from "lucide-react";
import Image from "next/image";

type TProfessor = {
  name: string;
  image?: string;
  college: string;
  collegeIcon?: string;
  department: string;
  subjects: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
};

export default function ProfessorProfile({ data }: { data: TProfessor }) {
  return (
    <div className="relative w-full max-w-xl p-4 flex flex-row gap-8 rounded-md bg-white shadow-primary">
      {/* College Logo */}
      {data.collegeIcon && (
        <Image
          src={data.collegeIcon}
          alt="college"
          height={100}
          width={100}
          className="h-16 w-16 absolute top-4 right-8"
        />
      )}

      {/*  */}
      {data.image ? (
        <Image
          src={data.image}
          alt="hero"
          height={500}
          width={500}
          className="w-56 h-72 border rounded-sm object-contain"
        />
      ) : (
        <div className="w-56 h-72 border rounded-sm bg-scampi-100 flex">
          <ImageIcon className="m-auto h-12 w-12 text-muted-foreground" />
        </div>
      )}
      <div className="w-full flex-1 flex flex-col justify-end">
        <p className="px-2 bg-yellow-400 w-fit rounded font-bold text-white flex items-center gap-1">
          <Star />
          {data.rating}
        </p>
        <p className="text-sm text-scampi-500 font-semibold mb-auto">
          {data.reviewCount} Reviews
        </p>

        <h3>{data.name}</h3>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <LocateIcon /> {data.college}
        </p>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <BoxIcon /> {data.department}
        </p>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <TagIcon /> {data.tags.join(", ")}
        </p>
        <p className="flex gap-2 items-center hover:text-xl transition-all duration-300">
          <BookIcon />
          {data.subjects.join(", ")}
        </p>

        <Drawer>
          <DrawerTrigger asChild>
            <Button className="mt-4">See Reviews</Button>
          </DrawerTrigger>
          <DrawerContent className="h-[calc(100vh-4rem)] p-4">
            <h1>test</h1>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
