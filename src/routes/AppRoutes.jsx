import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


import { lazy, Suspense } from "react";

import Loading from "../components/common/Loading";


const Home =
  lazy(() => import("../pages/Home"));

const MovieDetails =
  lazy(() => import("../pages/MovieDetails"));

const TVDetails =
  lazy(() => import("../pages/TVDetails"));

const WatchMovie =
  lazy(() => import("../pages/WatchMovie"));

const WatchTV =
  lazy(() => import("../pages/WatchTV"));

const Search =
  lazy(() => import("../pages/Search"));

const Favorites =
  lazy(() => import("../pages/Favorites"));

const NotFound =
  lazy(() => import("../pages/NotFound"));

import PageTransition from "../components/common/PageTransition";



export default function AppRoutes() {


  const location =
    useLocation();



  return (

    <AnimatePresence mode="wait">


      <Suspense fallback={<Loading />}>

  <Routes
    location={location}
    key={location.pathname}
  >



        <Route

          path="/"

          element={
            <PageTransition>
              <Home/>
            </PageTransition>
          }

        />



        <Route

          path="/movie/:id"

          element={
            <PageTransition>
              <MovieDetails/>
            </PageTransition>
          }

        />



        <Route

          path="/tv/:id"

          element={
            <PageTransition>
              <TVDetails/>
            </PageTransition>
          }

        />



        <Route

          path="/watch/movie/:id"

          element={
            <PageTransition>
              <WatchMovie/>
            </PageTransition>
          }

        />



        <Route

          path="/watch/tv/:id/:season/:episode"

          element={
            <PageTransition>
              <WatchTV/>
            </PageTransition>
          }

        />



        <Route

          path="/search"

          element={
            <PageTransition>
              <Search/>
            </PageTransition>
          }

        />



        <Route

          path="/favorites"

          element={
            <PageTransition>
              <Favorites/>
            </PageTransition>
          }

        />



        <Route

          path="*"

          element={
            <PageTransition>
              <NotFound/>
            </PageTransition>
          }

        />


      </Routes>

      </Suspense>


    </AnimatePresence>

  );

}