"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "@/lib/tmdb";
import { addToMyList, removeFromMyList } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Movie = {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  overview?: string; // missing overview field added here
  backdrop_path?: string; // missing backdrop_path field added here
};

export default function VideoRow({
  title,
  endpoint,
  myListIds,
  setMyListIds,
  setToast,
}: {
  title: string;
  endpoint: string;
  myListIds: number[];
  setMyListIds: React.Dispatch<React.SetStateAction<number[]>>;
  setToast: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const router = useRouter();

  const isInList =
    selectedMovie !== null && myListIds.includes(selectedMovie.id);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(endpoint);
        setMovies(data || []);
      } catch (err) {
        console.error("TMDB fetch error:", err);
      }
    };

    loadMovies();
  }, [endpoint]);

  return (
    <div className="px-10">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <div className="relative overflow-visible">
        <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-[160px] shrink-0 aspect-[2/3] cursor-pointer"
              onClick={() => setSelectedMovie(movie)}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name || "Movie poster"}
                fill
                className="rounded object-cover"
                sizes="160px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* modal outside map */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMovie(null)}
          />

          {/* modal */}
          <div
            className="relative z-10 bg-zinc-900 rounded-lg overflow-hidden shadow-2xl w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[250px]">
              <Image
                src={
                  selectedMovie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
                    : `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                }
                alt={
                  selectedMovie.title ||
                  selectedMovie.name ||
                  "Selected movie backdrop"
                }
                fill
                className="object-cover"
                sizes="500px"
              />

              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                className="absolute top-3 right-3 text-white text-xl z-20"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-4">
                <h2 className="text-xl font-bold">
                  {selectedMovie.title || selectedMovie.name}
                </h2>

                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!selectedMovie) return;
                      router.push(`/watch/${selectedMovie.id}`);
                    }}
                    className="bg-white text-black px-3 py-1 rounded"
                  >
                    ▶ Play
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        if (isInList) {
                          await removeFromMyList(selectedMovie.id);

                          // update the local state removed button
                          setMyListIds((prev) =>
                            prev.filter((id) => id !== selectedMovie.id),
                          );

                          setToast("Removed from My List");
                          setTimeout(() => setToast(null), 2000);
                        } else {
                          await addToMyList(selectedMovie.id);

                          // update the local state added button
                          setMyListIds((prev) =>
                            prev.includes(selectedMovie.id)
                              ? prev
                              : [...prev, selectedMovie.id],
                          );

                          setToast("Added to My List");
                          setTimeout(() => setToast(null), 2000);
                        }
                      } catch (err) {
                        console.error(err);
                        setToast("Failed to update My List");
                        setTimeout(() => setToast(null), 2000);
                      }
                    }}
                    className="bg-gray-700 px-3 py-1 rounded"
                  >
                    {isInList ? "✔ Added" : "+ My List"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 text-sm text-gray-300">
              {selectedMovie.overview}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
