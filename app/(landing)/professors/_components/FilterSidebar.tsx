"use client";

import { Input } from "@/components/ui/input";
import { SVGProps, useCallback, useState } from "react";
import Fuse from "fuse.js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const list = [
  "National University of Sciences and Technology (NUST)",
  "Quaid-i-Azam University (QAU)",
  "Lahore University of Management Sciences (LUMS)",
  "University of Engineering and Technology (UET)",
  "University of the Punjab (PU)",
  "COMSATS University Islamabad (CUI)",
  "University of Karachi (KU)",
  "Aga Khan University (AKU)",
  "Bahria University (BU)",
  "Air University (AU)",
];

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const college = searchParams?.get("college") ?? null;

  const [searchQuery, setSearchQuery] = useState(
    decodeURIComponent(college ?? "")
  );
  const results = new Fuse(list, {
    shouldSort: true,
  }).search(searchQuery);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="w-full space-y-3 h-[80vh] fixed max-w-sm p-4 rounded-sm overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-scampi-800 scrollbar-corner-scampi-500">
      <h4 className="p-4 rounded-xl bg-primary text-white font-semibold text-center">
        By Colleges
      </h4>

      <div className="relative">
        <Search className="absolute top-1/2 right-2 -translate-y-1/2 h-5 w-5 text-primary" />
        <Input
          className="rounded-sm pr-12"
          defaultValue={decodeURIComponent(college ?? "")}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Colleges listed here as a clickable that sets the query param `college` to the selected college */}
      <div className="flex flex-col gap-3">
        {results.length === 0 &&
          searchQuery.length == 0 &&
          list.map((item) => {
            const str = encodeURIComponent(item);
            return (
              <Button
                variant={"ghost"}
                key={str}
                className="relative group bg-white p-4 h-fit"
                asChild
              >
                <Link
                  className={cn("text-wrap", college === str && "border-2")}
                  href={"/professors" + "?" + createQueryString("college", str)}
                >
                  {item}
                </Link>
              </Button>
            );
          })}
        {results.length === 0 && searchQuery.length > 0 && (
          <p className="text-center">No results found.</p>
        )}
        {results.length > 0 &&
          results.map((item) => {
            const str = encodeURIComponent(item.item);

            return (
              <Button
                variant={"ghost"}
                key={str}
                className="relative group bg-white p-4 h-fit"
                asChild
              >
                <Link
                  href={"/professors" + "?" + createQueryString("college", str)}
                  className={cn("text-wrap", college === str && "border-2")}
                >
                  {item.item}
                </Link>
              </Button>
            );
          })}
      </div>
    </div>
  );
}
