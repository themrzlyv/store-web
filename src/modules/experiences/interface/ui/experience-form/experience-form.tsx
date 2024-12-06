import { Typography } from "@/shared/components/typography/typography";
import { Input } from "@/ui";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { useExperienceForm } from "./use-experience-form";
import Button from "@/ui/button";
import { ExperienceEntity } from "@/modules/experiences/domain/entities/experience.entity";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { cn, formatDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/ui/checkbox";

type Props = {
  experience?: ExperienceEntity;
  isEdit?: boolean;
};

export function ExperienceForm({ experience, isEdit }: Props) {
  const { form, onSubmit, isLoading, isDisabledEndDate } = useExperienceForm({
    experience,
    isEdit,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, err => console.log(err))}
      className="max-w-md w-full space-y-6"
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Position
              </Typography>
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Company
              </Typography>
              <FormControl>
                <Input placeholder="Company" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyUrl"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Company URL
              </Typography>
              <FormControl>
                <Input placeholder="Company URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Typography element="p" variant="label">
            Time period
          </Typography>
          <div className="flex items-center py-1 border rounded-lg ">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="start-date"
                          variant="ghost"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon width={16} height={16} />
                          {field.value
                            ? formatDate(field.value, true)
                            : "Pick a start date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        toDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            {"-"}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="end-date"
                          variant="ghost"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isDisabledEndDate}
                        >
                          {field.value
                            ? formatDate(field.value, true)
                            : "Pick an end date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        fromDate={
                          new Date(form.getValues("startDate") || new Date())
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="present"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 mt-4 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Present</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Image
              </Typography>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  onChange={event =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant="primary" type="submit" size="lg" isLoading={isLoading}>
          Save
        </Button>
      </Form>
    </form>
  );
}
