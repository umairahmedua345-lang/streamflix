import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Loading from "../components/common/Loading";
import HorizontalScroll from "../components/common/HorizontalScroll";
import MovieCard from "../components/cards/MovieCard";
import CastCard from "../components/common/CastCard";

import {
  getMovie,
  getMovieCredits,
  getMovieRecommendations,
} from "../services/tmdb";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [movieRes, castRes, recRes] = await Promise.all([
          getMovie(id),
          getMovieCredits(id),
          getMovieRecommendations(id),
        ]);

        setMovie(movieRes.data);
        setCast(castRes.data.cast.slice(0, 10));
        setRecommendations(recRes.data.results);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <div className="relative h-[70vh]">

        <img
          src={`${BACKDROP}${movie.backdrop_path}`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto h-full px-6 flex items-center gap-10">

          <img
            src={`${POSTER}${movie.poster_path}`}
            className="hidden md:block w-72 rounded-xl shadow-2xl"
          />

          <div>

            <h1 className="text-5xl font-black">
              {movie.title}
            </h1>

            <p className="mt-3 text-zinc-300">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">

              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-zinc-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}

            </div>

            <p className="mt-6 max-w-2xl text-zinc-300">
              {movie.overview}
            </p>

            <Link
              to={`/watch/movie/${movie.id}`}
              className="inline-block mt-8 bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-lg font-semibold"
            >
              ▶ Watch Now
            </Link>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-6">
          Cast
        </h2>

        <HorizontalScroll>

          {cast.map((person) => (
            <CastCard
              key={person.cast_id}
              person={person}
            />
          ))}

        </HorizontalScroll>

        <h2 className="text-3xl font-bold mt-16 mb-6">
          Similar Movies
        </h2>

        <HorizontalScroll>

          {recommendations.map((movie) => (
            <MovieCard
              key={movie.id}
              item={movie}
            />
          ))}

        </HorizontalScroll>

      </div>

    </Layout>
  );
}