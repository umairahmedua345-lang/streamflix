const IMAGE =
  "https://image.tmdb.org/t/p/w500";

const PLACEHOLDER =
  "https://placehold.co/300x450/18181b/ffffff?text=No+Image";


export default function CastCard({
  person,
}) {

  return (

    <div className="min-w-[140px]">


      <div className="overflow-hidden rounded-xl bg-zinc-900">


        <img

          src={
            person.profile_path
              ? `${IMAGE}${person.profile_path}`
              : PLACEHOLDER
          }

          alt={person.name}

          className="h-[210px] w-[140px] object-cover transition duration-300 hover:scale-105"

        />


      </div>




      <h3 className="mt-3 line-clamp-1 font-semibold">

        {person.name}

      </h3>




      <p className="line-clamp-1 text-sm text-zinc-400">

        {person.character}

      </p>


    </div>

  );

}