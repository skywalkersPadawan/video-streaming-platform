"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { searchMovies, type Movie } from "@/lib/tmdb";
import RowSkeleton from "@/components/RowSkeleton";

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      Promise.resolve().then(() => setResults([]));
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const movies = await searchMovies(query);
        setResults(movies);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="text-zinc-400 text-center py-20">
        <p className="text-lg">Search for movies, TV shows, and more.</p>
        <Link href="/" className="inline-block mt-4 text-sm text-white hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] rounded skeleton-shimmer" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-zinc-400 text-center py-20">
        <p className="text-lg">No results found for &ldquo;{query}&rdquo;</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-zinc-400 mb-6">
        {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((movie) => {
          const title = movie.title || movie.name || "Untitled";

          return (
            <button
              key={movie.id}
              type="button"
              onClick={() => router.push(`/watch/${movie.id}`)}
              className="group text-left"
            >
              <div className="relative aspect-[2/3] rounded overflow-hidden bg-zinc-900 mb-2">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 200px"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-zinc-600 text-sm">
                    No image
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-white truncate group-hover:underline">
                {title}
              </p>
              {movie.release_date && (
                <p className="text-xs text-zinc-500">{movie.release_date.slice(0, 4)}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24 px-4 sm:px-6 lg:px-10 pb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Search</h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <RowSkeleton count={10} />
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
}
