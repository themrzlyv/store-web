"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/ui/sheet";
import { closeSideModal } from "./side-modal.slice";
import { Typography } from "../typography/typography";
import { useMemo } from "react";
import { SideModalComponentType } from "@/lib/types";
import { PostForm } from "@/modules/blog/interface/ui/post-form/post-form";
import { ProjectForm } from "@/modules/projects/interface/ui/project-form/project-form";
import { ExperienceForm } from "@/modules/experiences/interface/ui/experience-form/experience-form";

export function Modal() {
  const dispatch = useAppDispatch();
  const { isOpen, title, description, componentType, componentProps } =
    useAppSelector(state => state.sideModal);

  const content = useMemo(() => {
    switch (componentType) {
      case SideModalComponentType.POST_FORM:
        return <PostForm {...componentProps} />;

      case SideModalComponentType.PROJECT_FORM:
        return <ProjectForm {...componentProps} />;

      case SideModalComponentType.EXPERIENCE_FORM:
        return <ExperienceForm {...componentProps} />;

      default:
        return null;
    }
  }, [componentType, componentProps]);

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(closeSideModal())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Typography element="p" variant="section-title">
              {title}
            </Typography>
          </SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-6">{content}</div>
      </SheetContent>
    </Sheet>
  );
}
