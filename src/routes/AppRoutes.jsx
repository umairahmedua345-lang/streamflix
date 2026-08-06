import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import TVShows from "../pages/TVShows";
import Search from "../pages/Search";

import MovieDetails from "../pages/MovieDetails";
import TVDetails from "../pages/TVDetails";

import WatchMovie from "../pages/WatchMovie";
import WatchTV from "../pages/WatchTV";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movies" element={<Movies />} />

      <Route path="/tv" element={<TVShows />} />

      <Route path="/search" element={<Search />} />

      <Route path="/movie/:id" element={<MovieDetails />} />

      <Route path="/tv/:id" element={<TVDetails />} />

      <Route path="/watch/movie/:id" element={<WatchMovie />} />

      <Route
        path="/watch/tv/:id/:season/:episode"
        element={<WatchTV />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}