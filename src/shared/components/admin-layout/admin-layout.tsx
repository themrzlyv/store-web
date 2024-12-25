import { useMemo, useState } from "react";
import { AdminHeader } from "../admin-header/admin-header";
import { AdminMenu } from "../admin-menu/admin-menu";
import { Loader } from "../loader/loader";
import { cn } from "@/lib/utils";
import { Typography } from "../typography/typography";
import { usePathname } from "next/navigation";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isOpenMenu, setIsOpenMenu] = useState(true);

  const handleToggleMenu = () => setIsOpenMenu(!isOpenMenu);

  const pageName = useMemo(() => {
    const paths = pathname.split("/").filter(p => p !== "");

    if (paths.length < 2) {
      return paths[0];
    }

    return [paths[paths.length - 2], paths[paths.length - 1]].join(" | ");
  }, [pathname]);

  return (
    <div className="flex flex-wrap h-full min-h-screen">
      <div className="w-full h-full flex">
        <AdminMenu
          isOpenMenu={isOpenMenu}
          handleToggleMenu={handleToggleMenu}
        />

        <div
          className={cn(
            "h-full min-h-screen bg-light-dark dark:bg-dark-default w-full duration-300",
            isOpenMenu ? "pl-60" : "pl-20"
          )}
        >
          <AdminHeader />
          <div className="h-16 w-full flex items-center dark:bg-dark-default px-8">
            <Typography
              element="h4"
              variant="section-title"
              className="capitalize"
            >
              {pageName}
            </Typography>
          </div>
          <div className="h-full px-8 bg-light-dark dark:bg-dark-default">
            {children}
          </div>
        </div>
      </div>

      <Loader />
    </div>
  );
}
