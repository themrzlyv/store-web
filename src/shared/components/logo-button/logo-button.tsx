import { cn } from "@/lib/utils";
import { LogoIcon } from "@/shared/icons";
import Link from "next/link";
import { logoVariants } from "./logo.variants";
import { Typography } from "../typography/typography";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { QueryTypes } from "@/shared/query-types/query-types";
import { useMemo } from "react";
import { Skeleton } from "@/ui/skeleton";

type Props = {
  wrapperClass?: string;
  textClass?: string;
};

export function LogoButton({ wrapperClass, textClass }: Props) {
  const { data, isLoading } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const fullName = useMemo(() => {
    if (!data) return "";

    return [data.bio.firstName, data.bio.lastName].filter(Boolean).join(" ");
  }, [data]);

  if (isLoading || !data) {
    return <Skeleton className="w-44 h-10" />;
  }

  return (
    <Link href="/" className={cn(logoVariants(), wrapperClass)}>
      <Typography
        variant="logo-text"
        element="h4"
        className={cn(
          "text-primary-default flex items-center gap-2",
          textClass
        )}
      >
        <LogoIcon width={28} height={28} />
        {fullName}
      </Typography>
    </Link>
  );
}
