import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Search,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";



export default function Navbar() {


  const [open, setOpen] =
    useState(false);



  const [scrolled, setScrolled] =
    useState(false);




  const {
    dark,
    toggleTheme,
  } = useTheme();





  useEffect(() => {


    const handleScroll = () => {

      setScrolled(
        window.scrollY > 30
      );

    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );


  }, []);






  const links = [

    {
      name: "Home",
      path: "/",
    },

    {
      name: "Favorites",
      path: "/favorites",
    },

    {
      name: "Search",
      path: "/search",
    },

  ];






  return (

    <nav

      className={`
        sticky
        top-0
        z-50
        transition-all
        duration-300
        backdrop-blur-xl

        ${
          scrolled
          ? "bg-zinc-950/95 shadow-xl"
          : "bg-zinc-950/60"
        }

      `}

    >




      <div

        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "

      >






        <Link

          to="/"

          className="
            text-3xl
            font-black
            tracking-tight
            text-red-600
            transition
            hover:scale-105
          "

        >

          Stream
          <span className="text-white">
            Flix
          </span>


        </Link>









        <div

          className="
            hidden
            items-center
            gap-8
            md:flex
          "

        >



          {links.map(link => (


            <NavLink

              key={link.path}

              to={link.path}

              className={({isActive}) =>

                `
                relative
                font-medium
                transition

                ${
                  isActive
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
                }

                `

              }

            >


              {({isActive}) => (

                <>

                  {link.name}



                  {isActive && (

                    <span

                      className="
                        absolute
                        -bottom-2
                        left-0
                        h-0.5
                        w-full
                        bg-red-600
                      "

                    />

                  )}


                </>

              )}


            </NavLink>


          ))}


        </div>









        <div

          className="
            hidden
            items-center
            gap-3
            md:flex
          "

        >




          <button

            onClick={toggleTheme}

            className="
              rounded-full
              bg-zinc-900
              p-3
              transition
              hover:bg-zinc-800
            "

          >


            {
              dark
              ? <Sun size={20}/>
              : <Moon size={20}/>
            }


          </button>






          <Link

            to="/search"

            className="
              rounded-full
              bg-zinc-900
              p-3
              transition
              hover:bg-zinc-800
            "

          >

            <Search size={20}/>


          </Link>







          <Link

            to="/favorites"

            className="
              rounded-full
              bg-zinc-900
              p-3
              transition
              hover:bg-zinc-800
            "

          >

            <Heart size={20}/>


          </Link>



        </div>









        {/* Mobile actions */}

        <div

          className="
            flex
            items-center
            gap-3
            md:hidden
          "

        >




          <Link

            to="/search"

            className="
              rounded-full
              bg-zinc-900
              p-3
              transition
              hover:bg-zinc-800
            "

          >

            <Search size={20}/>


          </Link>







          <button

            onClick={() => setOpen(!open)}

            className="
              rounded-lg
              bg-zinc-900
              p-3
            "

          >

            {
              open
              ? <X/>
              : <Menu/>
            }


          </button>



        </div>





      </div>









      {open && (


        <div

          className="
            border-t
            border-zinc-800
            bg-zinc-950
            px-6
            py-6
            md:hidden
          "

        >



          <div

            className="
              flex
              flex-col
              gap-5
            "

          >




            {links.map(link => (


              <NavLink

                key={link.path}

                to={link.path}

                onClick={() =>
                  setOpen(false)
                }

                className="
                  text-lg
                  text-zinc-300
                  transition
                  hover:text-white
                "

              >

                {link.name}


              </NavLink>


            ))}







            <button

              onClick={toggleTheme}

              className="
                flex
                items-center
                gap-3
                text-zinc-300
              "

            >


              {
                dark
                ? <Sun size={20}/>
                : <Moon size={20}/>
              }


              Change Theme


            </button>





          </div>



        </div>


      )}





    </nav>

  );

}