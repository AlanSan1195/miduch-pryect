import { useEffect, useState } from "react";
//Variables de entorno
import { awaitStream } from "../logic/respuesta";
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
      {/* esto es un componente  */}

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
                    alt="imagen"
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
    async function awaitYourFollows() {
      const data = await awaitStream();
      setStreamer(data);
    }
    awaitYourFollows();
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
          <p className="font-semibold text-xl opacity-85 ">
            The best of the <span className=" text-cyan-500">Gaming</span>
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
                    alt="imagen"
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
