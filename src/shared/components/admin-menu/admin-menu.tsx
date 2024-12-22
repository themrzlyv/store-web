"use client";
import { cn } from "@/lib/utils";
import { adminMenuItems } from "@/shared/data/routes";
import { Typography } from "../typography/typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LogoIcon } from "@/shared/icons";
import { AdminMenuItem } from "./admin-menu-item";
import Link from "next/link";
import Button from "@/ui/button";
import { useState } from "react";

type Props = {
  isOpenMenu: boolean;
  handleToggleMenu: () => void;
};

export function AdminMenu({ isOpenMenu, handleToggleMenu }: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav
      className={cn(
        "bg-white h-full z-50 fixed overflow-hidden transition-all duration-300 border-r border-light-dark dark:border-dark-lighter shadow-sm  dark:bg-dark-light"
      )}
    >
      <ul
        className={cn(
          "flex flex-col transition-all duration-300 gap-2 dark:bg-dark-light",
          isOpenMenu ? "w-60" : "w-20"
        )}
      >
        <li className="h-16 flex items-center justify-center mb-14 w-full">
          <Link
            href="/admin"
            className="flex items-center gap-1 cursor-pointer"
          >
            <div>
              <LogoIcon width={28} height={28} />
            </div>
            {isOpenMenu && (
              <Typography
                element="h4"
                variant="menu-text"
                className="text-base font-extrabold text-primary-500 dark:text-primary-500"
              >
                themirzaliyev
              </Typography>
            )}
          </Link>
        </li>
        {adminMenuItems.map((item, index) => (
          <AdminMenuItem
            key={index}
            item={item}
            isOpenMenu={isOpenMenu}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        ))}
        <li
          onClick={handleToggleMenu}
          className={cn("fixed bottom-10 left-3 duration-300 flex")}
        >
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full p-2"
            onClick={handleToggleMenu}
          >
            {isOpenMenu ? (
              <ChevronLeft width={16} height={16} />
            ) : (
              <ChevronRight width={16} height={16} />
            )}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
