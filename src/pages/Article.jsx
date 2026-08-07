import { Link, useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import useDocumentTitle from "../hooks/useDocumentTitle";

import articles from "../data/articles";


export default function Article() {

  const { id } = useParams();

  const article =
    articles.find(
      (item) => item.id === id
    );


  useDocumentTitle(
    article
      ? article.title
      : "Article"
  );



  if (!article) {

    return (

      <Layout>

        <main className="mx-auto max-w-4xl px-6 py-20 text-center">

          <h1 className="text-4xl font-black">
            Article Not Found
          </h1>

          <p className="mt-4 text-zinc-400">
            The article you're looking for doesn't exist.
          </p>

          <Link
            to="/blog"
            className="
              mt-8
              inline-block
              rounded-lg
              bg-red-600
              px-6
              py-3
              font-semibold
              transition
              hover:bg-red-700
            "
          >
            ← Back to Blog
          </Link>

        </main>

      </Layout>

    );

  }



  return (

    <Layout>

      <main className="mx-auto max-w-5xl px-6 py-12">


        {/* Back */}

        <Link
          to="/blog"
          className="
            inline-flex
            items-center
            text-sm
            font-semibold
            text-zinc-400
            transition
            hover:text-white
          "
        >
          ← Back to Blog
        </Link>




        {/* Article Header */}

        <header className="mt-8">

          <div className="flex flex-wrap items-center gap-3">

            <span
              className="
                rounded-full
                bg-red-600/10
                px-4
                py-2
                text-sm
                font-semibold
                text-red-500
              "
            >
              {article.category}
            </span>

            <span className="text-sm text-zinc-500">
              {article.date}
            </span>

            <span className="text-sm text-zinc-500">
              •
            </span>

            <span className="text-sm text-zinc-500">
              {article.readTime}
            </span>

          </div>



          <h1
            className="
              mt-6
              max-w-4xl
              text-4xl
              font-black
              leading-tight
              tracking-tight
              sm:text-5xl
              md:text-6xl
            "
          >
            {article.title}
          </h1>



          <p
            className="
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-zinc-400
            "
          >
            {article.excerpt}
          </p>

        </header>




        {/* Hero Image */}

        <div
          className="
            mt-10
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
          "
        >

          <img
            src={article.image}
            alt={article.title}
            className="
              h-auto
              max-h-[600px]
              w-full
              object-cover
            "
          />

        </div>




        {/* Article Content */}

        <article
          className="
            mx-auto
            mt-12
            max-w-3xl
          "
        >

          {article.content.map(
            (paragraph, index) => (

              <p
                key={index}
                className="
                  mb-7
                  text-lg
                  leading-8
                  text-zinc-300
                "
              >
                {paragraph}
              </p>

            )
          )}

        </article>




        {/* Bottom Navigation */}

        <div
          className="
            mt-16
            border-t
            border-zinc-800
            pt-8
          "
        >

          <Link
            to="/blog"
            className="
              inline-flex
              rounded-lg
              bg-zinc-900
              px-6
              py-3
              font-semibold
              transition
              hover:bg-zinc-800
            "
          >
            ← More Articles
          </Link>

        </div>


      </main>

    </Layout>

  );

}