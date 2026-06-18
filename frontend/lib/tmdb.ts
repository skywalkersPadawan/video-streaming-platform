const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export type Movie = {
  id: number;
  poster_path: string | null;
  backdrop_path?: string | null;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  runtime?: number;
};

export const fetchMovies = async (endpoint: string): Promise<Movie[]> => {
  const url = endpoint.includes("?")
    ? `${BASE_URL}${endpoint}&api_key=${API_KEY}`
    : `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.results ?? [];
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.json();
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await res.json();
  return data.results ?? [];
};

export type TmdbVideo = {
  type: string;
  site: string;
  key: string;
};

export const fetchMovieVideos = async (
  movieId: number,
): Promise<TmdbVideo[]> => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  );
  const data = await res.json();
  return data.results ?? [];
};

export const fetchMovieTrailerKey = async (
  movieId: number,
): Promise<string | null> => {
  const videos = await fetchMovieVideos(movieId);
  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );
  return trailer?.key ?? null;
};
