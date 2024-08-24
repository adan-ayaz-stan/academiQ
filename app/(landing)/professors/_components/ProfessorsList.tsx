"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TProfessor } from "@/lib/db/schema/professors";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {
  ArrowDown,
  DotSquare,
  EllipsisVertical,
  Grid,
  Search,
  Stars,
} from "lucide-react";
import { useState } from "react";
import ProfessorProfile from "./ProfessorProfile";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SubmitAReview from "./SubmitAReview";

const list: {
  name: string;
  college: string;
  collegeIcon?: string;
  department: string;
  subjects: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
}[] = [
  {
    name: "Professor Moriarty",
    college: "University of Pennsylvania",
    collegeIcon: "/au-logo.png",
    department: "Computer Science",
    subjects: ["Computer Science"],
    tags: ["AI", "Machine Learning"],
    rating: 4.5,
    reviewCount: 10,
  },
];

export default function ProfessorsList() {
  const [rating, setRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"ttb" | "btt" | null>(null);

  return (
    <div className="pl-96">
      <div className="pl-4">
        <div className="w-full flex flex-row gap-4 items-center justify-end py-4 rounded-sm">
          {/* input box */}
          <div className="relative mr-auto">
            <Search className="absolute top-1/2 right-2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              placeholder="i.e. Professor Moriarty"
              className="rounded-sm pr-12"
            />
          </div>

          {/* Sort By */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={sortBy ? "default" : "outline"}>
                {sortBy ? (
                  <>
                    {sortBy == "ttb" ? "Ascending" : "Descending"}
                    {sortBy == "ttb" ? (
                      <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowDown className="ml-2 h-4 w-4 rotate-180" />
                    )}
                  </>
                ) : (
                  "Sort By"
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-4">
              <DropdownMenuLabel>Rating Sorting Order</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy ?? undefined}
                onValueChange={(value) => setSortBy(value as "ttb" | "btt")}
              >
                <DropdownMenuRadioItem value="ttb">
                  Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="btt">
                  Descending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              {sortBy && (
                <>
                  <DropdownMenuSeparator className="h-0.5 my-2 bg-muted-foreground" />
                  <DropdownMenuItem asChild>
                    <Button
                      className="w-full"
                      onClick={() => setSortBy(null)}
                      variant="secondary"
                    >
                      Clear
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rating */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={rating ? "default" : "outline"}>
                {rating ? (
                  <>
                    Above {rating} <Stars className="ml-2" />
                  </>
                ) : (
                  "Rating"
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
              <DropdownMenuLabel>Rating</DropdownMenuLabel>
              {[1, 2, 3, 4].map((item) => (
                <DropdownMenuCheckboxItem
                  key={item}
                  checked={rating === item}
                  onCheckedChange={() => setRating(item)}
                >
                  Above {item}
                </DropdownMenuCheckboxItem>
              ))}
              {rating && (
                <>
                  <DropdownMenuSeparator className="h-0.5 my-2 bg-muted-foreground" />
                  <DropdownMenuItem asChild>
                    <Button
                      className="w-full"
                      onClick={() => setRating(null)}
                      variant="secondary"
                    >
                      Clear
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="w-56 p-4">
              <DropdownMenuItem asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Submit a Review</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="relative">
                      <SubmitAReview />
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Professor's listed down here */}
        <div className="mt-4 flex flex-row flex-wrap gap-8">
          {list.map((item) => (
            <ProfessorProfile
              key={item.name + item.college + item.department}
              data={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
