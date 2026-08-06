import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

import Layout from "../components/layout/Layout";
import Loading from "../components/common/Loading";
import HorizontalScroll from "../components/common/HorizontalScroll";
import MovieCard from "../components/cards/MovieCard";
import CastCard from "../components/common/CastCard";
import useDocumentTitle from "../hooks/useDocumentTitle";

import {
  getMovie,
  getMovieCredits,
  getMovieRecommendations,
} from "../services/tmdb";

import { useFavorites } from "../context/FavoritesContext";


const IMG =
  "https://image.tmdb.org/t/p/";

const PLACEHOLDER =
  "https://placehold.co/1920x1080/09090b/ffffff?text=StreamFlix";



export default function MovieDetails() {

  const { id } = useParams();


  const [movie, setMovie] =
    useState(null);

  const [cast, setCast] =
    useState([]);

  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useDocumentTitle(movie?.title || "Movie");

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();



  useEffect(() => {

    async function load() {

      try {

        const [
          movieRes,
          castRes,
          recRes,
        ] = await Promise.all([

          getMovie(id),

          getMovieCredits(id),

          getMovieRecommendations(id),

        ]);



        setMovie(movieRes.data);

        setCast(
          castRes.data.cast.slice(0,10)
        );

        setRecommendations(
          recRes.data.results
        );


      } finally {

        setLoading(false);

      }

    }


    load();

  },[id]);




  if(loading)

    return (
      <Layout>
        <Loading/>
      </Layout>
    );



  return (

    <Layout>


      <section
        className="
          relative
          min-h-[85vh]
          overflow-hidden
        "
      >


        <img

          src={
            movie.backdrop_path
            ? `${IMG}original${movie.backdrop_path}`
            : PLACEHOLDER
          }

          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "

        />



        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black
            via-black/80
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-zinc-950
            to-transparent
          "
        />





        <div
          className="
            relative
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-10
            px-6
            py-16
            md:flex-row
            md:items-center
          "
        >


          <img

            src={
              movie.poster_path
              ? `${IMG}w500${movie.poster_path}`
              : "https://placehold.co/500x750"
            }

            className="
              w-72
              rounded-2xl
              shadow-2xl
            "

          />





          <div className="max-w-3xl">



            <div className="flex items-center gap-4">


              <h1
                className="
                  text-5xl
                  font-black
                  md:text-6xl
                "
              >

                {movie.title}

              </h1>




              <button

                onClick={() =>
                  toggleFavorite({
                    ...movie,
                    media_type:"movie",
                  })
                }

                className="
                  rounded-full
                  bg-zinc-900
                  p-3
                "

              >

                <Heart

                  fill={
                    isFavorite(movie.id)
                    ? "#ef4444"
                    : "none"
                  }

                  color={
                    isFavorite(movie.id)
                    ? "#ef4444"
                    : "white"
                  }

                />

              </button>


            </div>





            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-5
                text-zinc-300
              "
            >

              <span>
                ⭐ {movie.vote_average.toFixed(1)}
              </span>


              <span>
                📅 {movie.release_date}
              </span>


              <span>
                ⏱ {movie.runtime} min
              </span>


            </div>





            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-2
              "
            >

              {movie.genres.map((g)=>(

                <span

                  key={g.id}

                  className="
                    rounded-full
                    bg-zinc-800
                    px-3
                    py-1
                    text-sm
                  "

                >

                  {g.name}

                </span>

              ))}

            </div>





            <p
              className="
                mt-7
                leading-8
                text-zinc-300
              "
            >

              {movie.overview}

            </p>





            <Link

              to={`/watch/movie/${movie.id}`}

              className="
                mt-8
                inline-block
                rounded-lg
                bg-red-600
                px-10
                py-4
                font-bold
                hover:bg-red-700
              "

            >

              ▶ Watch Now

            </Link>



          </div>


        </div>


      </section>





      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-12
        "
      >


        <h2 className="mb-6 text-3xl font-bold">
          Cast
        </h2>


        <HorizontalScroll>

          {cast.map(person=>(

            <CastCard
              key={person.id}
              person={person}
            />

          ))}

        </HorizontalScroll>





        <h2 className="mt-16 mb-6 text-3xl font-bold">
          Similar Movies
        </h2>



        <HorizontalScroll>

          {recommendations.map(item=>(

            <MovieCard

              key={item.id}

              item={{
                ...item,
                media_type:"movie",
              }}

            />

          ))}

        </HorizontalScroll>



      </div>



    </Layout>

  );

}