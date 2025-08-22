import CompanionComponent from "@/components/CompanionComponent";
import { SUBJECTS } from "@/constants";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const companion = await getCompanion(id);
  if (!companion) {
    redirect("/companions");
  }

  return (
    <main className="bg-background mx-auto mb-5 flex h-full max-w-[1400px] flex-col gap-8 px-14 pt-10 max-sm:px-2">
      <article className="flex border-2 rounded-4xl border-black justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(companion.subject) }}
          >
            <Image
              src={`/icons/${companion.subject}.svg`}
              alt={companion.subject}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{companion.name}</p>
              <div className="rounded-4xl bg-black px-2 py-1 text-sm text-white capitalize max-sm:hidden">
                {SUBJECTS.find((s) => s.value == companion.subject)?.zh}
              </div>
            </div>
            <p className="text-lg">{companion.topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {companion.duration} 分钟
        </div>
      </article>
      <CompanionComponent
        companion={companion}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      />
    </main>
  );
};

export default Page;
