import { Editor } from "@/shared/components/editor/editor";
import { Section } from "@/shared/components/section/section";
import Button from "@/ui/button";
import { Form } from "@/ui/form";
import { Save, UserRoundPen } from "lucide-react";
import { useAboutForm } from "./use-about-form";
import { cn } from "@/lib/utils";

type Props = {
  showEditMode?: boolean;
};

export function AboutForm({ showEditMode = false }: Props) {
  const { editor, form, onSubmit, toggleEditMode, isEditMode } = useAboutForm();

  return (
    <div className={cn(showEditMode ? "border-t py-3" : "")}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Section>
          {showEditMode && (
            <Section.Header
              title="About"
              action={{
                icon: UserRoundPen,
                onClick: toggleEditMode,
                title: "Edit",
              }}
              subActions={[
                isEditMode && (
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="max-w-md w-full"
                  >
                    <Save width={16} height={16} />
                    Save
                  </Button>
                ),
              ]}
            />
          )}
          <div className="flex items-center flex-wrap">
            <Form {...form}>
              <Editor editor={editor} />
            </Form>
          </div>
        </Section>
      </form>
    </div>
  );
}
