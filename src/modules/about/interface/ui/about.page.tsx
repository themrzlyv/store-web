import { Section } from "@/shared/components/section/section";
import { Info } from "./info/info";
import { Connect } from "./connect/connect";
import { Skills } from "./skills/skills";
import { Experience } from "./experience/experience";

export function AboutPage() {
  return (
    <Section>
      <Section.Header title="About" />
      <div className="flex flex-col gap-8">
        <Info />
        <Connect />
        <Skills />
        <Experience />
      </div>
    </Section>
  );
}
