"use client";
import { useGetExperiencesQuery } from "@/modules/experiences/infra/experience.api";
import { ExperienceItem } from "@/modules/experiences/interface/ui/experience-item/experience-item";
import { PostItemSkeleton } from "@/shared/components/post-item-skeleton/post-item-skeleton";
import { Section } from "@/shared/components/section/section";
import { QueryTypes } from "@/shared/query-types/query-types";
import Button from "@/ui/button";
import { useMemo } from "react";

export function Experience() {
  const { data, isLoading } = useGetExperiencesQuery(QueryTypes.EXPERIENCES);

  const renderList = useMemo(() => {
    if (!data || isLoading) {
      return Array.from({ length: 2 }).map((_, index) => {
        return <PostItemSkeleton key={index} />;
      });
    }
    return data.experiences.map((item, index) => (
      <ExperienceItem
        key={index}
        item={item}
        line={index % 2 === 0 && data.experiences.length > 1}
      />
    ));
  }, [data, isLoading]);

  return (
    <div className="flex flex-col gap-4">
      <Section.Header
        title="Experience"
        action={{ title: "Resume", onClick: () => {} }}
      />
      <div className="flex flex-1 flex-col">{renderList}</div>
    </div>
  );
}
