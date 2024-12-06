"use client";
import { cn } from "@/lib/utils";
import { adminMenuItems } from "@/shared/data/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminMenu() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col h-full pt-20 items-center gap-4">
      {adminMenuItems.map(item => {
        const isActive = pathname === item.path || false;
        return (
          <div
            key={item.id}
            className={cn(
              "p-4 rounded-lg transition-colors duration-200 hover:bg-light-darker hover:dark:bg-dark-lighter",
              isActive && "bg-light-darker dark:bg-dark-lighter"
            )}
          >
            <Link href={item.path}>{<item.icon width={24} height={24} />}</Link>
          </div>
        );
      })}
    </nav>
  );
}
