import { generateMetadata } from "@/lib/generate-metadata";
import { AboutPage } from "@/modules/about/interface/ui/about.page";
import { Metadata } from "next";

export const metadata: Metadata = {
  ...generateMetadata({
    title: "About",
    description: "Learn more about me (Samir Mirzaliyev), my career and more",
    exactUrl: "https://themirzaliyev.store/about",
    keywords: ["bio", "biography", "information", "about", "career"],
  }),
};

export default AboutPage;
