"use client";
import { Section } from "@/shared/components/section/section";
import { LoginForm } from "./login-form/login-form";

export function LoginPage() {
  return (
    <Section>
      <Section.Header title="Login" />
      <div className="flex flex-col items-center ">
        <LoginForm />
      </div>
    </Section>
  );
}
