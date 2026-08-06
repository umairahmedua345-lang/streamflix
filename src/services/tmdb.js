import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export default api;

// Home
export const getTrending = () => api.get("/trending/all/week");
export const getPopularMovies = () => api.get("/movie/popular");
export const getPopularTV = () => api.get("/tv/popular");

// Movie
export const getMovie = (id) => api.get(`/movie/${id}`);
export const getMovieCredits = (id) => api.get(`/movie/${id}/credits`);
export const getMovieRecommendations = (id) =>
  api.get(`/movie/${id}/recommendations`);

// TV
export const getTV = (id) => api.get(`/tv/${id}`);
export const getTVCredits = (id) => api.get(`/tv/${id}/credits`);
export const getTVRecommendations = (id) =>
  api.get(`/tv/${id}/recommendations`);

// Search
export const searchMedia = (query) =>
  api.get("/search/multi", {
    params: {
      query,
      include_adult: false,
    },
  });