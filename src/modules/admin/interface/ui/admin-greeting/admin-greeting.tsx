import { Typography } from "@/shared/components/typography/typography";

export function AdminGreeting() {
    return (
      <div className="flex flex-col gap-3">
        <Typography
          element="h1"
          variant="big-heading"
          className="flex items-center gap-1"
        >
          <span
            role="img"
            aria-label={"waving hand"}
            className="inline-block motion-safe:animate-pulse"
          >
            Welcome!👋
          </span>
        </Typography>
        <Typography variant="content-text" element="p">
          Good evening!
        </Typography>
      </div>
    );
}