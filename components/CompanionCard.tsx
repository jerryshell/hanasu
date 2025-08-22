"use client";

import { SUBJECTS } from "@/constants";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}) => {
  const pathname = usePathname();

  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };

  return (
    <article
      className="flex w-full flex-col justify-between gap-5 rounded-4xl border-2 border-black px-4 py-4 min-lg:max-w-[410px]"
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-center">
        <div className="rounded-4xl bg-black px-2 py-1 text-sm text-white capitalize">
          {SUBJECTS.find((s) => s.value === subject)?.zh}
        </div>
        <button
          className="flex aspect-square h-full cursor-pointer items-center rounded-4xl bg-black px-2"
          onClick={handleBookmark}
        >
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} 分钟</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="bg-primary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white w-full justify-center">
          开始课程
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
