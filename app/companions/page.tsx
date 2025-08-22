import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const subject = params.subject || "";
  const topic = params.topic || "";

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main className="bg-background mx-auto mb-5 flex h-full max-w-[1400px] flex-col gap-8 px-14 pt-10 max-sm:px-2">
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1 className="text-3xl font-bold">伙伴列表</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="flex w-full flex-wrap justify-between gap-4 max-md:justify-center">
        {companions.map((item) => (
          <CompanionCard
            key={item.id}
            {...item}
            color={getSubjectColor(item.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default Page;
