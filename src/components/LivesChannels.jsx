import { useEffect, useState } from "react";
//Variables de entorno
import { awaitStream } from "../logic/respuesta";
import { Showmore } from "./Showmore";

export function LivesChannels() {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [streamer, setStreamer] = useState([]);
  const [selectStream, setSelectSream] = useState(null);

  useEffect(() => {
    async function getStream() {
      const data = await awaitStream();
      setStreamer(data);
    }
    getStream();
  }, []);
  function showMore() {
    setIsActive(!isActive);
    setIsShow(!isShow);
  }

  return (
    <div className="relative flex flex-col w-full h-auto  ">
      {/* esto es un componente  */}

      <section
        className={` mx-6 overflow-y-hidden flex flex-col  ${
          isActive ? "min-h-fit" : "max-h-[420px]"
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
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-2 overflow-y-hidden my-2 p-2 ${
            isActive ? "min-h-fit" : "max-h-[500px]"
          }`}
        >
          {streamer.map((stream) => (
            <div
              className="flex flex-col   w-auto h-auto border-[2px] border-black shadow-sm shadow-white/10 rounded-sm m-1 max-w-[300px] max-h-[400px]"
              key={stream.title}
            >
              <img
                className="w-full h-auto bg-cover cursor-pointer  "
                src={stream.thumbnail_url.replace(
                  "{width}x{height}",
                  "250x150"
                )}
                alt="imagen"
                onClick={() => setSelectSream(stream.user_login)}
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
                  <p className=" font-light opacity-70 text-xs cursor-pointer ">{stream.user_name}</p>
                </div>
              </div>
              <div className=" flex flex-col mt-1 gap-y-1 mx-3 ">
                <p className=" font-semibold opacity-80">{stream.game_name}</p>
                <p className=" font-light opacity-70">{stream.type}</p>
              </div>
              <div className="  grid grid-cols-6 md:grid-cols-6 my-3 gap-y-2 ">
                <button className="  border-2 border-gray-600 mx-2 p-2 rounded-full justify-center items-center min-w-max  ">
                  {stream.tags[Math.floor(Math.random() * stream.tags.length)]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Showmore showMore={showMore} isShow={isShow} />
      {selectStream && (
        <div className=" w-full flex justify-center ">
          <iframe
            src={`https://player.twitch.tv/?channel=${selectStream}&parent=localhost`}
            allowFullScreen
            height="400px"
            width="600px"
          ></iframe>
        </div>
      )}
    </div>
  );
}
