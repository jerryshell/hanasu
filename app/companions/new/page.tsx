import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="bg-background mx-auto mb-5 flex h-full max-w-[1400px] flex-col gap-8 px-14 pt-10 max-sm:px-2 min-lg:w-2/3 min-md:w-3/4 items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1 className="text-3xl font-bold">创建新伙伴</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="flex w-full flex-col items-center justify-center gap-4 pt-20 text-center min-2xl:w-1/2">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          <div className="bg-cta-gold rounded-4xl px-3 py-1.5 text-black">
            升级订阅
          </div>
          <h1 className="text-3xl font-bold">您已达到当前订阅等级的上限</h1>
          <p>升级可解锁更多同伴和高级功能</p>
          <Link
            href="/subscription"
            className="bg-primary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white w-full justify-center"
          >
            立刻升级
          </Link>
        </article>
      )}
    </main>
  );
};

export default Page;
