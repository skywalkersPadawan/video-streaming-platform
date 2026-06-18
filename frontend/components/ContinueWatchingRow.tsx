"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchMovieById, type Movie } from "@/lib/tmdb";
import { getWatchHistory } from "@/lib/api";
import RowSkeleton from "./RowSkeleton";

type ContinueItem = {
  movie: Movie;
  progress: number;
  progressPercent: number;
};

export default function ContinueWatchingRow() {
  const [items, setItems] = useState<ContinueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const router = useRouter();

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const userId = localStorage.getItem("session");
        if (!userId) {
          setItems([]);
          return;
        }

        const history = await getWatchHistory();
        if (history.length === 0) {
          setItems([]);
          return;
        }

        const results = await Promise.all(
          history.slice(0, 10).map(async (entry) => {
            try {
              const movie = await fetchMovieById(entry.movieId);
              const runtimeSeconds = (movie.runtime ?? 120) * 60;
              const progressPercent = Math.min(
                (entry.progress / runtimeSeconds) * 100,
                100,
              );

              return {
                movie,
                progress: entry.progress,
                progressPercent,
              };
            } catch {
              return null;
            }
          }),
        );

        setItems(results.filter((item): item is ContinueItem => item !== null));
      } catch (err) {
        console.error("Continue watching load error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -480 : 480,
      behavior: "smooth",
    });
  };

  if (!loading && items.length === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <h2 className="text-lg sm:text-xl font-bold mb-3">Continue Watching</h2>

      <div className="relative group/row">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute left-0 top-0 bottom-0 z-20 w-12 items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute right-0 top-0 bottom-0 z-20 w-12 items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
            aria-label="Scroll right"
          >
            ›
          </button>
        )}

        {loading ? (
          <RowSkeleton
            count={5}
            variant="continue"
          />
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain touch-pan-x pb-1 -mx-1 px-1"
          >
            {items.map(({ movie, progressPercent }) => {
              const title = movie.title || movie.name || "Untitled";
              const imagePath = movie.backdrop_path || movie.poster_path;

              if (!imagePath) return null;

              return (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => router.push(`/watch/${movie.id}`)}
                  className="group relative shrink-0 w-[200px] sm:w-[240px] aspect-video rounded overflow-hidden cursor-pointer shadow-md text-left"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${imagePath}`}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
                    <div
                      className="h-full bg-[#E50914]"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="absolute bottom-3 left-2 right-2 text-xs sm:text-sm font-semibold text-white drop-shadow-md truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {title}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
