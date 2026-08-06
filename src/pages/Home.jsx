import { useEffect, useState } from "react";

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



export default function Home() {


  useDocumentTitle("Home");



  const [loading,setLoading] =
    useState(true);



  const [hero,setHero] =
    useState(null);



  const [trending,setTrending] =
    useState([]);



  const [movies,setMovies] =
    useState([]);



  const [tvShows,setTVShows] =
    useState([]);





  useEffect(()=>{


    async function loadData(){


      try {


        const [
          trend,
          movie,
          tv,
        ] =
        await Promise.all([

          getTrending(),

          getPopularMovies(),

          getPopularTV(),

        ]);






        const trendingData =
          trend.data.results
          .filter(
            item =>
              item.backdrop_path
          )
          .slice(0,20);




        const movieData =
          movie.data.results
          .filter(
            item =>
              item.poster_path
          )
          .slice(0,20);




        const tvData =
          tv.data.results
          .filter(
            item =>
              item.poster_path
          )
          .slice(0,20);





        setTrending(
          trendingData
        );


        setMovies(
          movieData
        );


        setTVShows(
          tvData
        );






        // choose highest rated hero

        const heroContent =
          [
            ...movieData,
            ...tvData,
          ]
          .sort(
            (a,b)=>
              b.vote_average -
              a.vote_average
          );



        setHero(
          heroContent[0]
        );



      }

      catch(error){


        console.error(
          "Home Error:",
          error
        );


      }

      finally{


        setLoading(false);


      }


    }



    loadData();



  },[]);







  if(loading){


    return (

      <Layout>

        <Loading />

      </Layout>

    );


  }







  return (

    <Layout>


      <Hero movie={hero}/>






      <main
        className="
          mx-auto
          max-w-7xl
          px-6
          py-12
        "
      >






        <Section title="🔥 Trending Now">


          <HorizontalScroll>


            {trending.map(item=>(


              <MovieCard

                key={`${item.media_type}-${item.id}`}

                item={item}

              />


            ))}


          </HorizontalScroll>


        </Section>









        <Section title="🎬 Popular Movies">


          <HorizontalScroll>


            {movies.map(item=>(


              <MovieCard

                key={item.id}

                item={{
                  ...item,
                  media_type:"movie",
                }}

              />


            ))}


          </HorizontalScroll>


        </Section>









        <Section title="📺 Popular TV Shows">


          <HorizontalScroll>


            {tvShows.map(item=>(


              <MovieCard

                key={item.id}

                item={{
                  ...item,
                  media_type:"tv",
                }}

              />


            ))}


          </HorizontalScroll>


        </Section>









        <Section title="⭐ Top Picks For You">


          <HorizontalScroll>


            {[

              ...movies,

              ...tvShows,

            ]

            .sort(
              (a,b)=>
              b.vote_average -
              a.vote_average
            )

            .slice(0,12)

            .map(item=>(


              <MovieCard

                key={`top-${item.id}`}

                item={{
                  ...item,
                  media_type:
                    item.media_type ||
                    (
                      item.title
                      ? "movie"
                      : "tv"
                    ),
                }}

              />


            ))}



          </HorizontalScroll>


        </Section>







      </main>


    </Layout>

  );

}