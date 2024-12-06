import { Skeleton } from "@/ui/skeleton";

export function PostItemSkeleton() {
  return (
    <div className="w-full h-32 flex items-center gap-4">
      <div className="w-[110px] h-28 rounded-md">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 h-full flex flex-col justify-center gap-4">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
