"use client";

import { deleteCompanion } from "@/lib/actions/companion.actions";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CompanionDeleteBtn = ({ companion }: { companion: any }) => {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);

  return (
    <button
      className="bg-primary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white disabled:animate-pulse disabled:cursor-not-allowed"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        await deleteCompanion(companion.id, pathname);
      }}
    >
      删除
    </button>
  );
};

export default CompanionDeleteBtn;
