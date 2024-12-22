import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Typography } from "@/shared/components/typography/typography";
import Button from "@/ui/button";
import { Link, MoreHorizontal } from "lucide-react";
import { SessionEntity } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";

export function useSessionColumn() {
  const sessionColumns: ColumnDef<SessionEntity>[] = [
    {
      accessorKey: "visits",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Visits
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("visits")}
        </Typography>
      ),
    },
    {
      accessorKey: "views",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Views
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("views")}
        </Typography>
      ),
    },
    {
      accessorKey: "country",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Country
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {new Intl.DisplayNames(["en"], { type: "region" }).of(
            row.getValue("country")
          )}
        </Typography>
      ),
    },
    {
      accessorKey: "city",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          City
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("city")}
        </Typography>
      ),
    },
    {
      accessorKey: "browser",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Browser
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("browser")}
        </Typography>
      ),
    },
    {
      accessorKey: "os",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Os
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("os")}
        </Typography>
      ),
    },
    {
      accessorKey: "device",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Device
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {row.getValue("device")}
        </Typography>
      ),
    },
    {
      accessorKey: "lastAt",
      header: () => (
        <Typography variant="menu-text" element="h6" className="text-left">
          Last seen
        </Typography>
      ),
      cell: ({ row }) => (
        <Typography variant="content-text" element="h6" className="text-left">
          {format(row.getValue("lastAt"), "MMMM d 'at' h aaaa")}
        </Typography>
      ),
    },
  ];

  return {
    sessionColumns,
  };
}
