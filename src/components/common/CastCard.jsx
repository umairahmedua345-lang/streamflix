const IMAGE = "https://image.tmdb.org/t/p/w185";

export default function CastCard({ person }) {
  return (
    <div className="min-w-[120px]">
      <img
        src={
          person.profile_path
            ? `${IMAGE}${person.profile_path}`
            : "https://placehold.co/120x180?text=No+Image"
        }
        className="rounded-lg h-[180px] w-[120px] object-cover"
      />

      <h3 className="mt-2 text-sm font-semibold line-clamp-2">
        {person.name}
      </h3>

      <p className="text-xs text-zinc-400">
        {person.character}
      </p>
    </div>
  );
}