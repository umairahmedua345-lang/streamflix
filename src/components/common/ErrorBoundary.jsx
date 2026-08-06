import React from "react";


export default class ErrorBoundary extends React.Component {


  constructor(props) {

    super(props);


    this.state = {
      hasError:false,
    };

  }





  static getDerivedStateFromError() {

    return {
      hasError:true,
    };

  }





  componentDidCatch(error, info) {

    console.error(
      "StreamFlix Error:",
      error,
      info
    );

  }





  render() {


    if(this.state.hasError) {


      return (

        <div
          className="
            flex
            min-h-screen
            flex-col
            items-center
            justify-center
            bg-zinc-950
            px-6
            text-center
            text-white
          "
        >

          <h1
            className="
              text-5xl
              font-black
              text-red-600
            "
          >

            Something went wrong

          </h1>



          <p
            className="
              mt-4
              text-zinc-400
            "
          >

            Please refresh the page and try again.

          </p>


          <button

            onClick={() =>
              window.location.reload()
            }

            className="
              mt-8
              rounded-lg
              bg-red-600
              px-8
              py-3
              font-bold
              hover:bg-red-700
            "

          >

            Reload

          </button>


        </div>

      );


    }



    return this.props.children;


  }


}