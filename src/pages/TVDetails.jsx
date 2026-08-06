import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

import Layout from "../components/layout/Layout";
import Loading from "../components/common/Loading";
import HorizontalScroll from "../components/common/HorizontalScroll";
import MovieCard from "../components/cards/MovieCard";
import CastCard from "../components/common/CastCard";
import EpisodeList from "../components/tv/EpisodeList";
import useDocumentTitle from "../hooks/useDocumentTitle";

import {
  getTV,
  getTVCredits,
  getTVRecommendations,
} from "../services/tmdb";

import { useFavorites } from "../context/FavoritesContext";


const IMG =
  "https://image.tmdb.org/t/p/";

const PLACEHOLDER =
  "https://placehold.co/1920x1080/09090b/ffffff?text=StreamFlix";



export default function TVDetails() {

  const { id } = useParams();


  const [show, setShow] =
    useState(null);

  const [cast, setCast] =
    useState([]);

  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useDocumentTitle(show?.name || "TV Show");

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();




  useEffect(() => {

    async function load() {

      try {

        const [
          tvRes,
          castRes,
          recRes,
        ] = await Promise.all([

          getTV(id),

          getTVCredits(id),

          getTVRecommendations(id),

        ]);



        setShow(tvRes.data);

        setCast(
          castRes.data.cast.slice(0,10)
        );

        setRecommendations(
          recRes.data.results
        );


      } catch(error) {

        console.error(error);

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
            show.backdrop_path
            ? `${IMG}original${show.backdrop_path}`
            : PLACEHOLDER
          }

          alt={show.name}

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
              show.poster_path
              ? `${IMG}w500${show.poster_path}`
              : "https://placehold.co/500x750"
            }

            alt={show.name}

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

                {show.name}

              </h1>



              <button

                onClick={() =>
                  toggleFavorite({
                    ...show,
                    media_type:"tv",
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
                    isFavorite(show.id)
                    ? "#ef4444"
                    : "none"
                  }

                  color={
                    isFavorite(show.id)
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
                ⭐ {show.vote_average.toFixed(1)}
              </span>


              <span>
                📅 {show.first_air_date}
              </span>


              <span>
                📺 {show.number_of_seasons} Seasons
              </span>


              <span>
                🎬 {show.number_of_episodes} Episodes
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

              {show.genres.map(g => (

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

              {show.overview}

            </p>




            <Link

              to={`/watch/tv/${show.id}/1/1`}

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

              ▶ Start Watching

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


        <EpisodeList

          tvId={show.id}

          seasons={show.seasons}

        />





        <h2 className="mt-16 mb-6 text-3xl font-bold">
          Cast
        </h2>


        <HorizontalScroll>

          {cast.map(person => (

            <CastCard

              key={person.id}

              person={person}

            />

          ))}

        </HorizontalScroll>





        <h2 className="mt-16 mb-6 text-3xl font-bold">
          Similar TV Shows
        </h2>




        <HorizontalScroll>

          {recommendations.map(item => (

            <MovieCard

              key={item.id}

              item={{
                ...item,
                media_type:"tv",
              }}

            />

          ))}

        </HorizontalScroll>



      </div>



    </Layout>

  );

}