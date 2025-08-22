"use client";

import { mergeSearchParams } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsTopic = searchParams.get("topic") || "";

  const [searchTopic, setSearchTopic] = useState(paramsTopic);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(
        pathname + "?" + mergeSearchParams(searchParams, "topic", searchTopic),
        { scroll: false },
      );
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTopic]);

  return (
    <div className="relative border-2 border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        placeholder="搜索"
        className="outline-none"
        value={searchTopic}
        onChange={(e) => setSearchTopic(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
