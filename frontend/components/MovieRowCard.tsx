"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import type { Movie } from "@/lib/tmdb";

type Props = {
  movie: Movie;
  isInList: boolean;
  onOpenDetails: (movie: Movie) => void;
  onToggleList: (movie: Movie) => void;
};

export default function MovieRowCard({
  movie,
  isInList,
  onOpenDetails,
  onToggleList,
}: Props) {
  const router = useRouter();
  const title = movie.title || movie.name || "Untitled";

  return (
    <div className="group/card relative shrink-0 w-[130px] sm:w-[160px] z-0 transition-all duration-300 ease-out lg:hover:z-30 lg:hover:scale-[1.15] lg:hover:origin-top">
      <div
        className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer shadow-md"
        onClick={() => onOpenDetails(movie)}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 130px, 160px"
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
  );
}
