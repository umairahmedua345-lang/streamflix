import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-10">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        size={20}
      />

      <input
        value={value}
        onChange={onChange}
        placeholder="Search movies or TV shows..."
        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 py-4 pl-12 pr-4 outline-none focus:border-red-600"
      />
    </div>
  );
}