import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="bg-background mx-auto mb-5 flex h-full max-w-[1400px] flex-col gap-8 px-14 pt-10 max-sm:px-2 items-center justify-center">
      <SignIn />
    </main>
  );
}
