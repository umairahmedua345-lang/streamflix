export default function Loading() {


  return (

    <div
      className="
        min-h-[60vh]
        space-y-8
        px-6
        py-12
      "
    >



      <div
        className="
          h-8
          w-48
          animate-pulse
          rounded-lg
          bg-zinc-800
        "
      />




      <div
        className="
          grid
          grid-cols-2
          gap-5
          sm:grid-cols-3
          md:grid-cols-5
        "
      >


        {Array.from({
          length:10
        }).map((_,i)=>(


          <div

            key={i}

            className="
              overflow-hidden
              rounded-xl
              bg-zinc-900
            "

          >


            <div
              className="
                h-[280px]
                animate-pulse
                bg-zinc-800
              "
            />


            <div
              className="
                space-y-3
                p-4
              "
            >


              <div
                className="
                  h-4
                  w-3/4
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />


              <div
                className="
                  h-3
                  w-1/2
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />


            </div>


          </div>


        ))}


      </div>


    </div>

  );

}