import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../components/layout/Layout";
import PeachifyPlayer from "../components/player/PeachifyPlayer";

import {
  getTV,
} from "../services/tmdb";

import api from "../services/tmdb";


const IMAGE =
  "https://image.tmdb.org/t/p/w500";



export default function WatchTV() {


  const {
    id,
    season,
    episode,
  } = useParams();



  const [show, setShow] =
    useState(null);


  const [episodeData, setEpisodeData] =
    useState(null);




  useEffect(() => {


    async function load() {


      try {


        const showRes =
          await getTV(id);


        setShow(showRes.data);



        const episodeRes =
          await api.get(
            `/tv/${id}/season/${season}/episode/${episode}`
          );


        setEpisodeData(
          episodeRes.data
        );



      } catch(err) {


        console.error(err);


      }


    }



    load();


  },[
    id,
    season,
    episode
  ]);






  const previousEpisode =
    Number(episode) > 1
      ? Number(episode) - 1
      : 1;




  const nextEpisode =
    Number(episode) + 1;






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

            to={`/tv/${id}`}

            className="
              text-zinc-400
              hover:text-white
            "

          >

            ← Back to Series

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

            Season {season}
            {" • "}
            Episode {episode}

          </span>



        </div>







        <h1
          className="
            text-4xl
            font-black
          "
        >

          {show?.name}

        </h1>



        <h2
          className="
            mt-3
            text-2xl
            font-bold
            text-zinc-300
          "
        >

          {episodeData?.name ||
            `Episode ${episode}`}

        </h2>







        <div
          className="
            mt-8
            overflow-hidden
            rounded-2xl
            bg-black
            shadow-2xl
          "
        >


          <PeachifyPlayer

            src={
              `https://peachify.pro/embed/tv/${id}/${season}/${episode}`
            }

          />


        </div>







        {episodeData && (

          <div
            className="
              mt-8
              grid
              gap-8
              md:grid-cols-3
            "
          >



            <img

              src={
                episodeData.still_path
                ? `${IMAGE}${episodeData.still_path}`
                : "https://placehold.co/500x280"
              }

              className="
                rounded-xl
              "

              alt="episode"

            />




            <div
              className="
                md:col-span-2
              "
            >



              <div
                className="
                  flex
                  flex-wrap
                  gap-5
                  text-zinc-400
                "
              >

                <span>
                  ⭐ {episodeData.vote_average?.toFixed(1) || "N/A"}
                </span>


                <span>
                  📅 {episodeData.air_date || "Unknown"}
                </span>


                <span>
                  ⏱ {episodeData.runtime || "--"} min
                </span>


              </div>





              <p
                className="
                  mt-5
                  leading-8
                  text-zinc-300
                "
              >

                {episodeData.overview ||
                  "No description available."}

              </p>



            </div>



          </div>


        )}








        <div
          className="
            mt-10
            flex
            justify-between
          "
        >



          <Link

            to={`/watch/tv/${id}/${season}/${previousEpisode}`}

            className="
              rounded-lg
              bg-zinc-800
              px-5
              py-3
              hover:bg-zinc-700
            "

          >

            ← Previous Episode

          </Link>





          <Link

            to={`/watch/tv/${id}/${season}/${nextEpisode}`}

            className="
              rounded-lg
              bg-red-600
              px-5
              py-3
              hover:bg-red-700
            "

          >

            Next Episode →

          </Link>



        </div>




      </div>


    </Layout>

  );

}