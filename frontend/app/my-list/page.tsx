"use client";

import { useEffect, useState } from "react";
import { getMyList } from "@/lib/api";
import { removeFromMyList } from "@/lib/api";

export default function MyListPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const list = await getMyList();

        const movieIds = list.map((item: any) => item.movieId);

        // Fetch details for each movie
        const results = await Promise.all(
          movieIds.map((id: number) =>
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            ).then((res) => res.json()),
          ),
        );

        setMovies(results);
      } catch (err) {
        console.error(err);
        setError("Failed to load your list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen p-10">
        <h1 className="text-3xl mb-6">My List</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen p-10">
        <h1 className="text-3xl mb-6">My List</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[240px] bg-zinc-800 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-3xl mb-6">My List</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 rounded pointer-events-none" />
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded transition-transform duration-300 group-hover:scale-105"
            />

            {/* remove button */}
            <button
              onClick={async () => {
                try {
                  await removeFromMyList(movie.id);
                  setMovies((prev) => prev.filter((m) => m.id !== movie.id));
                } catch (err) {
                  console.error(err);
                }
              }}
              className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              ✕
            </button>
            <p className="mt-2 text-sm">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
