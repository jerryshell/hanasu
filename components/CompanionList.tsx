import CompanionDeleteBtn from "./CompanionDeleteBtn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SUBJECTS } from "@/constants";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const CompanionList = ({
  title,
  companions,
  classNames,
  showDelete = false,
}: {
  title?: string;
  companions?: any[];
  classNames?: string;
  showDelete?: boolean;
}) => {
  return (
    <article
      className={cn(
        "rounded-4xl border-2 border-black bg-white px-7 pt-7 pb-10 max-lg:w-full",
        classNames,
      )}
    >
      <h2 className="font-bold text-3xl">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">课程</TableHead>
            <TableHead className="text-lg">学科</TableHead>
            <TableHead className="text-lg text-right">时长</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link href={`/companions/${item.id}`}>
                  <div className="flex items-center gap-2">
                    <div
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(item.subject) }}
                    >
                      <Image
                        src={`/icons/${item.subject}.svg`}
                        alt={item.subject}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">{item.name}</p>
                      <p className="text-lg">{item.topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="rounded-4xl bg-black px-2 py-1 text-sm text-white capitalize w-fit max-md:hidden">
                  {SUBJECTS.find((s) => s.value === item.subject)?.zh}
                </div>
                <div
                  className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                  style={{ backgroundColor: getSubjectColor(item.subject) }}
                >
                  <Image
                    src={`/icons/${item.subject}.svg`}
                    alt={item.subject}
                    width={18}
                    height={18}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 w-full justify-end">
                  {item.duration} <span className="max-md:hidden">分钟</span>
                  <Image
                    src="/icons/clock.svg"
                    alt="minutes"
                    width={14}
                    height={14}
                    className="md:hidden"
                  />
                </div>
              </TableCell>
              {showDelete && (
                <TableCell>
                  <div className="flex items-center gap-1 w-full justify-end">
                    <CompanionDeleteBtn companion={item} />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionList;
