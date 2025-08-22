"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SUBJECTS } from "@/constants";
import { mergeSearchParams } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsSubject = searchParams.get("subject") || "";

  const [searchSubject, setSearchSubject] = useState(paramsSubject);

  useEffect(() => {
    const subject = searchSubject === "all" ? "" : searchSubject;
    router.push(
      pathname + "?" + mergeSearchParams(searchParams, "subject", subject),
      { scroll: false },
    );
  }, [searchSubject]);

  return (
    <Select onValueChange={setSearchSubject} value={searchSubject}>
      <SelectTrigger className="w-full border-black bg-white focus-visible:border-black focus-visible:ring-0 capitalize border-2">
        <SelectValue placeholder="学科" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">全部</SelectItem>
        {SUBJECTS.map((subject) => (
          <SelectItem
            key={subject.value}
            value={subject.value}
            className="capitalize"
          >
            {subject.zh}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
