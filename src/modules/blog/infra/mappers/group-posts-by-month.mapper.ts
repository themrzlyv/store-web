import { PostEntity } from "../../domain/entities/post.entity";

type GroupedPost = {
  year: number;
  months: { month: string; count: number }[];
};

export const groupPostsByYearAndMonthMapper = (
  posts: PostEntity[]
): GroupedPost[] => {
  // Map for month names
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  // Group posts by year and month
  const groupedData = posts.reduce<Record<number, Record<string, number>>>(
    (acc, post) => {
      const date = new Date(post.createdAt);
      const year = date.getFullYear();
      const month = months[date.getMonth()]; // Get month name

      // Initialize year if not present
      if (!acc[year]) acc[year] = {};

      // Increment month count
      acc[year][month] = (acc[year][month] || 0) + 1;

      return acc;
    },
    {}
  );

  // Transform grouped data into the desired structure
  return Object.entries(groupedData)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort years descending
    .map(([year, monthsData]) => ({
      year: Number(year),
      months: Object.entries(monthsData)
        .map(([month, count]) => ({ month, count }))
        .sort(
          (a, b) => months.indexOf(b.month) - months.indexOf(a.month) // Sort months descending
        )
        .filter(({ count }) => count > 0),
    }));
};
