import { Link, NavLink } from "react-router-dom";
import { Search, Bell } from "lucide-react";

export default function Navbar() {
  const active =
    "text-white";

  const normal =
    "text-zinc-400 hover:text-white transition";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        <div className="flex items-center gap-10">

          <Link
            to="/"
            className="text-red-600 text-3xl font-black"
          >
            StreamFlix
          </Link>

          <nav className="flex gap-6">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? active : normal
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? active : normal
              }
            >
              Movies
            </NavLink>

            <NavLink
              to="/tv"
              className={({ isActive }) =>
                isActive ? active : normal
              }
            >
              TV Shows
            </NavLink>

          </nav>

        </div>

        <div className="flex items-center gap-5">

          <Link to="/search">
            <Search
              size={22}
              className="hover:text-red-500 transition"
            />
          </Link>

          <Bell
            size={22}
            className="cursor-pointer hover:text-red-500 transition"
          />

          <img
            src="https://i.pravatar.cc/100"
            className="w-9 h-9 rounded"
          />

        </div>

      </div>
    </header>
  );
}