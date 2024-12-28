"use client";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { AboutForm } from "@/modules/bio/interface/ui/about-form/about-form";
import { Typography } from "@/shared/components/typography/typography";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Skeleton } from "@/ui/skeleton";
import { useMemo } from "react";

export function Info() {
  const { data, isLoading } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const fullName = useMemo(() => {
    if (!data) return "";

    return [data.bio.firstName, data.bio.lastName].filter(Boolean).join(" ");
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col gap-6  max-w-[105ch]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6  max-w-[105ch]">
      <Typography variant="content-text" element="p" className="font-light font-inter">
        👋 Hey there! I&apos;m {fullName}. {data.bio.bio}.
      </Typography>
      <AboutForm />
    </div>
  );
}
