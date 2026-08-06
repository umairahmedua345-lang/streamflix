import { Link } from "react-router-dom";

const BACKDROP = "https://image.tmdb.org/t/p/original";

export default function Hero({ movie }) {
  if (!movie) return null;

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <img
        src={`${BACKDROP}${movie.backdrop_path}`}
        alt={movie.title || movie.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-6xl font-black max-w-2xl">
            {movie.title || movie.name}
          </h1>

          <p className="mt-6 max-w-xl text-zinc-300 line-clamp-4">
            {movie.overview}
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to={`/movie/${movie.id}`}
              className="rounded bg-white px-8 py-3 font-semibold text-black hover:bg-zinc-300 transition"
            >
              Details
            </Link>

            <Link
              to={`/watch/movie/${movie.id}`}
              className="rounded bg-red-600 px-8 py-3 font-semibold hover:bg-red-700 transition"
            >
              ▶ Watch
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}