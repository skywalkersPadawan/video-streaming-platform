"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMovies, type Movie } from "@/lib/tmdb";
import { addToMyList, removeFromMyList } from "@/lib/api";
import MovieRowCard from "./MovieRowCard";
import TopTenCard from "./TopTenCard";
import MovieDetailModal from "./MovieDetailModal";
import RowSkeleton from "./RowSkeleton";
import type { ToastState } from "./Toast";

type Props = {
  title: string;
  endpoint: string;
  myListIds: number[];
  setMyListIds: React.Dispatch<React.SetStateAction<number[]>>;
  setToast: React.Dispatch<React.SetStateAction<ToastState>>;
  variant?: "default" | "top10";
};

export default function VideoRow({
  title,
  endpoint,
  myListIds,
  setMyListIds,
  setToast,
  variant = "default",
}: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(endpoint);
        const list = variant === "top10" ? (data || []).slice(0, 10) : data || [];
        setMovies(list);
      } catch (err) {
        console.error("TMDB fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [endpoint, variant]);

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
  }, [movies, loading, updateScrollButtons]);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

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

  const skeletonVariant = variant === "top10" ? "top10" : "poster";

  return (
    <div className="px-4 sm:px-6 lg:px-10">
      <h2 className="text-lg sm:text-xl font-bold mb-3">{title}</h2>

      <div className="relative group/row -my-4 py-8 overflow-visible">
        {!loading && canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-full items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        {!loading && canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-full items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
            aria-label="Scroll right"
          >
            ›
          </button>
        )}

        {loading ? (
          <RowSkeleton count={variant === "top10" ? 10 : 6} variant={skeletonVariant} />
        ) : (
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto overscroll-x-contain touch-pan-x pb-1 -mx-1 px-1 ${
              variant === "top10"
                ? "gap-2 sm:gap-4 md:gap-5 lg:gap-6 items-end"
                : "gap-3 sm:gap-4"
            }`}
          >
            {variant === "top10"
              ? movies.map((movie, index) => (
                  <TopTenCard
                    key={movie.id}
                    movie={movie}
                    rank={index + 1}
                    isInList={myListIds.includes(movie.id)}
                    onOpenDetails={setSelectedMovie}
                    onToggleList={handleToggleList}
                  />
                ))
              : movies.map((movie) =>
                  movie.poster_path ? (
                    <MovieRowCard
                      key={movie.id}
                      movie={movie}
                      isInList={myListIds.includes(movie.id)}
                      onOpenDetails={setSelectedMovie}
                      onToggleList={handleToggleList}
                    />
                  ) : null,
                )}
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          isInList={myListIds.includes(selectedMovie.id)}
          onClose={() => setSelectedMovie(null)}
          onToggleList={handleToggleList}
        />
      )}
    </div>
  );
}
