"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Movie } from "@/lib/tmdb";

type Props = {
  movie: Movie;
  rank: number;
  isInList: boolean;
  onOpenDetails: (movie: Movie) => void;
  onToggleList: (movie: Movie) => void;
};

export default function TopTenCard({
  movie,
  rank,
  isInList,
  onOpenDetails,
  onToggleList,
}: Props) {
  const router = useRouter();
  const title = movie.title || movie.name || "Untitled";
  const isDoubleDigit = rank >= 10;

  if (!movie.poster_path) return null;

  return (
    <div className="group/card relative shrink-0 flex items-end z-0 transition-all duration-300 ease-out md:hover:z-30 md:hover:scale-[1.06] lg:hover:scale-[1.08] hover:origin-bottom">
      <span
        className={`font-black leading-none text-transparent select-none shrink-0 ${
          isDoubleDigit
            ? "text-[2.75rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] -mr-0.5 sm:mr-0"
            : "text-[3.25rem] sm:text-[4rem] md:text-[4.75rem] lg:text-[5.5rem] mr-0 sm:mr-1"
        }`}
        style={{
          WebkitTextStroke: "2px #595959",
          paintOrder: "stroke fill",
        }}
        aria-hidden
      >
        {rank}
      </span>

      <div className="relative w-[88px] sm:w-[100px] md:w-[115px] lg:w-[130px]">
        <div
          className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer shadow-md"
          onClick={() => onOpenDetails(movie)}
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 88px, 130px"
          />
        </div>

        <div className="hidden lg:block absolute left-0 right-0 top-full pt-1 opacity-0 invisible translate-y-1 group-hover/card:opacity-100 group-hover/card:visible group-hover/card:translate-y-0 transition-all duration-300">
          <div className="rounded-b-md bg-zinc-900 shadow-2xl border border-zinc-800 border-t-0 p-2.5">
            <p className="text-xs font-semibold text-white truncate">{title}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <button
                type="button"
                aria-label={`Play ${title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/watch/${movie.id}`);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black text-xs hover:bg-gray-200"
              >
                ▶
              </button>
              <button
                type="button"
                aria-label={isInList ? "Remove from My List" : "Add to My List"}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleList(movie);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-600 text-xs text-white hover:border-white"
              >
                {isInList ? "✓" : "+"}
              </button>
              <button
                type="button"
                aria-label={`More info about ${title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails(movie);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-600 text-xs text-white hover:border-white ml-auto"
              >
                ⌄
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
