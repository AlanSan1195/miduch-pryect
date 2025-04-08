import { useEffect, useRef, useState } from "react";
import { useStream } from "../hooks/useStream";
import { useSearch } from "../hooks/useSearch";

export function Input() {
  const { search, setSearch, error } = useSearch();
  // necesitamos un useStream
  const { streams } = useStream(search);
  console.log("Streams:", streams);

  // Evita que el formulario recargue la página
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search) return;
    window.location.href = `/perfiles/${search}`;
  };

  // Actualiza el estado con el valor del input
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form className="flex gap-x-2" action="" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="border-2 opacity-80 border-rose text-black"
          value={search}
          placeholder="Category, Game, or Streamer..."
        />
        <button
          type="submit"
          className="bg-zinc-700 shadow-md rounded-md px-2 text-sm font-semibold  items-center hover:scale-105  opacity-80 hidden md:flex "
        >
          Search
        </button>
      </form>

      {error && <p className="text-rose font-light ">{error}</p>}
    </div>
  );
}
