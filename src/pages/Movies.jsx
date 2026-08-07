import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import Loading from "../components/common/Loading";
import MovieCard from "../components/cards/MovieCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

import {
  getPopularMovies,
  getTrending,
} from "../services/tmdb";


export default function Movies() {

  useDocumentTitle("Movies");

  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadMovies() {

      try {

        const [popularResponse, trendingResponse] =
          await Promise.all([
            getPopularMovies(),
            getTrending(),
          ]);


        const popularMovies =
          popularResponse?.data?.results
            ?.filter((item) => item.poster_path)
            ?.map((item) => ({
              ...item,
              media_type: "movie",
            })) || [];


        const trendingMovies =
          trendingResponse?.data?.results
            ?.filter(
              (item) =>
                item.media_type === "movie" &&
                item.poster_path
            ) || [];


        setMovies(popularMovies);
        setTrending(trendingMovies);

      } catch (error) {

        console.error("Movies page error:", error);

      } finally {

        setLoading(false);

      }

    }


    loadMovies();

  }, []);


  if (loading) {

    return (
      <Layout>
        <Loading />
      </Layout>
    );

  }


  return (

    <Layout>

      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}

        <div className="mb-10">

          <span className="
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-red-500
          ">
            StreamFlix
          </span>

          <h1 className="
            mt-2
            text-4xl
            font-black
            md:text-5xl
          ">
            Movies
          </h1>

          <p className="
            mt-4
            max-w-2xl
            text-zinc-400
          ">
            Explore popular and trending movies
            available on StreamFlix.
          </p>

        </div>


        {/* Trending Movies */}

        {trending.length > 0 && (

          <section className="mb-14">

            <h2 className="
              mb-6
              text-2xl
              font-bold
            ">
              🔥 Trending Movies
            </h2>


            <div className="
              grid
              grid-cols-2
              gap-5
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            ">

              {trending.map((movie) => (

                <MovieCard
                  key={`trending-${movie.id}`}
                  item={movie}
                />

              ))}

            </div>

          </section>

        )}


        {/* Popular Movies */}

        <section>

          <h2 className="
            mb-6
            text-2xl
            font-bold
          ">
            🎬 Popular Movies
          </h2>


          {movies.length > 0 ? (

            <div className="
              grid
              grid-cols-2
              gap-5
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            ">

              {movies.map((movie) => (

                <MovieCard
                  key={movie.id}
                  item={movie}
                />

              ))}

            </div>

          ) : (

            <div className="
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              p-10
              text-center
              text-zinc-400
            ">
              No movies found.
            </div>

          )}

        </section>

      </main>

    </Layout>

  );
}