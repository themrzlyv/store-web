"use client";
import { useGetBioInformationQuery } from "@/modules/bio/infra/bio.api";
import { Trash2 } from "lucide-react";
import { Typography } from "../typography/typography";
import { QueryTypes } from "@/shared/query-types/query-types";
import { Skeleton } from "@/ui/skeleton";

type Props = {
  handleRemoveSkill?: (id: number) => void;
};

export function Skills({ handleRemoveSkill }: Props) {
  const { data, isLoading } = useGetBioInformationQuery(QueryTypes.BIO_INFO);

  if (isLoading || !data?.bio.skills) {
    return Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="w-20 h-8 rounded-md" />
    ));
  }

  return data.bio.skills.map(skill => {
    return (
      <div
        key={skill.id}
        className="bg-dark-light-gray/20 relative flex items-center justify-center dark:bg-dark-light/50 hover:dark:bg-dark-lighter ring-1 ring-primary-600/10 dark:ring-primary-200/15 cursor-default py-1.5 px-3 hover:bg-light-dark rounded-lg"
      >
        {handleRemoveSkill && (
          <div
            onClick={() => handleRemoveSkill(skill.id)}
            className="absolute right-[-10px] top-[-12px] bg-red-400 p-1 cursor-pointer rounded-full text-white "
          >
            <Trash2 width={12} height={12} />
          </div>
        )}

        <Typography variant="small-text" element="p" className="font-normal font-inter">
          {skill.name}
        </Typography>
      </div>
    );
  });
}
