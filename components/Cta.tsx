import Image from "next/image";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="bg-cta flex w-1/3 flex-col items-center gap-5 rounded-4xl px-7 py-10 text-center text-white max-lg:w-1/2 max-md:w-full">
      <div className="bg-cta-gold rounded-4xl px-3 py-1.5 text-black">
        开始你的学习之旅
      </div>
      <h2 className="text-3xl font-bold">创建并个性化学习伙伴</h2>
      <p>
        选择名称、学科、声音和风格，然后开始通过自然有趣的语音对话进行学习。
      </p>
      <Image src="/images/cta.svg" alt="cta" width={362} height={232} />
      <button className="bg-primary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/companions/new">
          <p>创建一个新伙伴</p>
        </Link>
      </button>
    </section>
  );
};

export default Cta;
