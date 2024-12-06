import { Input } from "@/ui";
import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { useUpdateBioForm } from "./use-update-bio-form";
import Button from "@/ui/button";
import { Save, UserRoundPen } from "lucide-react";
import { Textarea } from "@/ui/textarea";
import { Section } from "@/shared/components/section/section";

export function UpdateBioForm() {
  const { form, onSubmit, isEditMode, toggleEditMode } = useUpdateBioForm();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Section>
        <Section.Header
          title="Bio Information"
          action={
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="md"
                type="button"
                onClick={toggleEditMode}
              >
                <UserRoundPen width={22} height={22} />
              </Button>
              {isEditMode && (
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="max-w-md w-full"
                >
                  <Save width={22} height={22} />
                </Button>
              )}
            </div>
          }
        />
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={!isEditMode}
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={!isEditMode}
                      placeholder="Last Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={!isEditMode}
                      placeholder="Profession"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="resize-none min-h-[80px] max-w-md w-full"
                      disabled={!isEditMode}
                      placeholder="Bio"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        </div>
      </Section>
    </form>
  );
}
