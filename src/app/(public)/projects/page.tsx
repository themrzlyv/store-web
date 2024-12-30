import { generateMetadata } from "@/lib/generate-metadata";
import { ProjectsPage } from "@/modules/projects/interface/ui/projects.page";
import { Metadata } from "next";

export const metadata = generateMetadata({
  title: "Projects",
  description: "Projects by Samir Mirzaliyev.",
  exactUrl: "https://themirzaliyev.store/projects",
  keywords: [
    "tech",
    "software",
    "development",
    "project",
    "portfolio",
    "app",
    "programming",
  ],
});

export default ProjectsPage;
