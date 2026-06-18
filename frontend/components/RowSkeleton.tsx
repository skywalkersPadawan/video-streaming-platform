type Props = {
  count?: number;
  variant?: "poster" | "top10" | "continue";
};

export default function RowSkeleton({ count = 6, variant = "poster" }: Props) {
  if (variant === "continue") {
    return (
      <div className="flex gap-3 sm:gap-4 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-[200px] sm:w-[240px] aspect-video rounded skeleton-shimmer"
          />
        ))}
      </div>
    );
  }

  if (variant === "top10") {
    return (
      <div className="flex gap-4 sm:gap-6 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-end shrink-0"
          >
            <div className="w-8 sm:w-10 h-16 sm:h-20 skeleton-shimmer rounded mr-1" />
            <div className="w-[100px] sm:w-[130px] aspect-[2/3] rounded skeleton-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 sm:gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-[130px] sm:w-[160px] aspect-[2/3] rounded skeleton-shimmer"
        />
      ))}
    </div>
  );
}
