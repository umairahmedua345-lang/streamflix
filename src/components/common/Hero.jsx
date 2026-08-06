import { Link } from "react-router-dom";


const BACKDROP =
  "https://image.tmdb.org/t/p/original";


const PLACEHOLDER =
  "https://placehold.co/1920x1080/09090b/ffffff?text=StreamFlix";




export default function Hero({
  movie,
}) {



  if (!movie) return null;




  const title =
    movie.title ||
    movie.name;



  const description =
    movie.overview ||
    "Watch the latest movies and TV shows in high quality.";





  const mediaType =
    movie.media_type ||
    (
      movie.first_air_date
        ? "tv"
        : "movie"
    );





  const detailsLink =
    mediaType === "tv"
      ? `/tv/${movie.id}`
      : `/movie/${movie.id}`;






  return (


    <section
      className="
        relative
        h-[80vh]
        overflow-hidden
        md:h-[85vh]
      "
    >




      <img

        src={
          movie.backdrop_path
            ? `${BACKDROP}${movie.backdrop_path}`
            : PLACEHOLDER
        }

        alt={title}

        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition
          duration-1000
          scale-105
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
          via-transparent
          to-transparent
        "
      />






      <div
        className="
          relative
          mx-auto
          flex
          h-full
          max-w-7xl
          items-center
          px-6
        "
      >




        <div
          className="
            max-w-3xl
            animate-[fadeIn_1s_ease]
          "
        >






          <div
            className="
              mb-5
              flex
              flex-wrap
              gap-3
            "
          >



            <span
              className="
                rounded-full
                bg-red-600
                px-4
                py-1
                text-sm
                font-bold
              "
            >

              {
                mediaType === "tv"
                ? "TV SERIES"
                : "MOVIE"
              }

            </span>





            {movie.vote_average && (

              <span
                className="
                  rounded-full
                  bg-black/60
                  px-4
                  py-1
                  text-sm
                  text-yellow-400
                  backdrop-blur
                "
              >

                ⭐ {movie.vote_average.toFixed(1)}

              </span>

            )}



          </div>








          <h1
            className="
              text-4xl
              font-black
              leading-tight
              md:text-7xl
            "
          >

            {title}

          </h1>







          <div
            className="
              mt-5
              flex
              gap-5
              text-zinc-300
            "
          >


            {
              movie.release_date &&
              <span>
                📅 {movie.release_date}
              </span>
            }



            {
              movie.first_air_date &&
              <span>
                📅 {movie.first_air_date}
              </span>
            }


          </div>







          <p
            className="
              mt-7
              line-clamp-3
              text-lg
              leading-8
              text-zinc-300
            "
          >

            {description}

          </p>







          <div
            className="
              mt-9
              flex
              flex-wrap
              gap-4
            "
          >



            <Link

              to={detailsLink}

              className="
                rounded-lg
                bg-red-600
                px-8
                py-4
                font-bold
                transition
                hover:scale-105
                hover:bg-red-700
              "

            >

              ▶ Watch Now

            </Link>






            <Link

              to={detailsLink}

              className="
                rounded-lg
                bg-white/10
                px-8
                py-4
                font-bold
                backdrop-blur
                transition
                hover:bg-white/20
              "

            >

              More Info

            </Link>




          </div>





        </div>





      </div>





    </section>


  );

}