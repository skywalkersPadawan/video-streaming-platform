export type Genre = {
  id: number;
  name: string;
  gradient: string;
};

export const MOVIE_GENRES: Genre[] = [
  { id: 28, name: "Action", gradient: "from-red-900 to-orange-800" },
  { id: 12, name: "Adventure", gradient: "from-emerald-900 to-teal-800" },
  { id: 16, name: "Animation", gradient: "from-purple-900 to-pink-800" },
  { id: 35, name: "Comedy", gradient: "from-yellow-800 to-amber-700" },
  { id: 80, name: "Crime", gradient: "from-zinc-800 to-zinc-600" },
  { id: 18, name: "Drama", gradient: "from-blue-900 to-indigo-800" },
  { id: 10751, name: "Family", gradient: "from-sky-800 to-cyan-700" },
  { id: 14, name: "Fantasy", gradient: "from-violet-900 to-fuchsia-800" },
  { id: 27, name: "Horror", gradient: "from-black to-red-950" },
  { id: 878, name: "Sci-Fi", gradient: "from-cyan-900 to-blue-900" },
  { id: 53, name: "Thriller", gradient: "from-stone-800 to-neutral-900" },
  { id: 10749, name: "Romance", gradient: "from-rose-900 to-red-800" },
];

export function getGenreById(id: number): Genre | undefined {
  return MOVIE_GENRES.find((g) => g.id === id);
}
