import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";
import { Card } from "@/shared/components/card/card";
import { Typography } from "@/shared/components/typography/typography";
import { Star } from "lucide-react";

type Props = {
  project: ProjectEntity;
};

export function ProjectItem({ project }: Props) {
  const isGithubUrl = project.sourceUrl?.includes("github.com");
  return (
    <Card
      key={project.id}
      className="md:h-24 h-36"
      element="a"
      href={project.sourceUrl}
      target="_blank"
    >
      <Card.Image
        src={project.image!}
        width={70}
        height={35}
        alt={project.title}

      />
      <Card.Content
        className="justify-start gap-2 md:justify-between md:gap-0"
        title={
          <>
            {project.title}
            {isGithubUrl && (
              <span
                style={{ textDecorationLine: "none" }}
                className="ml-4 text-xs flex items-center gap-1 rounded-md bg-primary-100 text-black py-0.5 px-2"
              >
                <Star width={10} height={10} fill="#000" />
                {project.stars}
              </span>
            )}
          </>
        }
        content={project.content}
        subContent={
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.map((item) => (
              <Typography
                key={item.id}
                element="span"
                variant="small-text"
                className="dark:bg-dark-lighter text-xs bg-light-darker px-2 py-0.5 dark:text-light-default/90 rounded-md"
              >
                {item.name}
              </Typography>
            ))}
          </div>
        }
      />
    </Card>
  );
}
