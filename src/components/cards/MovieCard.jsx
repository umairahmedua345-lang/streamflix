import { Link } from "react-router-dom";
import { Heart, Play } from "lucide-react";

import { useFavorites } from "../../context/FavoritesContext";
import { useContinueWatching } from "../../context/ContinueWatchingContext";
import LazyImage from "../common/LazyImage";


const IMAGE =
  "https://image.tmdb.org/t/p/w500";


const PLACEHOLDER =
  "https://placehold.co/500x750/09090b/ffffff?text=No+Poster";




export default function MovieCard({
  item,
}) {



  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();




  const {
    continueWatching,
  } = useContinueWatching();






  const title =
    item.title ||
    item.name ||
    "Unknown";





  const type =
    item.media_type ||
    (
      item.first_air_date
        ? "tv"
        : "movie"
    );





  const poster =
    item.poster_path

      ? `${IMAGE}${item.poster_path}`

      : PLACEHOLDER;






  const detailsPage =
    type === "tv"

      ? `/tv/${item.id}`

      : `/movie/${item.id}`;






  const watchPage =
    type === "tv"

      ? `/watch/tv/${item.id}/1/1`

      : `/watch/movie/${item.id}`;








  const progress =
    continueWatching[item.id]
      ?.progress;





  const percent =
    progress

      ? Math.min(
          (
            progress.watched /
            progress.duration
          ) * 100,
          100
        )

      : 0;







  return (



    <div

      className="
        group
        relative
        min-w-[180px]
        cursor-pointer
        transition
        duration-300
        hover:z-20
        md:min-w-[200px]
      "

    >






      <div

        className="
          relative
          overflow-hidden
          rounded-xl
          bg-zinc-900
          shadow-lg
        "

      >







        <Link

          to={detailsPage}

        >



          <LazyImage

            src={poster}

            alt={title}

            className="
              h-[270px]
              w-[180px]
              object-cover
              transition
              duration-500
              group-hover:scale-110
              md:h-[300px]
              md:w-[200px]
            "

          />


        </Link>









        {/* Hover play overlay */}

        <div

          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/0
            transition
            duration-300
            group-hover:bg-black/50
          "

        >




          <Link

            to={watchPage}

            onClick={(e)=>
              e.stopPropagation()
            }


            className="
              pointer-events-auto
              scale-0
              rounded-full
              bg-red-600
              p-4
              transition
              duration-300
              group-hover:scale-100
            "

          >

            <Play
              size={25}
              fill="white"
            />

          </Link>




        </div>









        {/* Favorite button */}

        <button

          onClick={() =>
            toggleFavorite({
              ...item,
              media_type:type,
            })
          }


          className="
            absolute
            right-3
            top-3
            z-10
            rounded-full
            bg-black/70
            p-2
            backdrop-blur
            transition
            hover:bg-black
          "

        >



          <Heart

            size={18}

            fill={
              isFavorite(item.id)
                ? "#ef4444"
                : "transparent"
            }


            color={
              isFavorite(item.id)
                ? "#ef4444"
                : "white"
            }

          />



        </button>








        {type === "tv" && (

          <span

            className="
              absolute
              bottom-3
              left-3
              z-10
              rounded-full
              bg-black/70
              px-3
              py-1
              text-xs
              font-semibold
            "

          >

            SERIES

          </span>


        )}



      </div>









      <div className="mt-3">



        <h3

          className="
            line-clamp-1
            font-semibold
            group-hover:text-red-500
          "

        >

          {title}


        </h3>







        <div

          className="
            mt-1
            flex
            items-center
            justify-between
            text-sm
            text-zinc-400
          "

        >



          <span>

            ⭐ {
              item.vote_average
                ? item.vote_average.toFixed(1)
                : "N/A"
            }

          </span>





          {
            type === "movie" && (

              <span>
                Movie
              </span>

            )
          }



        </div>








        {progress && (

          <div

            className="
              mt-3
              h-1.5
              overflow-hidden
              rounded-full
              bg-zinc-800
            "

          >


            <div

              className="
                h-full
                bg-red-600
              "

              style={{
                width:`${percent}%`
              }}

            />


          </div>

        )}



      </div>





    </div>


  );

}