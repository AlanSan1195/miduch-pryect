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
    const urlStreamer =
    window.location.href = `/perfiles/${search}`;
    console.log(urlStreamer);
  };

  // Actualiza el estado con el valor del input
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className=" fixed top-0 left-0 z-10  w-full  shadow-black/40 flex justify-between bg-primary shadow-xl px-7 py-4 ">
      <a href="/" className="flex items-center gap-x-2 hover:cursor-pointer ">
        <div className="h-5 w-5 bg-rose rounded-md  opacity-80"></div>
        <h1  className=" hover:cursor-pointer font-bold text-xl">Suitch</h1>
      </a>

      <div >
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

        {error && <p className="text-rose font-light " >{error}</p>}
      </div>

      <div className="flex gap-x-2 items-center justify-center">
        <button className="bg-zinc-700 rounded-md p-1 text-sm font-semibold text-white">
          Log in
        </button>
        <button className="bg-rose rounded-md p-1 text-sm font-semibold text-white">
          Sign Up
        </button>
      </div>
    </header>
  );
}
