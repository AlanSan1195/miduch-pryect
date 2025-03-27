import { useEffect, useState } from "react";
//Variables de entorno
import { awaitStream, awaitYourFollows } from "../logic/respuesta";
import { Showmore } from "./Showmore";
import { useInitialContext } from "./SanstreamLyout";

export function LivesChannels() {
  const { context: isActive, setContext: setIsActive } = useInitialContext();
  const [showMore, setShowMore] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [streamer, setStreamer] = useState([]);

  useEffect(() => {
    async function getStream() {
      const data = await awaitStream();
      setStreamer(data);
    }
    getStream();
  }, []);
  function show() {
    setShowMore(!showMore);
    setIsShow(!isShow);
  }

  return (
    <div
      id="live-channels"
      className={`px-10 flex flex-col h-auto  w-auto ${
        isActive ? " ml-64" : "ml-20"
      }`}
    >
      <section
        className={` overflow-y-hidden flex flex-col  ${
          showMore ? "min-h-fit" : "max-h-[420px]"
        }`}
      >
        <div className="flex mx-3 mt-2 ">
          <p className="font-semibold text-xl opacity-85">
            <span className="font-semibold text-cyan-600  ">
              Live channels{" "}
            </span>
            we think you’ll like
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
            isActive ? "xl:grid-cols-3 " : "xl:grid-cols-4 gap-x-2"
          }  gap-y-16  overflow-y-hidden my-2 p-2 ${
            showMore ? "min-h-fit" : "max-h-[500px]"
          }`}
        >
          {streamer.map((stream) => (
            <div
              className=" p-1 bg-secundary  bg-zinc-600/10 flex flex-col w-auto h-auto border-2 border-[#232323]  rounded-md shadow-sm shadow-white/10 m-1 max-w-[350px] max-h-[400px] hover:translate-x-2 hover:-translate-y-2  hover:bg-rose  hover:border-[1px]  transition-all duration-150"
              key={stream.title}
            >
              <a href={`/perfiles/${stream.user_name}`}>
                <img
                  className="w-full h-auto bg-cover cursor-pointer "
                  src={stream.thumbnail_url.replace(
                    "{width}x{height}",
                    "250x150"
                  )}
                  alt="imagen"
                />
                <div className="flex items-center mx-3 ">
                  <img
                    src={`https://unavatar.io/${stream.user_name}`}
                    className=" rounded-full size-12 mt-2 mr-2"
                    alt="imagen del perfil"
                  />
                  <div className="flex flex-col overflow-x-hidden">
                    <p className="font-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis  ">
                      {stream.title}
                    </p>
                    <p className=" font-light opacity-70 text-xs cursor-pointer ">
                      {stream.user_name}
                    </p>
                  </div>
                </div>
              </a>
              <div className=" flex flex-col mt-1 gap-y-1 mx-3 ">
                <p className=" font-semibold opacity-80">{stream.game_name}</p>
                <p className=" font-light opacity-70">{stream.type}</p>
              </div>
              <div className="  grid grid-cols-6 md:grid-cols-6 my-3 gap-y-2 "></div>
            </div>
          ))}
        </div>
      </section>

      <Showmore showMore={show} isShow={isShow} />
    </div>
  );
}

export function OthersChannels() {
  const { context: isActive, setContext: setIsActive } = useInitialContext();
  const [showMore, setShowMore] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [streamer, setStreamer] = useState([]);

  useEffect(() => {
    async function getOtherChannels() {
      const data = await awaitYourFollows();
      setStreamer(data);
    }
    getOtherChannels();
  }, []);
  function show() {
    setShowMore(!showMore);
    setIsShow(!isShow);
  }

  return (
    <div
      id="live-channels"
      className={`px-10 flex flex-col h-auto  w-auto ${
        isActive ? " ml-64" : "ml-20"
      }`}
    >
      {/* esto es un componente  */}

      <section
        className={` overflow-y-hidden flex flex-col  ${
          showMore ? "min-h-fit" : "max-h-[420px]"
        }`}
      >
        <div className="flex mx-3 mt-2 ">
          <p className="font-semibold text-xl opacity-80 ">
            <span className=" text-cyan-500">Gaming</span> and{" "}
            <span className=" text-cyan-500">Development</span>
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
            isActive ? "xl:grid-cols-3 " : "xl:grid-cols-4 gap-x-2"
          }  gap-y-16  overflow-y-hidden my-2 p-2 ${
            showMore ? "min-h-fit" : "max-h-[500px]"
          }`}
        >
          {streamer.length > 0 ? (
            streamer.map((stream) => (
              <div
                className=" p-1 bg-secundary  bg-zinc-600/10 flex flex-col w-auto h-auto border-2 border-[#232323]  rounded-md shadow-sm shadow-white/10 m-1 max-w-[350px] max-h-[400px] hover:translate-x-2 hover:-translate-y-2  hover:bg-rose  hover:border-[1px]  transition-all duration-150"
                key={stream.title}
              >
                <a href={`/perfiles/${stream.login || stream.display_name}`}>
                  <img
                    className="w-full h-auto bg-cover cursor-pointer "
                    src={
                      stream.offline_image_url
                        ? stream.offline_image_url.replace("{width}x{height}", "250x150")
                        : stream.thumbnail_url
                    }
                    alt={`Imagen de ${stream.display_name || stream.login}`}
                  />
                  <div className="flex items-center mx-3 ">
                    <img
                      src={
                        stream.profile_image_url
                          ? stream.profile_image_url
                          : `https://unavatar.io/${stream.login || stream.display_name}`
                      }
                      className="rounded-full size-12 mt-2 mr-2"
                      alt={`Perfil de ${stream.display_name || stream.login}`}
                    />
                    <div className="flex flex-col overflow-x-hidden">
                      <p className="font-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                        {stream.title || "Sin título"}
                      </p>
                      <p className="font-light opacity-70 text-xs cursor-pointer">
                        {stream.display_name || stream.login}
                      </p>
                    </div>
                  </div>
                </a>
                <div className="grid mt-3 gap-y-2 gap-x-2  mx-3 overflow-x-hidden overflow-y-hidden  grid-cols-3 ">
                  {/* // corte la lista a los primeros 3 para que no desvorde el grid */}
                  {stream.tags?.slice(0, 3).map((tag, index) => (
                    <div
                      key={index}
                      className=" flex justify-center   bg-primary w-auto h-auto    text-white  rounded-xl px-2 py-1"
                    >
                      <p className=" text-xs">{tag}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col mt-1 gap-y-2 mx-3">
                  <p className="font-semibold opacity-80 mt-2">
                    {stream.game_name || "Sin juego"}
                  </p>

                </div>
                <div className="  grid grid-cols-6 md:grid-cols-6 my-3 gap-y-2 "></div>
              </div>
            ))
          ) : (
            <p>Cargando canales</p>
          )}
        </div>
      </section>

      <Showmore showMore={show} isShow={isShow} />
    </div>
  );
}
