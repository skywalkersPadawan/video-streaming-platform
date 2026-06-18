"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  fetchMovies,
  fetchMovieTrailerKey,
  type Movie,
} from "@/lib/tmdb";
import { addToMyList, removeFromMyList } from "@/lib/api";
import { getAutoplayTrailers } from "@/lib/profile";
import MovieDetailModal from "./MovieDetailModal";
import type { ToastState } from "./Toast";

type Props = {
  myListIds: number[];
  setMyListIds: React.Dispatch<React.SetStateAction<number[]>>;
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
};

export default function HeroBanner({
  myListIds,
  setMyListIds,
  setToast,
}: Props) {
  const [featured, setFeatured] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        setAutoplayEnabled(getAutoplayTrailers());
        const movies = await fetchMovies("/trending/movie/day");
        const pick = movies.find((m) => m.backdrop_path) ?? movies[0];
        if (!pick) return;

        setFeatured(pick);

        const key = await fetchMovieTrailerKey(pick.id);
        setTrailerKey(key);
      } catch (err) {
        console.error("Hero fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleToggleList = async (movie: Movie) => {
    const inList = myListIds.includes(movie.id);

    try {
      if (inList) {
        await removeFromMyList(movie.id);
        setMyListIds((prev) => prev.filter((id) => id !== movie.id));
        setToast({ message: "Removed from My List", type: "success" });
      } else {
        await addToMyList(movie.id);
        setMyListIds((prev) =>
          prev.includes(movie.id) ? prev : [...prev, movie.id],
        );
        setToast({ message: "Added to My List", type: "success" });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to update My List", type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:h-[75vh] w-full bg-zinc-900 flex items-end">
        <div className="p-4 sm:p-6 md:p-10 w-full max-w-2xl space-y-4">
          <div className="h-10 sm:h-14 w-3/4 skeleton-shimmer rounded" />
          <div className="h-5 w-full skeleton-shimmer rounded" />
          <div className="h-5 w-2/3 skeleton-shimmer rounded" />
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-28 skeleton-shimmer rounded" />
            <div className="h-11 w-32 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!featured?.backdrop_path) {
    return (
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:h-[75vh] w-full bg-zinc-900" />
    );
  }

  const title = featured.title || featured.name || "Featured";
  const showTrailer = autoplayEnabled && trailerKey;

  return (
    <>
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:h-[75vh] w-full flex items-end text-white overflow-hidden">
        {showTrailer ? (
          <iframe
            title={`${title} trailer`}
            className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35] origin-center"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media"
          />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
            alt={title}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

        {showTrailer && (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="absolute bottom-24 right-4 sm:right-10 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label={muted ? "Unmute trailer" : "Mute trailer"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        )}

        <div className="relative z-10 p-4 sm:p-6 md:p-10 max-w-2xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            {title}
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-300 line-clamp-3">
            {featured.overview}
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => router.push(`/watch/${featured.id}`)}
              className="bg-white text-black px-5 sm:px-6 py-2 rounded font-semibold hover:bg-gray-200 text-sm sm:text-base min-h-[44px] flex items-center gap-2"
            >
              ▶ Play
            </button>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-gray-700/70 px-5 sm:px-6 py-2 rounded font-semibold hover:bg-gray-600 text-sm sm:text-base min-h-[44px] flex items-center gap-2"
            >
              ℹ More Info
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <MovieDetailModal
          movie={featured}
          isInList={myListIds.includes(featured.id)}
          onClose={() => setShowModal(false)}
          onToggleList={handleToggleList}
        />
      )}
    </>
  );
}
