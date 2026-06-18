"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Movie } from "@/lib/tmdb";

type Props = {
  movie: Movie;
  isInList: boolean;
  onClose: () => void;
  onToggleList: (movie: Movie) => void;
};

export default function MovieDetailModal({
  movie,
  isInList,
  onClose,
  onToggleList,
}: Props) {
  const router = useRouter();
  const title = movie.title || movie.name || "Untitled";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10 bg-zinc-900 rounded-lg overflow-hidden shadow-2xl w-[min(100vw-2rem,500px)] max-h-[90vh] flex flex-col mx-4 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[200px] sm:h-[250px] shrink-0 bg-zinc-800">
          {(movie.backdrop_path || movie.poster_path) && (
            <Image
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 500px"
            />
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-white text-xl z-20"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-4">
            <h2 className="text-xl font-bold">{title}</h2>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => router.push(`/watch/${movie.id}`)}
                className="bg-white text-black px-3 py-1 rounded"
              >
                ▶ Play
              </button>
              <button
                type="button"
                onClick={() => onToggleList(movie)}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                {isInList ? "✔ Added" : "+ My List"}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 text-sm text-gray-300 overflow-y-auto max-h-[40vh] sm:max-h-none">
          {movie.overview}
        </div>
      </div>
    </div>
  );
}
