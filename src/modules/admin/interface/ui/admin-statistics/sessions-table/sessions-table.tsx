import { SessionEntity } from "@/lib/types";
import { useGetSessionsQuery } from "@/modules/admin/infra/reports.api";
import { AppTable } from "@/shared/components/app-table/app-table";
import { Typography } from "@/shared/components/typography/typography";
import { useSessionColumn } from "@/shared/hooks/use-session-column";
import { QueryTypes } from "@/shared/query-types/query-types";

export function SessionsTable() {
  const { data: sessionsData, isLoading: isLoadingSessions } =
    useGetSessionsQuery(QueryTypes.SESSIONS);
  const { sessionColumns } = useSessionColumn();
  return (
    <>
      <Typography element="h4" variant="card-title">
        Sessions
      </Typography>
      <AppTable<SessionEntity>
        data={sessionsData?.data || []}
        columns={sessionColumns}
        isTableLoading={isLoadingSessions}
      />
    </>
  );
}
