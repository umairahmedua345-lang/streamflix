import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";



export default function HorizontalScroll({
  children,
}) {


  const scrollRef =
    useRef(null);




  const scroll = (direction) => {


    if (!scrollRef.current)
      return;



    scrollRef.current.scrollBy({

      left:
        direction === "left"
          ? -500
          : 500,

      behavior:
        "smooth",

    });


  };




  return (

    <div
      className="
        group
        relative
      "
    >



      <button

        onClick={() =>
          scroll("left")
        }

        className="
          absolute
          left-0
          top-1/2
          z-10
          hidden
          -translate-y-1/2
          rounded-full
          bg-black/70
          p-3
          backdrop-blur
          transition
          hover:bg-black
          md:block
          opacity-0
          group-hover:opacity-100
        "

      >

        <ChevronLeft size={22}/>

      </button>





      <div

        ref={scrollRef}

        className="
          flex
          gap-5
          overflow-x-auto
          scroll-smooth
          pb-4
          scrollbar-hide
        "

      >

        {children}

      </div>






      <button

        onClick={() =>
          scroll("right")
        }

        className="
          absolute
          right-0
          top-1/2
          z-10
          hidden
          -translate-y-1/2
          rounded-full
          bg-black/70
          p-3
          backdrop-blur
          transition
          hover:bg-black
          md:block
          opacity-0
          group-hover:opacity-100
        "

      >

        <ChevronRight size={22}/>

      </button>




    </div>

  );

}