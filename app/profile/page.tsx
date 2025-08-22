import CompanionList from "@/components/CompanionList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getUserCompanions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import { getUserSessions } from "@/lib/actions/sessionHistory.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="bg-background mx-auto mb-5 flex h-full max-w-[1400px] flex-col gap-8 px-14 pt-10 max-sm:px-2 min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-xl"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border-2 border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>
            <div>完成的课程</div>
          </div>
          <div className="border-2 border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <div>创建的伙伴</div>
          </div>
        </div>
      </section>
      <Accordion
        type="multiple"
        defaultValue={["bookmarks", "recent", "companions"]}
      >
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            收藏的伙伴 {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList companions={bookmarkedCompanions} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            最近课程
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList companions={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions" aria-expanded>
          <AccordionTrigger className="text-2xl font-bold">
            我的伙伴 {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList companions={companions} showDelete={true} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Page;
