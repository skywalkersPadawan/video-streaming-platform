const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint: string) => {
  const url = endpoint.includes("?")
    ? `${BASE_URL}${endpoint}&api_key=${API_KEY}`
    : `${BASE_URL}${endpoint}?api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

/* test for .gitignore */
