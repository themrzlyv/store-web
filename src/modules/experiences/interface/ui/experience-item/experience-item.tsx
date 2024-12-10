import { formatDate } from "@/lib/utils";
import { ExperienceEntity } from "@/modules/experiences/domain/entities/experience.entity";
import { Card } from "@/shared/components/card/card";
import { Typography } from "@/shared/components/typography/typography";

type Props = {
  item: ExperienceEntity;
  line?: boolean;
};

export function ExperienceItem({ item, line }: Props) {
  return (
    <Card key={item.id} element="a" href={item.companyUrl} target="_blank">
      <Card.Image
        src={item.image}
        width={50}
        height={50}
        alt={item.company}
        line={line}
      />
      <Card.Content
        title={item.company}
        content={item.position}
        subContent={
          <Typography element="p" variant="small-text" className="font-light">
            {formatDate(item.startDate, false)} -{" "}
            {item.endDate ? formatDate(item.endDate, false) : "Present"}
          </Typography>
        }
      />
    </Card>
  );
}
