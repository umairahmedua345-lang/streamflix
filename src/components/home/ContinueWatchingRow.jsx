import { Link } from "react-router-dom";
import { useContinueWatching } from "../../context/ContinueWatchingContext";

const IMAGE = "https://image.tmdb.org/t/p/w500";

export default function ContinueWatchingRow() {
  const { continueWatching } = useContinueWatching();

  const items = Object.values(continueWatching || {}).sort(
    (a, b) => (b.last_updated || 0) - (a.last_updated || 0)
  );

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Continue Watching
        </h2>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">

        {items.map((item) => {
          const watched = item.progress?.watched || 0;
          const duration = item.progress?.duration || 1;

          const percent = Math.min(
            (watched / duration) * 100,
            100
          );

          const isTV = item.type === "tv";

          const watchLink = isTV
            ? `/watch/tv/${item.id}/${item.last_season_watched}/${item.last_episode_watched}`
            : `/watch/movie/${item.id}`;

          return (
            <Link
              key={item.id}
              to={watchLink}
              className="group min-w-[220px]"
            >
              <div className="overflow-hidden rounded-xl">

                <img
                  src={`${IMAGE}${item.poster_path}`}
                  alt={item.title}
                  className="h-[320px] w-[220px] object-cover transition duration-300 group-hover:scale-105"
                />

              </div>

              <h3 className="mt-3 line-clamp-2 font-semibold">
                {item.title}
              </h3>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800">

                <div
                  className="h-full bg-red-600"
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-sm text-zinc-400">
                {Math.floor(percent)}% watched
              </p>

              <button className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-700">
                ▶ Resume Watching
              </button>

            </Link>
          );
        })}

      </div>
    </section>
  );
}