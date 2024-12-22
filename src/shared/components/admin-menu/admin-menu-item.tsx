import { cn } from "@/lib/utils";
import { Typography } from "../typography/typography";
import { adminMenuItems } from "@/shared/data/routes";
import { Dispatch, SetStateAction, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "@/ui/button";

type Props = {
  item: (typeof adminMenuItems)[0];
  isOpenMenu: boolean;
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
};

export function AdminMenuItem({
  item,
  isOpenMenu,
  openDropdown,
  setOpenDropdown,
}: Props) {
  const pathname = usePathname();

  const Icon = item.icon;

  const toggleDropdown = () => {
    setOpenDropdown(prev => (prev === item.label ? null : item.label));
  };

  const isActive = useMemo(() => {
    if (item.path) {
      return pathname === item.path;
    }
    if (item.subMenu) {
      return item.subMenu.some(subItem => pathname === subItem.path);
    }
    return false;
  }, [item, pathname]);

  const subMenuItems = useMemo(() => {
    if (!isOpenMenu || !item.subMenu) return null;

    return (
      <div
        className={cn(
          "flex flex-col gap-1 overflow-hidden h-full transition-all ease-in-out duration-300",
          openDropdown === item.label
            ? "max-h-screen opacity-100 mt-2"
            : "max-h-0 opacity-0"
        )}
      >
        {item.subMenu.map((subItem, subIndex) => (
          <Link
            key={subIndex}
            href={subItem.path}
            className={cn(
              "py-2.5 px-3 transition-colors pl-14 duration-200 rounded-md hover:dark:bg-dark-lighter hover:bg-light-darker",
              pathname === subItem.path &&
                "border-l-2 pl-14 border-primary-400 dark:bg-dark-lighter bg-light-darker"
            )}
          >
            <Typography
              element="p"
              variant="small-text"
              className={cn(
                "font-medium",
                pathname === subItem.path &&
                  "dark:text-primary-500 text-primary-500"
              )}
            >
              {subItem.label}
            </Typography>
          </Link>
        ))}
      </div>
    );
  }, [isOpenMenu, item.subMenu, item.label, openDropdown, pathname]);

  return (
    <li className={cn("flex flex-col px-3 overflow-hidden")}>
      <div
        className={cn(
          "py-2.5 px-3 rounded-md transition-colors hover:dark:bg-dark-lighter hover:bg-light-darker flex items-center justify-between duration-200 cursor-pointer",
          isActive && "dark:bg-dark-lighter bg-light-darker",
          isOpenMenu ? "justify-between" : "justify-center"
        )}
        onClick={() =>
          item.subMenu ? toggleDropdown() : setOpenDropdown(null)
        }
      >
        <Link
          href={item.path || "#"}
          className="flex items-center justify-center gap-4"
        >
          <Icon
            width={20}
            height={20}
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
        {isOpenMenu && item.subMenu ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="rounded-full p-1.5"
          >
            {openDropdown === item.label ? (
              <ChevronUp width={16} height={16} />
            ) : (
              <ChevronDown width={16} height={16} />
            )}
          </Button>
        ) : null}
      </div>

      {subMenuItems}
    </li>
  );
}
