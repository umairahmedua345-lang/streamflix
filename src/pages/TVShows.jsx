import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import Loading from "../components/common/Loading";
import MovieCard from "../components/cards/MovieCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

import {
  getPopularTV,
  getTrending,
} from "../services/tmdb";


export default function TVShows() {

  useDocumentTitle("TV Shows");

  const [shows, setShows] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadShows() {

      try {

        const [popularResponse, trendingResponse] =
          await Promise.all([
            getPopularTV(),
            getTrending(),
          ]);


        const popularShows =
          popularResponse?.data?.results
            ?.filter((item) => item.poster_path)
            ?.map((item) => ({
              ...item,
              media_type: "tv",
            })) || [];


        const trendingShows =
          trendingResponse?.data?.results
            ?.filter(
              (item) =>
                item.media_type === "tv" &&
                item.poster_path
            ) || [];


        setShows(popularShows);
        setTrending(trendingShows);

      } catch (error) {

        console.error("TV Shows page error:", error);

      } finally {

        setLoading(false);

      }

    }


    loadShows();

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
            TV Shows
          </h1>

          <p className="
            mt-4
            max-w-2xl
            text-zinc-400
          ">
            Explore popular and trending TV shows
            available on StreamFlix.
          </p>

        </div>


        {/* Trending TV */}

        {trending.length > 0 && (

          <section className="mb-14">

            <h2 className="
              mb-6
              text-2xl
              font-bold
            ">
              🔥 Trending TV Shows
            </h2>


            <div className="
              grid
              grid-cols-2
              gap-5
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            ">

              {trending.map((show) => (

                <MovieCard
                  key={`trending-${show.id}`}
                  item={show}
                />

              ))}

            </div>

          </section>

        )}


        {/* Popular TV */}

        <section>

          <h2 className="
            mb-6
            text-2xl
            font-bold
          ">
            📺 Popular TV Shows
          </h2>


          {shows.length > 0 ? (

            <div className="
              grid
              grid-cols-2
              gap-5
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            ">

              {shows.map((show) => (

                <MovieCard
                  key={show.id}
                  item={show}
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
              No TV shows found.
            </div>

          )}

        </section>

      </main>

    </Layout>

  );
}