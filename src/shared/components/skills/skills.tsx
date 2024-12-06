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
      <Skeleton key={index} className="w-36 h-10 rounded-md" />
    ));
  }

  return data.bio.skills.map(skill => {
    return (
      <div
        key={skill.id}
        className="bg-dark-light-gray/20 relative dark:bg-dark-light/50 hover:dark:bg-dark-lighter ring-1 ring-primary-600/10 dark:ring-primary-200/15 cursor-default py-2 px-4 hover:bg-light-dark rounded-md"
      >
        {handleRemoveSkill && (
          <div
            onClick={() => handleRemoveSkill(skill.id)}
            className="absolute right-[-13px] top-[-15px] bg-red-400 p-2 cursor-pointer rounded-full text-white "
          >
            <Trash2 width={16} height={16} />
          </div>
        )}

        <Typography variant="content-text" element="p">
          {skill.name}
        </Typography>
      </div>
    );
  });
}
