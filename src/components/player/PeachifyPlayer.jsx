import { useEffect, useMemo, useRef } from "react";

import { useContinueWatching } from "../../context/ContinueWatchingContext";


const PEACHIFY_ORIGIN =
  "https://peachify.pro";



export default function PeachifyPlayer({
  src,
}) {


  const iframeRef =
    useRef(null);



  const {
    refreshContinueWatching,
  } = useContinueWatching();





  const iframeSrc =
    useMemo(() => {


      const separator =
        src.includes("?")
          ? "&"
          : "?";



      return (
        `${src}${separator}` +
        "autoPlay=true" +
        "&accent=B54666" +
        "&showNextBtn=true"
      );


    },[src]);





  useEffect(() => {


    function handleMessage(event) {


      if (
        event.origin !== PEACHIFY_ORIGIN
      ) {
        return;
      }




      if (
        event.data?.type ===
        "MEDIA_DATA"
      ) {


        localStorage.setItem(

          "peachifyProgress",

          JSON.stringify(
            event.data.data
          )

        );



        refreshContinueWatching();


      }




      if (
        event.data?.type ===
        "PLAYER_EVENT"
      ) {


        const data =
          event.data.data;



        console.log(

          "Peachify:",
          data.event,
          data.currentTime

        );


      }


    }




    window.addEventListener(

      "message",

      handleMessage

    );



    return () => {


      window.removeEventListener(

        "message",

        handleMessage

      );


    };


  },[
    refreshContinueWatching
  ]);





  return (

    <div
      className="
        relative
        aspect-video
        overflow-hidden
        rounded-2xl
        bg-black
        shadow-2xl
      "
    >


      <iframe

        ref={iframeRef}

        src={iframeSrc}

        title="StreamFlix Player"

        className="
          absolute
          inset-0
          h-full
          w-full
        "

        allow="
          autoplay;
          fullscreen;
          picture-in-picture;
          encrypted-media;
        "

        allowFullScreen

      />


    </div>

  );

}