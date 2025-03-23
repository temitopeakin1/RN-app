export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const api = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movies?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const res = await fetch(api, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  // if res is not true
  if (!res.ok) {
    // @ts-ignore
    throw new Error("Failed to fecth movies", res.statusText);
  }
  // extract the data from the response
  const data = await res.json();

  return data.results;
};
