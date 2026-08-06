import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getTVSeason,
} from "../../services/tmdb";



const IMAGE =
  "https://image.tmdb.org/t/p/w300";



export default function EpisodeList({
  tvId,
  seasons = [],
}) {


  const [selectedSeason, setSelectedSeason] =
    useState(1);


  const [episodes, setEpisodes] =
    useState([]);


  const [loading, setLoading] =
    useState(false);




  useEffect(() => {


    async function loadEpisodes() {


      try {


        setLoading(true);



        const res =
          await getTVSeason(
            tvId,
            selectedSeason
          );



        setEpisodes(
          res.data.episodes || []
        );



      } catch(error) {


        console.error(error);


      } finally {


        setLoading(false);


      }


    }



    loadEpisodes();



  },[
    tvId,
    selectedSeason
  ]);






  return (

    <section>


      <div
        className="
          mb-8
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
        "
      >


        <h2
          className="
            text-3xl
            font-black
          "
        >

          Episodes

        </h2>





        <select

          value={selectedSeason}

          onChange={(e)=>
            setSelectedSeason(
              Number(e.target.value)
            )
          }

          className="
            rounded-lg
            bg-zinc-900
            px-5
            py-3
            outline-none
          "

        >


          {seasons
            .filter(
              season =>
                season.season_number !== 0
            )
            .map(season => (


              <option

                key={
                  season.id
                }

                value={
                  season.season_number
                }

              >

                Season {season.season_number}

              </option>


            ))}



        </select>



      </div>






      {loading ? (


        <p className="text-zinc-400">
          Loading episodes...
        </p>



      ) : (



        <div
          className="
            grid
            gap-5
            md:grid-cols-2
          "
        >



          {episodes.map((episode)=>(



            <Link

              key={episode.id}

              to={
                `/watch/tv/${tvId}/${selectedSeason}/${episode.episode_number}`
              }

              className="
                group
                flex
                gap-5
                rounded-xl
                bg-zinc-900
                p-4
                transition
                hover:bg-zinc-800
              "

            >



              <img

                src={
                  episode.still_path
                  ? `${IMAGE}${episode.still_path}`
                  : "https://placehold.co/300x170/18181b/ffffff?text=Episode"
                }

                className="
                  h-28
                  w-44
                  rounded-lg
                  object-cover
                "

              />





              <div>


                <h3
                  className="
                    font-bold
                    group-hover:text-red-500
                  "
                >

                  {episode.episode_number}.
                  {" "}
                  {episode.name}

                </h3>




                <p
                  className="
                    mt-2
                    line-clamp-3
                    text-sm
                    text-zinc-400
                  "
                >

                  {episode.overview ||
                    "No description available."
                  }

                </p>



              </div>



            </Link>


          ))}


        </div>



      )}



    </section>

  );

}