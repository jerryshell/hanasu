"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "主页", href: "/" },
  { label: "订阅", href: "/subscription" },
  { label: "伙伴", href: "/companions" },
  { label: "个人", href: "/profile" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={cn(pathname === item.href && "text-primary font-semibold")}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
