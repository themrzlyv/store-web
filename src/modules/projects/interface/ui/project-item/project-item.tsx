import { ProjectEntity } from "@/modules/projects/domain/entities/project.entity";
import { Card } from "@/shared/components/card/card";
import { Star } from "lucide-react";

type Props = {
  project: ProjectEntity;
};

export function ProjectItem({ project }: Props) {
  console.log(project, "proejct");
  return (
    <Card
      key={project.id}
      className="h-24"
      element="a"
      href={project.sourceUrl}
    >
      <Card.Image
        src={project.image!}
        width={70}
        height={35}
        alt={project.title}
      />
      <Card.Content
        title={
          <>
            {project.title}
            <span
              style={{ textDecorationLine: "none" }}
              className="ml-4 text-xs flex items-center gap-1 rounded-md bg-primary-100 text-black py-0.5 px-2"
            >
              <Star width={10} height={10} fill="#000" />
              {project.stars}
            </span>
          </>
        }
        content={project.content}
      />
    </Card>
  );
}
