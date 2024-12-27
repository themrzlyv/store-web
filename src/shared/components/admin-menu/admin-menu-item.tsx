import { cn } from "@/lib/utils";
import { Typography } from "../typography/typography";
import { adminMenuItems } from "@/shared/data/routes";
import { Dispatch, SetStateAction, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  item: (typeof adminMenuItems)[0];
  isOpenMenu: boolean;
};

export function AdminMenuItem({ item, isOpenMenu }: Props) {
  const pathname = usePathname();

  const Icon = item.icon;

  const isActive = useMemo(() => {
    if (item.path) {
      return pathname === item.path;
    }
    return false;
  }, [item, pathname]);

  return (
    <li className={cn("flex flex-col px-3 overflow-hidden")}>
      <div
        className={cn(
          "py-2.5 px-3 rounded-md transition-colors hover:dark:bg-dark-lighter hover:bg-light-darker flex items-center justify-between duration-200 cursor-pointer",
          isActive && "dark:bg-dark-lighter bg-light-darker",
          isOpenMenu ? "justify-between" : "justify-center"
        )}
      >
        <Link
          href={item.path}
          className="flex items-center justify-center gap-4"
        >
          <Icon
            width={20}
            height={20}
            size="20"
            className={cn(
              "text-gray-600 dark:text-dark-light-gray",
              isActive && "dark:text-primary-500 text-primary-500"
            )}
          />

          {isOpenMenu && (
            <Typography
              element="h6"
              variant="small-text"
              className={cn(
                "font-semibold text-gray-600",
                isActive && "dark:text-primary-500 text-primary-500"
              )}
            >
              {item.label}
            </Typography>
          )}
        </Link>
      </div>
    </li>
  );
}
