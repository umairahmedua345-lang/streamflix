import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import Hero from "../components/common/Hero";
import Loading from "../components/common/Loading";
import Section from "../components/common/Section";
import HorizontalScroll from "../components/common/HorizontalScroll";
import MovieCard from "../components/cards/MovieCard";

import {
  getTrending,
  getPopularMovies,
  getPopularTV,
} from "../services/tmdb";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [hero, setHero] = useState(null);
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [trend, movie, tv] = await Promise.all([
          getTrending(),
          getPopularMovies(),
          getPopularTV(),
        ]);

        setTrending(trend.data.results);
        setMovies(movie.data.results);
        setTVShows(tv.data.results);

        const random =
          movie.data.results[
            Math.floor(Math.random() * movie.data.results.length)
          ];

        setHero(random);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Hero movie={hero} />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <Section title="🔥 Trending">
          <HorizontalScroll>
            {trending.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </HorizontalScroll>
        </Section>

        <Section title="🎬 Popular Movies">
          <HorizontalScroll>
            {movies.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </HorizontalScroll>
        </Section>

        <Section title="📺 Popular TV">
          <HorizontalScroll>
            {tvShows.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </HorizontalScroll>
        </Section>

      </div>
    </Layout>
  );
}