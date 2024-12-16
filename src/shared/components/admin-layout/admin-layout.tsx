import { AdminHeader } from "../admin-header/admin-header";
import { AdminMenu } from "../admin-menu/admin-menu";
import { Loader } from "../loader/loader";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[0.2fr_repeat(4,1fr)] grid-rows-[80px_repeat(4,1fr)] h-full min-h-screen">
      <div className="col-span-1 row-start-1 row-span-full bg-light-dark/50 ring-1 ring-primary-600/10 dark:bg-dark-light dark:ring-primary-200/15">
        <AdminMenu />
      </div>
      <div className="col-start-2 row-start-1 row-span-1 col-span-full bg-light-dark-10/20 dark:bg-dark-default">
        <AdminHeader />
      </div>
      <div className="col-start-2 row-start-2 col-span-full row-span-full bg-light-dark-10/20 dark:bg-dark-default">
        <div className="max-w-screen-lg w-full mx-auto">{children}</div>
      </div>
      <Loader />
    </div>
  );
}
