import { Link } from "react-router-dom";

const IMAGE = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER =
  "https://placehold.co/500x750/18181b/ffffff?text=No+Image";

export default function MovieCard({ item }) {
  const title = item.title || item.name || "Unknown Title";

  const image = item.poster_path
    ? `${IMAGE}${item.poster_path}`
    : PLACEHOLDER;

  const mediaType =
    item.media_type || (item.first_air_date ? "tv" : "movie");

  return (
    <Link
      to={mediaType === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}
      className="group block min-w-[180px] cursor-pointer"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="h-[270px] w-[180px] object-cover transition duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="mt-3 line-clamp-2 font-semibold">
        {title}
      </h3>

      <p className="text-sm text-zinc-400">
        ⭐ {item.vote_average?.toFixed(1) || "N/A"}
      </p>
    </Link>
  );
}