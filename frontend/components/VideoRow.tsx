"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "@/lib/tmdb";
import { addToMyList, removeFromMyList } from "@/lib/api";
import { getMyList } from "@/lib/api";

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
}: {
  title: string;
  endpoint: string;
}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isInList, setIsInList] = useState(false);
  const [myListIds, setMyListIds] = useState<number[]>([]);

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

  useEffect(() => {
    const loadMyList = async () => {
      try {
        const data = await getMyList();
        setMyListIds(data.map((item: any) => item.movieId));
      } catch (err) {
        console.error(err);
      }
    };

    loadMyList();
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      setIsInList(myListIds.includes(selectedMovie.id));
    }
  }, [selectedMovie, myListIds]);

  return (
    <div className="px-10">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <div className="relative overflow-visible">
        <div className="flex gap-4 overflow-x-scroll scrollbar-hide">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative min-w-[160px] cursor-pointer"
              onClick={() => setSelectedMovie(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="rounded"
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
              <img
                src={
                  selectedMovie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
                    : `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                }
                className="w-full h-full object-cover"
              />

              <button
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
                  <button className="bg-white text-black px-3 py-1 rounded">
                    ▶ Play
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        if (isInList) {
                          await removeFromMyList(selectedMovie.id);
                          setIsInList(false);
                          alert("Removed ❌");
                        } else {
                          await addToMyList(selectedMovie.id);
                          setIsInList(true);
                          alert("Added ✅");
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Error ❌");
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
