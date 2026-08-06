import { Link } from "react-router-dom";

import Layout from "../components/layout/Layout";



export default function NotFound() {


  return (

    <Layout>


      <div
        className="
          flex
          min-h-[70vh]
          flex-col
          items-center
          justify-center
          px-6
          text-center
        "
      >



        <h1
          className="
            text-8xl
            font-black
            text-red-600
          "
        >

          404

        </h1>




        <h2
          className="
            mt-5
            text-3xl
            font-bold
          "
        >

          Page Not Found

        </h2>




        <p
          className="
            mt-3
            max-w-md
            text-zinc-400
          "
        >

          The page you are looking for does not exist
          or has been moved.

        </p>




        <Link

          to="/"

          className="
            mt-8
            rounded-lg
            bg-red-600
            px-8
            py-3
            font-bold
            transition
            hover:bg-red-700
          "

        >

          Go Home

        </Link>



      </div>


    </Layout>

  );

}