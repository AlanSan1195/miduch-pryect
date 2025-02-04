import { useEffect, useState } from "react";

const url = "https://api.twitch.tv/helix/streams";
const CLIENT_ID = "y1b3vqct87lqhyab64i28gy4qfaa35";
const TOKEN_API = "qnrw7pe00dlfxq1xf2uz87c0ktljya";

export function Lives() {
  const [isActive, setIsActive] = useState(false);
  const [streamer, setStreamer] = useState([]);

  useEffect(() => {
    async function awaitStream() {
      try {
        const respuesta = await fetch(url, {
          headers: {
            "Client-ID": CLIENT_ID,
            Authorization: `Bearer ${TOKEN_API}`,
          },
        });
        const info = await respuesta.json();
        console.log(info);
        setStreamer(info.data || []);
      } catch (error) {
        console.log("error");
      }
    }
    awaitStream();
  }, [setStreamer]);
  function showMore() {
    setIsActive(!isActive);
  }
  return (
    <div className="relative">
      <section
        className={`mx-4 overflow-y-hidden ${
          isActive ? "min-h-fit" : "max-h-[400px]"
        }`}
      >
        <div className="flex mx-3 mt-2">
          <p className="font-semibold text-lg">
            <span className="font-semibold text-cyan-600">Live channels</span>
            we think you’ll like
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-2 overflow-y-hidden my-6 p-2 ${
            isActive ? "min-h-fit" : "max-h-[500px]"
          }`}
        >
          {streamer.map((stream) => (
            <div
              className="flex flex-col w-auto h-auto border-[2px] border-black/30 rounded-sm m-1 max-w-[300px] max-h-[400px]"
              key={stream.title}
            >
              <img
                className="w-full h-auto bg-cover "
                src={stream.thumbnail_url.replace(
                  "{width}x{height}",
                  "250x150"
                )}
                alt="imagen"
              />
              <div className="flex jus items-center content-center mx-3">
                <img
                  src={`https://unavatar.io/${stream.user_name}`}
                  className=" rounded-full size-12 mt-2 mr-2"
                  alt="imagen"
                />
                <p className="font-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis  ">
                  {stream.title}
                </p>
              </div>
              <div className=" flex flex-col mt-1 gap-y-1 mx-3 ">
                <p>{stream.user_name}</p>
                <p>{stream.type}</p>
              </div>
              <div className="  grid grid-cols-6 md:grid-cols-6 my-3 gap-y-2 ">
                <button className=" scale-90 border-2 border-gray-600 mx-2 rounded-full justify-center items-center min-w-max hover:transition-all hover:scale-95 ">
                  {stream.language}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className=" mx-4 flex justify-center items-center mt-2 ">
        <hr className=" mx-2 flex-1 border-t-2 border-black" />
        <button onClick={showMore}>
          <span className="text-blue-500">Show more</span>
        </button>
        <hr className="mx-2 flex-1 border-t-2 border-black" />
      </div>
    </div>
  );
}
