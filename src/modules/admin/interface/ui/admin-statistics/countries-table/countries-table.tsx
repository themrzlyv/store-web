import { useGetPageViewsQuery } from "@/modules/admin/infra/reports.api";
import { AppTable } from "@/shared/components/app-table/app-table";
import { Typography } from "@/shared/components/typography/typography";
import { useCountryColumn } from "@/shared/hooks/use-country-column";
import { useMemo } from "react";

export function CountriesTable() {
  const { data: countries, isLoading } = useGetPageViewsQuery({
    type: "country",
  });

  const { countryColumns } = useCountryColumn();

  const data = useMemo(() => {
    if (!countries?.data || isLoading || !countries?.data.length) return [];

    return [...countries.data].map(item => ({
      country: item.x,
      visitors: item.y,
    }));
  }, [countries, isLoading]);

  return (
    <>
      <Typography element="h4" variant="card-title">
        Countries
      </Typography>
      <AppTable<(typeof data)[0]>
        data={data}
        columns={countryColumns}
        isTableLoading={isLoading}
      />
    </>
  );
}
