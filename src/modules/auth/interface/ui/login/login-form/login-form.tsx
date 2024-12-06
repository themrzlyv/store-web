import { Form, FormControl, FormField, FormItem } from "@/ui/form";
import { useLoginForm } from "./use-login-form";
import { Typography } from "@/shared/components/typography/typography";
import { Input } from "@/ui";
import Button from "@/ui/button";

export function LoginForm() {
  const { form, onSubmit } = useLoginForm();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-md w-full space-y-6"
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Email
              </Typography>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Typography element="p" variant="label">
                Password
              </Typography>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
    </form>
  );
}
