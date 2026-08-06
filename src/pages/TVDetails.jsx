import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Loading from "../components/common/Loading";
import HorizontalScroll from "../components/common/HorizontalScroll";
import MovieCard from "../components/cards/MovieCard";
import CastCard from "../components/common/CastCard";

import {
  getTV,
  getTVCredits,
  getTVRecommendations,
} from "../services/tmdb";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

export default function TVDetails() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [tvRes, castRes, recRes] = await Promise.all([
          getTV(id),
          getTVCredits(id),
          getTVRecommendations(id),
        ]);

        setShow(tvRes.data);
        setCast(castRes.data.cast.slice(0, 10));
        setRecommendations(recRes.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative h-[70vh]">
        <img
          src={`${BACKDROP}${show.backdrop_path}`}
          className="absolute inset-0 h-full w-full object-cover"
          alt={show.name}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center gap-10">
          <img
            src={`${POSTER}${show.poster_path}`}
            className="hidden md:block w-72 rounded-xl"
            alt={show.name}
          />

          <div>
            <h1 className="text-5xl font-black">
              {show.name}
            </h1>

            <p className="mt-3 text-zinc-300">
              ⭐ {show.vote_average.toFixed(1)}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-zinc-800 rounded-full px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-zinc-300">
              {show.overview}
            </p>

            <Link
              to={`/watch/tv/${show.id}/1/1`}
              className="inline-block mt-8 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition"
            >
              ▶ Watch Season 1 Episode 1
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
              key={person.id}
              person={person}
            />
          ))}
        </HorizontalScroll>

        <h2 className="text-3xl font-bold mt-16 mb-6">
          Similar TV Shows
        </h2>

        <HorizontalScroll>
          {recommendations.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
            />
          ))}
        </HorizontalScroll>
      </div>
    </Layout>
  );
}