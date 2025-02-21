import { useEffect, useRef, useState } from "react";
import { useStream } from "../hooks/useStream";
import { useSearch } from "../hooks/useSearch";

export function Header() {
 
  const { search, setSearch, error } = useSearch();
  // necesitamos un useStream
  const { streams } = useStream(search);
  console.log("Streams:", streams);

  // Evita que el formulario recargue la página
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Buscando:", search);
    const urll =   window.location.href = `/${encodeURIComponent(search)}`;
    console.log(urll);
  };

  // Actualiza el estado con el valor del input
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className="relative flex justify-between bg-neutral-900 border-b-[2px] shadow-sm shadow-white/10 border-black px-3 py-3">
      <div className="flex items-center gap-x-1">
        <div className="h-4 w-4 bg-rose rounded-sm opacity-80"></div>
        <h1 className="font-semibold text-lg">Sanstream</h1>
      </div>

      <div>
        <form action={`/perfiles/${encodeURIComponent(search)}`}  onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="border-2 opacity-80 border-rose text-black"
            value={search}
            placeholder="Category, Game, or Streamer..."
          />
          <button
            type="submit"
            className="bg-zinc-700 shadow-md rounded-sm px-2 opacity-80"
          >
            Search
          </button>
        </form>
      
        {error && <p className="text-rose font-light">{error}</p>}
      </div>

      <div className="flex gap-x-2 items-center justify-center">
        <button className="bg-zinc-700 rounded-md px-2 py-1 text-sm text-white">
          Log in
        </button>
        <button className="bg-rose rounded-md px-2 py-1 text-sm">
          Sign Up
        </button>
      </div>
    </header>
  );
}
