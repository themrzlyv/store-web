import prisma from "@/lib/prisma";
import type { MetadataRoute } from "next";

const today = ((): Date => {
  const d = new Date();
  d.setUTCHours(+4);
  return d;
})();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany();

  const blogs = posts.map(post => ({
    url: `https://themirzaliyev.store/blog/${post.slug}`,
    lastModified: post.createdAt.toISOString().split("T")[0],
    priority: 0.6,
  }));

  const routes = ["", "about", "blog", "projects"].map(route => ({
    url: `https://themirzaliyev.store/${route}`,
    lastModified: today.toISOString().split("T")[0],
    priority: route ? 0.8 : 1,
  }));

  return [...routes, ...blogs].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );
}
