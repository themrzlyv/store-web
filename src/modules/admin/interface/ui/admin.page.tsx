import { AdminGreeting } from "./admin-greeting/admin-greeting";
import { AdminStatistics } from "./admin-statistics/admin-statistics";

export function AdminPage() {
  return (
    <div className="flex flex-col h-full w-full gap-8 p-5">
      <AdminGreeting />
      <AdminStatistics />
    </div>
  );
}
