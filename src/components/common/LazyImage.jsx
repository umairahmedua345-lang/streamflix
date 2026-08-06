import { useState } from "react";


export default function LazyImage({
  src,
  alt,
  className = "",
}) {


  const [loaded, setLoaded] =
    useState(false);



  return (

    <div
      className="
        relative
        overflow-hidden
        bg-zinc-900
      "
    >


      {!loaded && (

        <div
          className="
            absolute
            inset-0
            animate-pulse
            bg-zinc-800
          "
        />

      )}




      <img

        src={src}

        alt={alt}

        loading="lazy"

        onLoad={() =>
          setLoaded(true)
        }

        className={`
          transition
          duration-500
          ${loaded
            ? "opacity-100"
            : "opacity-0"
          }
          ${className}
        `}

      />


    </div>

  );

}