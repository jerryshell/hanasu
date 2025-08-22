import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import Cta from "@/components/Cta";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getRecentSessions } from "@/lib/actions/sessionHistory.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main className="bg-background mx-auto mb-5 flex h-full max-w-[1400px] flex-col gap-8 px-14 pt-10 max-sm:px-2">
      <h1 className="text-3xl font-bold underline">热门伙伴</h1>
      <section className="flex w-full items-start justify-between gap-4 max-lg:flex-col-reverse max-lg:items-center">
        {companions.map((companion, index) => (
          <CompanionCard
            key={index}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className="flex w-full items-start justify-between gap-4 max-lg:flex-col-reverse max-lg:items-center">
        <CompanionList
          title="最近完成的课程"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
