"use client";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import Link from "next/link";
import { socialFields } from "./data";
import { useMemo } from "react";
import { Social } from "@prisma/client";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Skeleton } from "@/ui/skeleton";

export function Socials() {
  const { data } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  const social: Omit<Social, "id" | "bioId"> | object = useMemo(() => {
    if (!data?.bio.social) return {};

    return Object.fromEntries(
      Object.entries(data.bio.social).filter(
        ([key]) => key !== "id" && key !== "bioId"
      )
    );
  }, [data]);

  return (
    <>
      {socialFields.map(field => {
        const name = field.name.split(".")[1] as keyof typeof social;
        return data ? (
          social[name] && (
            <Link
              href={social[name]}
              key={social[name]}
              target="_blank"
              className="p-3 rounded-lg hover:bg-light-dark dark:hover:bg-dark-lighter"
            >
              {field.icon}
            </Link>
          )
        ) : (
          <Skeleton key={field.name} className="w-14 h-14 rounded-lg" />
        );
      })}
    </>
  );
}
