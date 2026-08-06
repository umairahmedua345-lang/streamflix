import Layout from "../components/layout/Layout";
import MovieCard from "../components/cards/MovieCard";

import { useFavorites } from "../context/FavoritesContext";



export default function Favorites() {


  const {
    favorites,
  } = useFavorites();




  return (

    <Layout>


      <div
        className="
          mx-auto
          max-w-7xl
          px-6
          py-12
        "
      >



        <h1
          className="
            mb-10
            text-5xl
            font-black
          "
        >

          My Favorites ❤️

        </h1>





        {favorites.length === 0 ? (



          <div
            className="
              flex
              min-h-[40vh]
              flex-col
              items-center
              justify-center
              rounded-2xl
              bg-zinc-900
              text-center
            "
          >


            <h2
              className="
                text-2xl
                font-bold
              "
            >

              No Favorites Yet

            </h2>



            <p
              className="
                mt-3
                text-zinc-400
              "
            >

              Add movies and TV shows to see them here.

            </p>



          </div>



        ) : (




          <div
            className="
              grid
              grid-cols-2
              gap-6
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
            "
          >


            {favorites.map(item => (


              <MovieCard

                key={`${item.media_type}-${item.id}`}

                item={item}

              />


            ))}


          </div>



        )}



      </div>



    </Layout>

  );

}