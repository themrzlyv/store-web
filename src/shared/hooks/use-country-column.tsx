import { ColumnDef } from "@tanstack/react-table";
import { Typography } from "@/shared/components/typography/typography";

export function useCountryColumn() {
  const countryColumns: ColumnDef<{ country: string; visitors: number }>[] = [
    {
      accessorKey: "country",
      header: () => (
        <Typography variant="small-bold" element="h6" className="text-left">
          Top Countries
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="small-text" element="p" className="text-left">
          {new Intl.DisplayNames(["en"], { type: "region" }).of(
            row.getValue("country")
          )}
        </Typography>
      ),
    },
    {
      accessorKey: "visitors",
      header: () => (
        <Typography variant="small-bold" element="h6" className="text-center">
          Users
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="small-text" element="p" className="text-center">
          {row.getValue("visitors")}
        </Typography>
      ),
    },
  ];

  return {
    countryColumns,
  };
}
