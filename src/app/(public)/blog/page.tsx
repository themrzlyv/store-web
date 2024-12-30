import { generateMetadata } from "@/lib/generate-metadata";
import { BlogPage } from "@/modules/blog/interface/ui/blog.page";
import { Metadata } from "next";

export const metadata = generateMetadata({
  title: "Blog",
  description: "Blog posts by Samir Mirzaliyev.",
  exactUrl: "https://themirzaliyev.store/blog",
  keywords: [
    "tech",
    "software",
    "development",
    "thoughts",
    "opinions",
    "blog",
    "content",
    "story",
    "storytelling",
    "news",
  ],
});

export default BlogPage;
