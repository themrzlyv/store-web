import { Info } from "./info/info";
import { RecentProjects } from "./recent-project/recent-projects";
import { RecentPosts } from "./recent-posts/recent-posts";

export function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <Info />
      <RecentPosts />
      <RecentProjects />
    </div>
  );
}
