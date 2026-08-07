import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  Search,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  BookOpen,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";


export default function Navbar() {

  const [open, setOpen] = useState(false);


  const {
    dark,
    toggleTheme,
  } = useTheme();


  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "TV Shows",
      path: "/tv",
    },
    {
      name: "Blog",
      path: "/blog",
    },
    {
      name: "Favorites",
      path: "/favorites",
    },
  ];


  return (

    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-zinc-800
        bg-zinc-950/80
        backdrop-blur-xl
      "
    >

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
      >


        {/* Logo */}

        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="
            text-3xl
            font-black
            text-red-600
          "
        >
          StreamFlix
        </Link>



        {/* Desktop Navigation */}

        <div
          className="
            hidden
            items-center
            gap-7
            md:flex
          "
        >

          {links.map((link) => (

            <NavLink
              key={link.path}
              to={link.path}

              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-red-500"
                  : "text-zinc-300 transition hover:text-white"
              }
            >
              {link.name}
            </NavLink>

          ))}

        </div>



        {/* Desktop Actions */}

        <div
          className="
            hidden
            items-center
            gap-3
            md:flex
          "
        >


          {/* Theme */}

          <button
            onClick={toggleTheme}
            aria-label="Change theme"

            className="
              rounded-full
              bg-zinc-900
              p-3
              transition
              hover:bg-zinc-800
            "
          >

            {dark ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}

          </button>



          {/* Search */}

          <Link
            to="/search"
            aria-label="Search"

            className="
              rounded-full
              bg-zinc-900
              p-3
              transition
              hover:bg-zinc-800
            "
          >
            <Search size={20} />
          </Link>



          {/* Favorites */}

          <Link
            to="/favorites"
            aria-label="Favorites"

            className="
              rounded-full
              bg-zinc-900
              p-3
              transition
              hover:bg-zinc-800
            "
          >
            <Heart size={20} />
          </Link>

        </div>



        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          aria-label="Open menu"

          className="
            rounded-lg
            bg-zinc-900
            p-3
            transition
            hover:bg-zinc-800
            md:hidden
          "
        >

          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}

        </button>

      </div>



      {/* Mobile Menu */}

      {open && (

        <div
          className="
            border-t
            border-zinc-800
            bg-zinc-950
            px-6
            py-5
            md:hidden
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
            "
          >


            {links.map((link) => (

              <NavLink
                key={link.path}
                to={link.path}

                onClick={() =>
                  setOpen(false)
                }

                className={({ isActive }) =>
                  `
                    flex
                    items-center
                    gap-3
                    transition
                    ${
                      isActive
                        ? "font-semibold text-red-500"
                        : "text-zinc-300 hover:text-white"
                    }
                  `
                }
              >

                {link.name === "Blog" && (
                  <BookOpen size={18} />
                )}

                {link.name}

              </NavLink>

            ))}



            {/* Mobile Search */}

            <Link
              to="/search"
              onClick={() => setOpen(false)}

              className="
                flex
                items-center
                gap-3
                text-zinc-300
                transition
                hover:text-white
              "
            >

              <Search size={18} />

              Search

            </Link>



            {/* Mobile Theme */}

            <button
              onClick={toggleTheme}

              className="
                flex
                items-center
                gap-3
                text-left
                text-zinc-300
                transition
                hover:text-white
              "
            >

              {dark ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}

              Change Theme

            </button>

          </div>

        </div>

      )}

    </nav>

  );
}