import { useInitialContext } from "./SanstreamLyout";



export function Footer() {
  const {context: isActive, setContext: setIsActive} = useInitialContext();
  return (
    <div id="footer" className={` h-48 flex justify-center items-center flex-col${isActive ? " ml-[260px]" : "  ml-36 flex flex-col"}`}>
      <div className="opacity-80">
        <h1 className=" font-semibold">
          Hecho con gran motivación 🩷 Gracias a la academia de{" "}
          <a
            href="https://midu.dev"
            target="_blank"
            rel="noreferrer"
            className="relative hover:scale-150 text-cyan-500 after:block after:w-0 after:h-[1.5px] after:rounded-lg after:bg-cyan-500 after:transition-all after:duration-300 after:absolute after:left-0 after:translate-x-1/1 after:bottom-[-3px] hover:after:w-full"
          >
            @Midudev
          </a>
        </h1>
      </div>
          <div className=" flex items-center gap-2 mt-6">
            <a href="https://alansan.pro" target="_blank" rel="noreferrer">

            <img  src="/FotoPerfil.webp" alt="Mi foto de perfil" className="size-10 rounded-full hover:cursor-pointer" />
            </a>
            <p className=" font-bold text-sm opacity-90">Alan San</p>
          </div>
    </div>
  );
}
