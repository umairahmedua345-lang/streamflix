import { useEffect, useState } from "react";
import {
  Search as SearchIcon,
  X,
  Film,
  Tv,
} from "lucide-react";


import Layout from "../components/layout/Layout";
import MovieCard from "../components/cards/MovieCard";
import Loading from "../components/common/Loading";


import { searchMedia } from "../services/tmdb";




export default function Search() {



  const [query,setQuery] =
    useState("");



  const [results,setResults] =
    useState([]);



  const [loading,setLoading] =
    useState(false);



  const [filter,setFilter] =
    useState("all");






  useEffect(()=>{


    const timer =
      setTimeout(async()=>{


        if(!query.trim()){


          setResults([]);

          return;


        }




        try{


          setLoading(true);



          const res =
            await searchMedia(query);



          const filtered =
            res.data.results.filter(
              item =>
                item.media_type === "movie" ||
                item.media_type === "tv"
            );



          setResults(filtered);



        }

        catch(error){


          console.error(error);


        }


        finally{


          setLoading(false);


        }



      },600);





      return () =>
        clearTimeout(timer);



  },[query]);







  const displayedResults =

    filter === "all"

    ? results

    : results.filter(
        item =>
          item.media_type === filter
      );







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
            text-4xl
            font-black
            md:text-5xl
          "

        >

          Search Movies & TV Shows

        </h1>







        <p
          className="
            mt-3
            text-zinc-400
          "
        >

          Find your favourite movies and series

        </p>









        <div

          className="
            relative
            mt-8
            max-w-3xl
          "

        >



          <SearchIcon

            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-zinc-400
            "

          />






          <input


            value={query}


            onChange={(e)=>
              setQuery(e.target.value)
            }


            placeholder="Search..."



            className="

              w-full

              rounded-2xl

              border

              border-zinc-800

              bg-zinc-900

              py-5

              pl-14

              pr-14

              text-lg

              outline-none

              transition

              focus:border-red-600

            "


          />







          {query && (

            <button

              onClick={()=>{
                setQuery("");
                setResults([]);
              }}

              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                text-zinc-400
                hover:text-white
              "

            >

              <X size={22}/>


            </button>


          )}






        </div>









        <div

          className="
            mt-8
            flex
            gap-3
          "

        >



          <button

            onClick={()=>
              setFilter("all")
            }

            className={`
              rounded-full
              px-5
              py-2
              ${
                filter==="all"
                ? "bg-red-600"
                : "bg-zinc-800"
              }
            `}

          >

            All

          </button>





          <button

            onClick={()=>
              setFilter("movie")
            }


            className={`
              flex
              items-center
              gap-2
              rounded-full
              px-5
              py-2
              ${
                filter==="movie"
                ? "bg-red-600"
                : "bg-zinc-800"
              }
            `}


          >

            <Film size={16}/>

            Movies


          </button>






          <button

            onClick={()=>
              setFilter("tv")
            }


            className={`
              flex
              items-center
              gap-2
              rounded-full
              px-5
              py-2
              ${
                filter==="tv"
                ? "bg-red-600"
                : "bg-zinc-800"
              }
            `}


          >

            <Tv size={16}/>

            TV


          </button>




        </div>









        {loading && (

          <div className="mt-10">

            <Loading />

          </div>

        )}









        {!loading &&
        displayedResults.length > 0 && (

          <>

            <h2

              className="
                mt-12
                mb-6
                text-2xl
                font-bold
              "

            >

              {displayedResults.length}
              {" "}
              Results Found

            </h2>





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


              {displayedResults.map(item=>(


                <MovieCard

                  key={`${item.media_type}-${item.id}`}

                  item={item}

                />


              ))}



            </div>


          </>


        )}









        {!loading &&
        query &&
        displayedResults.length===0 && (


          <div

            className="
              py-24
              text-center
              text-xl
              text-zinc-400
            "

          >

            No movies or shows found

          </div>


        )}






      </div>




    </Layout>


  );

}