import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../components/layout/Layout";
import PeachifyPlayer from "../components/player/PeachifyPlayer";

import { getMovie } from "../services/tmdb";


export default function WatchMovie() {


  const { id } = useParams();


  const [movie, setMovie] =
    useState(null);



  useEffect(() => {


    async function loadMovie() {


      try {


        const res =
          await getMovie(id);


        setMovie(res.data);


      } catch (err) {


        console.error(err);


      }


    }


    loadMovie();


  }, [id]);





  return (

    <Layout>


      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-10
        "
      >



        <div
          className="
            mb-8
            flex
            items-center
            justify-between
          "
        >


          <Link

            to={`/movie/${id}`}

            className="
              text-zinc-400
              transition
              hover:text-white
            "

          >

            ← Back to Details

          </Link>




          <span
            className="
              rounded-full
              bg-red-600/20
              px-4
              py-2
              text-sm
              text-red-500
            "
          >

            Movie

          </span>


        </div>






        <div className="mb-8">


          <h1
            className="
              text-4xl
              font-black
            "
          >

            {movie?.title || "Now Watching"}

          </h1>




          {movie && (

            <div
              className="
                mt-3
                flex
                gap-5
                text-zinc-400
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

          )}


        </div>






        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-black
            shadow-2xl
          "
        >

          <PeachifyPlayer

            src={
              `https://peachify.pro/embed/movie/${id}`
            }

          />

        </div>




        {movie?.overview && (

          <p
            className="
              mt-8
              max-w-4xl
              leading-8
              text-zinc-400
            "
          >

            {movie.overview}

          </p>

        )}



      </div>


    </Layout>

  );

}