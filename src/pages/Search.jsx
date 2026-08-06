import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import SearchBar from "../components/common/SearchBar";
import MovieCard from "../components/cards/MovieCard";
import Loading from "../components/common/Loading";

import { searchMedia } from "../services/tmdb";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await searchMedia(query);

        const filtered = res.data.results.filter(
          (item) =>
            item.media_type === "movie" ||
            item.media_type === "tv"
        );

        setResults(filtered);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && <Loading />}

        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {results.map((item) => (
              <MovieCard
                key={`${item.media_type}-${item.id}`}
                item={item}
              />
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
}