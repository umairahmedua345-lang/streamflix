import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import useDocumentTitle from "../hooks/useDocumentTitle";
import articles from "../data/articles";

export default function Blog() {
  useDocumentTitle("Blog");

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <Layout>
      <main className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}
        <section className="mb-12 max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-red-600/10 px-4 py-2 text-sm font-semibold text-red-500">
            STREAMFLIX EDITORIAL
          </span>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Movie &amp; TV Guide
          </h1>

          <p className="mt-5 text-lg leading-8 text-zinc-400">
            Discover movie recommendations, TV guides, genre picks, and
            entertainment articles to help you find your next watch.
          </p>
        </section>


        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-16">
            <Link
              to={`/blog/${featuredArticle.id}`}
              className="group block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >
              <div className="grid md:grid-cols-2">

                <div className="relative min-h-[280px] overflow-hidden md:min-h-[400px]">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r" />
                </div>


                <div className="flex flex-col justify-center p-8 md:p-12">

                  <span className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-500">
                    Featured • {featuredArticle.category}
                  </span>

                  <h2 className="text-3xl font-black leading-tight md:text-4xl">
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-5 leading-7 text-zinc-400">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="mt-7 flex items-center gap-4 text-sm text-zinc-500">
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <span>{featuredArticle.readTime}</span>
                  </div>

                  <div className="mt-8 font-semibold text-white transition group-hover:text-red-500">
                    Read Article →
                  </div>

                </div>

              </div>
            </Link>
          </section>
        )}


        {/* Latest Articles */}
        <section>

          <div className="mb-7 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Latest Articles
            </h2>

            <span className="text-sm text-zinc-500">
              {articles.length} articles
            </span>

          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {otherArticles.map((article) => (

              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-zinc-700"
              >

                <div className="relative aspect-video overflow-hidden">

                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {article.category}
                  </span>

                </div>


                <div className="p-6">

                  <div className="mb-3 text-xs text-zinc-500">
                    {article.date} • {article.readTime}
                  </div>

                  <h3 className="text-xl font-bold leading-snug transition group-hover:text-red-500">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
                    {article.excerpt}
                  </p>

                  <div className="mt-5 font-semibold text-zinc-300 transition group-hover:text-red-500">
                    Read More →
                  </div>

                </div>

              </Link>

            ))}

          </div>

        </section>

      </main>
    </Layout>
  );
}