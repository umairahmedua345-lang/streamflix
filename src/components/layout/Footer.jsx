import { Link } from "react-router-dom";


export default function Footer() {


  return (

    <footer
      className="
        mt-20
        border-t
        border-zinc-800
        bg-zinc-950
      "
    >


      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-8
          px-6
          py-10
          md:flex-row
          md:items-center
          md:justify-between
        "
      >



        <div>


          <Link

            to="/"

            className="
              text-2xl
              font-black
              text-red-600
            "

          >

            StreamFlix

          </Link>



          <p
            className="
              mt-2
              max-w-sm
              text-sm
              text-zinc-400
            "
          >

            Your ultimate destination for movies
            and TV shows.

          </p>


        </div>





        <div
          className="
            flex
            gap-6
            text-sm
            text-zinc-400
          "
        >


          <Link
            to="/"
            className="hover:text-white"
          >
            Home
          </Link>



          <Link
            to="/favorites"
            className="hover:text-white"
          >
            Favorites
          </Link>



          <Link
            to="/search"
            className="hover:text-white"
          >
            Search
          </Link>


        </div>




      </div>




      <div
        className="
          border-t
          border-zinc-900
          py-5
          text-center
          text-sm
          text-zinc-500
        "
      >

        © {new Date().getFullYear()} StreamFlix. All rights reserved.

      </div>



    </footer>

  );

}