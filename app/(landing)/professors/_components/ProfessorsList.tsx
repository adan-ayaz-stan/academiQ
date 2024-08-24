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
  Loader2,
  Search,
  Stars,
} from "lucide-react";
import { useRef, useState } from "react";
import ProfessorProfile from "./ProfessorProfile";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitAReview from "./SubmitAReview";
import { useMutation, useQuery } from "@tanstack/react-query";
import { seed } from "@/lib/seed";
import { toast } from "sonner";
import { getProfessors } from "@/server/actions/professors.actions";
import Fuse from "fuse.js";

export default function ProfessorsList() {
  const [rating, setRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"asc" | "desc" | null>(null);

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: professors,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["professor", "all", rating, sortBy],
    queryFn: () => getProfessors(rating, sortBy),
  });

  const results = new Fuse(professors ?? [], {
    shouldSort: true,
    keys: ["name", "college"],
  }).search(searchQuery);

  const { mutate: create, isPending } = useMutation({
    mutationKey: ["professor", "create"],
    mutationFn: seed,
    onMutate: () => {
      toast.loading("Creating Professors...", { id: "create" });
    },
    onSuccess: () => {
      toast.success("Professors Created", { id: "create" });
    },
    onError: () => {
      toast.error("Failed to Create Professors", { id: "create" });
    },
  });

  return (
    <div className="pl-96">
      <div className="pl-4">
        {!isPending && <Button onClick={() => create()}>Seed</Button>}
        <div className="w-full flex flex-row gap-4 items-center justify-end py-4 rounded-sm">
          {/* input box */}
          <div className="relative mr-auto">
            <Search className="absolute top-1/2 right-2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input
              placeholder="i.e. Professor Moriarty"
              className="rounded-sm pr-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort By */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={sortBy ? "default" : "outline"}>
                {sortBy ? (
                  <>
                    {sortBy == "asc" ? "Ascending" : "Descending"}
                    {sortBy == "asc" ? (
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
                onValueChange={(value) => setSortBy(value as "asc" | "desc")}
              >
                <DropdownMenuRadioItem value="asc">
                  Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="desc">
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
                    <DialogClose ref={dialogCloseRef} />
                    <div className="relative">
                      <SubmitAReview
                        onSubmitReview={() => {
                          dialogCloseRef.current?.click();
                        }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Professor's listed down here */}
        <div className="mt-4 flex flex-row flex-wrap gap-8">
          {isLoading && (
            <div className="w-full">
              <Loader2 className="mx-auto mt-12 h-12 w-12 animate-spin text-scampi-900" />
            </div>
          )}
          {isSuccess &&
            !searchQuery &&
            professors.map((item) => (
              <ProfessorProfile
                key={item.name + item.college + item.department}
                // @ts-ignore
                data={item}
              />
            ))}

          {isSuccess &&
            searchQuery &&
            results.map((item) => (
              <ProfessorProfile
                key={item.score + item.item.name + item.item.department}
                // @ts-ignore
                data={item.item}
              />
            ))}

          {isSuccess && !professors.length && (
            <div className="w-full">
              <p className="text-center">No professors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
