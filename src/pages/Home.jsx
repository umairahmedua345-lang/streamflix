import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Hero from "../components/common/Hero";
import Loading from "../components/common/Loading";
import Section from "../components/common/Section";
import HorizontalScroll from "../components/common/HorizontalScroll";
import MovieCard from "../components/cards/MovieCard";

import useDocumentTitle from "../hooks/useDocumentTitle";

import {
  getTrending,
  getPopularMovies,
  getPopularTV,
} from "../services/tmdb";

import articles from "../data/articles";


export default function Home() {

  useDocumentTitle("Home");


  const [loading, setLoading] = useState(true);

  const [hero, setHero] = useState(null);

  const [trending, setTrending] = useState([]);

  const [movies, setMovies] = useState([]);

  const [tvShows, setTVShows] = useState([]);



  useEffect(() => {

    async function loadData() {

      try {

        const [
          trend,
          movie,
          tv,
        ] = await Promise.all([

          getTrending(),

          getPopularMovies(),

          getPopularTV(),

        ]);


        const trendingData =
          trend.data.results.filter(
            (item) => item.backdrop_path
          );


        const movieData =
          movie.data.results.filter(
            (item) => item.poster_path
          );


        const tvData =
          tv.data.results.filter(
            (item) => item.poster_path
          );


        setTrending(trendingData);

        setMovies(movieData);

        setTVShows(tvData);


        const heroList = [
          ...movieData,
          ...tvData,
        ];


        if (heroList.length > 0) {

          const randomHero =
            heroList[
              Math.floor(
                Math.random() * heroList.length
              )
            ];

          setHero(randomHero);

        }


      } catch (error) {

        console.error(
          "Home page error:",
          error
        );

      } finally {

        setLoading(false);

      }

    }


    loadData();

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


      {/* Hero */}

      <Hero movie={hero} />



      <div className="mx-auto max-w-7xl px-6 py-12">


        {/* Trending */}

        <Section title="🔥 Trending Now">

          <HorizontalScroll>

            {trending.map((item) => (

              <MovieCard
                key={`${item.media_type}-${item.id}`}
                item={item}
              />

            ))}

          </HorizontalScroll>

        </Section>



        {/* Popular Movies */}

        <Section title="🎬 Popular Movies">

          <HorizontalScroll>

            {movies.map((item) => (

              <MovieCard
                key={item.id}
                item={{
                  ...item,
                  media_type: "movie",
                }}
              />

            ))}

          </HorizontalScroll>

        </Section>



        {/* TV Shows */}

        <Section title="📺 Trending TV Shows">

          <HorizontalScroll>

            {tvShows.map((item) => (

              <MovieCard
                key={item.id}
                item={{
                  ...item,
                  media_type: "tv",
                }}
              />

            ))}

          </HorizontalScroll>

        </Section>



        {/* Recommended */}

        <Section title="⭐ Recommended For You">

          <HorizontalScroll>

            {[
              ...movies.slice(0, 5),
              ...tvShows.slice(0, 5),
            ].map((item) => (

              <MovieCard
                key={`recommended-${item.id}`}
                item={{
                  ...item,
                  media_type:
                    item.media_type ||
                    (item.first_air_date
                      ? "tv"
                      : "movie"),
                }}
              />

            ))}

          </HorizontalScroll>

        </Section>



        {/* Latest Blog */}

        {articles.length > 0 && (

          <section className="mt-16">


            <div className="
              mb-7
              flex
              items-center
              justify-between
            ">

              <div>

                <span className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                  text-red-500
                ">
                  StreamFlix Editorial
                </span>

                <h2 className="
                  mt-1
                  text-2xl
                  font-bold
                  md:text-3xl
                ">
                  Latest from the Blog
                </h2>

              </div>


              <Link
                to="/blog"
                className="
                  text-sm
                  font-semibold
                  text-zinc-400
                  transition
                  hover:text-red-500
                "
              >
                View All →
              </Link>

            </div>



            <div className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            ">


              {articles
                .slice(0, 3)
                .map((article) => (

                  <Link
                    key={article.id}
                    to={`/blog/${article.id}`}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-zinc-800
                      bg-zinc-900
                      transition
                      duration-300
                      hover:-translate-y-1
                      hover:border-zinc-700
                    "
                  >


                    <div className="
                      relative
                      aspect-video
                      overflow-hidden
                    ">

                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <div className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-transparent
                        to-transparent
                      " />


                      <span className="
                        absolute
                        bottom-4
                        left-4
                        rounded-full
                        bg-black/70
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        backdrop-blur
                      ">
                        {article.category}
                      </span>

                    </div>



                    <div className="p-6">

                      <div className="
                        mb-3
                        text-xs
                        text-zinc-500
                      ">
                        {article.date}
                        {" • "}
                        {article.readTime}
                      </div>


                      <h3 className="
                        text-xl
                        font-bold
                        leading-snug
                        transition
                        group-hover:text-red-500
                      ">
                        {article.title}
                      </h3>


                      <p className="
                        mt-3
                        line-clamp-2
                        text-sm
                        leading-6
                        text-zinc-400
                      ">
                        {article.excerpt}
                      </p>


                      <div className="
                        mt-5
                        font-semibold
                        text-zinc-300
                        transition
                        group-hover:text-red-500
                      ">
                        Read Article →
                      </div>

                    </div>

                  </Link>

                ))}

            </div>

          </section>

        )}

      </div>

    </Layout>

  );

}