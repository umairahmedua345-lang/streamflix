import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

import Loading from "../components/common/Loading";
import PageTransition from "../components/common/PageTransition";


const Home =
  lazy(() => import("../pages/Home"));

const Movies =
  lazy(() => import("../pages/Movies"));

const TVShows =
  lazy(() => import("../pages/TVShows"));

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

const Blog =
  lazy(() => import("../pages/Blog"));

const Article =
  lazy(() => import("../pages/Article"));

const NotFound =
  lazy(() => import("../pages/NotFound"));


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


          {/* HOME */}

          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />



          {/* MOVIES */}

          <Route
            path="/movies"
            element={
              <PageTransition>
                <Movies />
              </PageTransition>
            }
          />



          {/* TV SHOWS */}

          <Route
            path="/tv"
            element={
              <PageTransition>
                <TVShows />
              </PageTransition>
            }
          />



          {/* MOVIE DETAILS */}

          <Route
            path="/movie/:id"
            element={
              <PageTransition>
                <MovieDetails />
              </PageTransition>
            }
          />



          {/* TV DETAILS */}

          <Route
            path="/tv/:id"
            element={
              <PageTransition>
                <TVDetails />
              </PageTransition>
            }
          />



          {/* WATCH MOVIE */}

          <Route
            path="/watch/movie/:id"
            element={
              <PageTransition>
                <WatchMovie />
              </PageTransition>
            }
          />



          {/* WATCH TV */}

          <Route
            path="/watch/tv/:id/:season/:episode"
            element={
              <PageTransition>
                <WatchTV />
              </PageTransition>
            }
          />



          {/* SEARCH */}

          <Route
            path="/search"
            element={
              <PageTransition>
                <Search />
              </PageTransition>
            }
          />



          {/* FAVORITES */}

          <Route
            path="/favorites"
            element={
              <PageTransition>
                <Favorites />
              </PageTransition>
            }
          />



          {/* BLOG */}

          <Route
            path="/blog"
            element={
              <PageTransition>
                <Blog />
              </PageTransition>
            }
          />



          {/* ARTICLE */}

          <Route
            path="/blog/:id"
            element={
              <PageTransition>
                <Article />
              </PageTransition>
            }
          />



          {/* 404 */}

          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />


        </Routes>

      </Suspense>

    </AnimatePresence>

  );
}