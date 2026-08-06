export default function Section({
  title,
  children,
}) {


  return (

    <section
      className="
        mb-14
      "
    >


      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >


        <h2
          className="
            text-3xl
            font-black
            tracking-tight
          "
        >

          {title}

        </h2>


        <span
          className="
            hidden
            text-sm
            text-zinc-500
            md:block
          "
        >

          Explore more

        </span>


      </div>




      <div
        className="
          animate-[fadeIn_0.5s_ease]
        "
      >

        {children}

      </div>



    </section>

  );

}